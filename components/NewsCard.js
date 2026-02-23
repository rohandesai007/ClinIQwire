const CATEGORY_COLORS = {
  fhir: "bg-purple-100 text-purple-700",
  emr: "bg-green-100 text-green-700",
  "health-it": "bg-blue-100 text-blue-700",
  ai: "bg-orange-100 text-orange-700",
};

const CATEGORY_LABELS = {
  fhir: "FHIR",
  emr: "EMR",
  "health-it": "Health IT",
  ai: "AI",
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return null;
  }
}

export default function NewsCard({ article }) {
  const {
    title,
    summary,
    link,
    source,
    sourceUrl,
    publishedAt,
    categories,
  } = article;

  const formattedDate = formatDate(publishedAt);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5 flex flex-col flex-1">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-600"}`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
          >
            {title}
          </a>
        </h2>

        {/* Summary */}
        {summary && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-4">
            {summary}
          </p>
        )}

        {/* Footer: Source + Date + Link */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-gray-800 truncate">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors"
              >
                {source}
              </a>
            </span>
            {formattedDate && (
              <time
                dateTime={publishedAt}
                className="text-xs text-gray-400 mt-0.5"
              >
                {formattedDate}
              </time>
            )}
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            Read more
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
