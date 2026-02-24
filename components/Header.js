import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <Link href="/" className="text-3xl font-extrabold tracking-tight leading-tight hover:opacity-90 transition-opacity">
              ClinIQ
              <span className="text-cyan-300">wire</span>
            </Link>
            <p className="text-blue-200 text-sm mt-0.5">
              Healthcare Tech News &amp; Insights · FHIR · EMR · Digital Health
            </p>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-blue-100 hover:text-white transition-colors">
              News
            </Link>
            <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
