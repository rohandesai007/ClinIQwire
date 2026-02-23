export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
              ClinIQ
              <span className="text-cyan-300">wire</span>
            </h1>
            <p className="text-blue-200 text-sm mt-0.5">
              Healthcare Tech News &amp; Insights · FHIR · EMR · Digital Health
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
