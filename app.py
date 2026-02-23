"""ClinIQwire – Healthcare Tech News Aggregator."""

import logging
import re
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

import feedparser
import requests
from dateutil import parser as dateparser
from flask import Flask, render_template

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Healthcare tech RSS feeds
RSS_FEEDS = [
    {
        "name": "Healthcare IT News",
        "url": "https://www.healthcareitnews.com/rss.xml",
        "category": "Health IT",
    },
    {
        "name": "STAT News",
        "url": "https://www.statnews.com/feed/",
        "category": "Health Tech",
    },
    {
        "name": "MedCity News",
        "url": "https://medcitynews.com/feed/",
        "category": "Health Tech",
    },
    {
        "name": "Healthcare Dive",
        "url": "https://www.healthcaredive.com/feeds/news/",
        "category": "Healthcare",
    },
    {
        "name": "Fierce Healthcare",
        "url": "https://www.fiercehealthcare.com/rss/xml",
        "category": "Healthcare",
    },
    {
        "name": "Health Affairs",
        "url": "https://www.healthaffairs.org/rss/current.xml",
        "category": "Health Policy",
    },
    {
        "name": "mHealth Intelligence",
        "url": "https://mhealthintelligence.com/rss.xml",
        "category": "mHealth",
    },
    {
        "name": "EHR Intelligence",
        "url": "https://ehrintelligence.com/rss.xml",
        "category": "EHR",
    },
]

FETCH_TIMEOUT = 10  # seconds


def _parse_date(entry):
    """Return a timezone-aware datetime for an RSS entry, falling back to epoch."""
    for attr in ("published", "updated"):
        raw = getattr(entry, attr, None)
        if raw:
            try:
                dt = dateparser.parse(raw)
                if dt is not None:
                    if dt.tzinfo is None:
                        dt = dt.replace(tzinfo=timezone.utc)
                    return dt
            except (ValueError, OverflowError):
                continue
    return datetime(1970, 1, 1, tzinfo=timezone.utc)


def fetch_feed(feed_info):
    """Fetch a single RSS feed and return a list of article dicts."""
    articles = []
    try:
        response = requests.get(
            feed_info["url"],
            timeout=FETCH_TIMEOUT,
            headers={"User-Agent": "ClinIQwire/1.0 (healthcare news aggregator)"},
        )
        response.raise_for_status()
        feed = feedparser.parse(response.content)
        for entry in feed.entries[:10]:
            summary = getattr(entry, "summary", "") or ""
            # Strip basic HTML tags from summary
            summary = re.sub(r"<[^>]+>", "", summary).strip()
            summary = summary[:300] + ("…" if len(summary) > 300 else "")

            articles.append(
                {
                    "title": getattr(entry, "title", "No title"),
                    "link": getattr(entry, "link", "#"),
                    "summary": summary,
                    "published": _parse_date(entry),
                    "source": feed_info["name"],
                    "category": feed_info["category"],
                }
            )
    except requests.RequestException as exc:
        logger.warning("Failed to fetch %s: %s", feed_info["name"], exc)
    except (AttributeError, KeyError, ValueError, TypeError) as exc:
        logger.warning("Error parsing feed %s: %s", feed_info["name"], exc)
    return articles


def get_all_articles():
    """Aggregate articles from all feeds, sorted newest first."""
    all_articles = []
    for feed_info in RSS_FEEDS:
        all_articles.extend(fetch_feed(feed_info))
    all_articles.sort(key=lambda a: a["published"], reverse=True)
    return all_articles


@app.route("/")
def index():
    articles = get_all_articles()
    categories = sorted({a["category"] for a in articles})
    now = datetime.now(tz=ZoneInfo("UTC"))
    return render_template(
        "index.html",
        articles=articles,
        categories=categories,
        last_updated=now.strftime("%B %d, %Y %H:%M UTC"),
    )


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
