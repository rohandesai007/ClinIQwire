/**
 * Healthcare Tech RSS feed sources focused on FHIR, EMR, and Health IT news.
 */
export const FEED_SOURCES = [
  {
    name: "Healthcare IT News",
    url: "https://www.healthcareitnews.com/rss.xml",
    tags: ["health-it"],
  },
  {
    name: "MedCity News – Health IT",
    url: "https://medcitynews.com/category/health-it/feed/",
    tags: ["health-it"],
  },
  {
    name: "Fierce Healthcare",
    url: "https://www.fiercehealthcare.com/rss/xml",
    tags: ["health-it"],
  },
  {
    name: "Becker's Health IT",
    url: "https://www.beckershospitalreview.com/feed/",
    tags: ["health-it"],
  },
  {
    name: "HIT Consultant",
    url: "https://hitconsultant.net/feed/",
    tags: ["health-it"],
  },
  {
    name: "MobiHealthNews",
    url: "https://www.mobihealthnews.com/feed",
    tags: ["health-it"],
  },
  {
    name: "ONC HealthIT Buzz",
    url: "https://www.healthit.gov/buzz-blog/feed",
    tags: ["health-it", "fhir", "emr"],
  },
  {
    name: "HL7.org News",
    url: "https://www.hl7.org/news/rss.xml",
    tags: ["fhir", "hl7"],
  },
  {
    name: "Health Data Management",
    url: "https://www.healthdatamanagement.com/rss/articles",
    tags: ["health-it", "emr"],
  },
];

/**
 * Keywords used to determine the category of a news article.
 * An article may match multiple categories.
 */
export const CATEGORY_KEYWORDS = {
  fhir: [
    "fhir",
    "hl7",
    "fast healthcare interoperability",
    "smart on fhir",
    "interoperability",
  ],
  emr: [
    "emr",
    "ehr",
    "electronic health record",
    "electronic medical record",
    "epic",
    "cerner",
    "meditech",
    "allscripts",
    "athenahealth",
  ],
  "health-it": [
    "health it",
    "healthcare it",
    "health information technology",
    "digital health",
    "telehealth",
    "telemedicine",
    "health tech",
    "healthcare technology",
    "clinical informatics",
  ],
  ai: [
    "artificial intelligence",
    "ai in health",
    "ai for health",
    "ai-powered",
    "ai-driven",
    "clinical ai",
    "machine learning",
    "deep learning",
    "nlp",
    "natural language processing",
    "predictive analytics",
  ],
};

/**
 * Detect categories for an article based on its title and content.
 * @param {string} title
 * @param {string} content
 * @returns {string[]}
 */
export function detectCategories(title = "", content = "") {
  const text = `${title} ${content}`.toLowerCase();
  const matched = [];
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      matched.push(category);
    }
  }
  // Default to health-it if no specific category matched
  return matched.length > 0 ? matched : ["health-it"];
}

/** HTML entity lookup table for single-pass decoding. */
const HTML_ENTITIES = {
  "&nbsp;": " ",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&amp;": "&",
};

/**
 * Strip HTML tags from a string and decode common HTML entities in a single pass.
 * Using a single regex pass prevents double-unescaping (e.g. &amp;lt; → &lt; only).
 * @param {string} html
 * @returns {string}
 */
export function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|lt|gt|quot|#39|amp);/g, (m) => HTML_ENTITIES[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Truncate text to a maximum number of characters, adding ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text = "", maxLength = 200) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}
