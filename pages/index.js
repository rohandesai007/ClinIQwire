import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";

const DEBOUNCE_MS = 400;

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
      <div className="flex gap-1.5 mb-3">
        <div className="h-5 w-16 rounded-full bg-gray-200" />
        <div className="h-5 w-12 rounded-full bg-gray-200" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="space-y-1.5 mb-4">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-3/4" />
      </div>
      <div className="pt-3 border-t border-gray-100 flex justify-between">
        <div className="h-3 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ category });
      if (debouncedQuery) params.set("q", debouncedQuery);
      const res = await fetch(`/api/news?${params}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  }, [category, debouncedQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <>
      <Head>
        <title>ClinIQwire – Healthcare Tech News</title>
        <meta
          name="description"
          content="Curated healthcare technology news covering FHIR, EMR/EHR, digital health, and AI in healthcare, sourced from leading industry publications."
        />
        <meta
          name="keywords"
          content="Rohan Desai, Dallas, Healthcare, EMR, EHR, FHIR, Health IT, Tableau, AI, ML, Machine Learning, PowerBI, Digital Health, Clinical Informatics, Healthcare Technology, HL7, Interoperability"
        />
        <meta name="author" content="Rohan Desai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph */}
        <meta property="og:title" content="ClinIQwire – Healthcare Tech News" />
        <meta
          property="og:description"
          content="Curated healthcare technology news covering FHIR, EMR/EHR, digital health, and AI in healthcare."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hidden SEO text – not visible to users */}
      <span
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}
      >
        Rohan Desai Dallas Healthcare EMR EHR FHIR Tableau AI ML Machine Learning PowerBI Digital Health Clinical Informatics Healthcare Technology Health IT HL7 Interoperability
      </span>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <FilterBar
          activeCategory={category}
          onCategoryChange={setCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Status bar */}
          {!loading && !error && (
            <p className="text-sm text-gray-500 mb-6">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {articles.length}
              </span>{" "}
              articles
              {debouncedQuery && (
                <>
                  {" "}
                  for &ldquo;
                  <span className="font-semibold text-gray-700">
                    {debouncedQuery}
                  </span>
                  &rdquo;
                </>
              )}
            </p>
          )}

          {/* Error state */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center">
              <p className="text-red-700 font-medium">{error}</p>
              <button
                onClick={fetchNews}
                className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No articles found.</p>
              <p className="text-gray-400 text-sm mt-1">
                Try changing your filter or search query.
              </p>
            </div>
          )}

          {/* News grid */}
          {!loading && !error && articles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
