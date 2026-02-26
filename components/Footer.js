export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white text-lg">
              ClinIQ<span className="text-cyan-400">wire</span>
            </span>
            <p className="text-sm mt-1">
              Aggregating healthcare tech news from trusted industry sources.
            </p>
          </div>
          <div className="text-xs text-center sm:text-right">
            <p>
              All articles are sourced and cited from their original publishers.
            </p>
            <p className="mt-1">© {year} ClinIQwire. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
