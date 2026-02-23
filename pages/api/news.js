import Parser from "rss-parser";
import { FEED_SOURCES, detectCategories, stripHtml, truncate } from "@/lib/feeds";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent":
      "ClinIQwire/1.0 (Healthcare Tech News Aggregator; +https://github.com/rohandesai007/ClinIQwire)",
  },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: false }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: false }],
    ],
  },
});

/**
 * Fetch a single RSS feed, returning an array of normalised article objects.
 * Returns an empty array on failure so one bad feed never breaks the page.
 */
async function fetchFeed(source) {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items.slice(0, 15).map((item) => {
      const rawContent =
        item.contentSnippet ||
        item["content:encodedSnippet"] ||
        item.content ||
        item.summary ||
        "";
      const summary = truncate(stripHtml(rawContent), 250);
      const categories = detectCategories(item.title, rawContent);

      return {
        id: item.guid || item.link || `${source.name}-${item.title}`,
        title: stripHtml(item.title || "Untitled"),
        summary,
        link: item.link || "#",
        source: source.name,
        sourceUrl: new URL(source.url).origin,
        publishedAt: item.pubDate || item.isoDate || null,
        categories,
        imageUrl:
          item?.mediaContent?.$.url ||
          item?.mediaThumbnail?.$.url ||
          null,
      };
    });
  } catch (err) {
    // Log the error for debugging but don't break the page
    console.error(`[ClinIQwire] Failed to fetch feed "${source.name}":`, err.message);
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { category = "all", q = "" } = req.query;

  // Fetch all feeds in parallel
  const results = await Promise.allSettled(
    FEED_SOURCES.map((source) => fetchFeed(source))
  );

  let articles = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  // Deduplicate by link
  const seen = new Set();
  articles = articles.filter((a) => {
    if (seen.has(a.link)) return false;
    seen.add(a.link);
    return true;
  });

  // Filter by category
  if (category && category !== "all") {
    articles = articles.filter((a) => a.categories.includes(category));
  }

  // Filter by search query
  if (q) {
    const query = q.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query) ||
        a.source.toLowerCase().includes(query)
    );
  }

  // Sort by date descending
  articles.sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
    const db = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
    return db - da;
  });

  // Cache for 10 minutes
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=1200"
  );

  return res.status(200).json({ articles, total: articles.length });
}
