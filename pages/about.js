import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About – Rohan Desai | ClinIQwire</title>
        <meta
          name="description"
          content="Rohan Desai is a Dallas-based healthcare technology professional specialising in EMR, EHR, FHIR, AI/ML, Tableau, and PowerBI. Learn more about the creator of ClinIQwire."
        />
        <meta
          name="keywords"
          content="Rohan Desai, Dallas, Healthcare, EMR, EHR, FHIR, Health IT, Tableau, AI, ML, Machine Learning, PowerBI, Digital Health, Clinical Informatics, Healthcare Technology"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph */}
        <meta property="og:title" content="About – Rohan Desai | ClinIQwire" />
        <meta
          property="og:description"
          content="Dallas-based healthcare technology professional passionate about EMR/EHR interoperability, AI/ML, and data visualisation."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/about`} />
      </Head>

      {/* Hidden SEO text – not visible to users */}
      <span
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}
      >
        Rohan Desai Dallas Healthcare EMR EHR FHIR Tableau AI ML Machine Learning PowerBI Digital Health Clinical Informatics Healthcare Technology Health IT
      </span>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Banner */}
            <div className="h-28 bg-gradient-to-r from-blue-900 to-blue-700" />

            <div className="px-8 pb-8">
              {/* Avatar placeholder */}
              <div className="-mt-14 mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-cyan-500 flex items-center justify-center text-white text-4xl font-extrabold shadow-md">
                  RD
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">
                    Rohan Desai
                  </h1>
                  <p className="text-blue-700 font-medium mt-0.5">
                    Healthcare Technology Professional
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    📍 Dallas, Texas
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.linkedin.com/in/rohandesai07/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                  >
                    {/* LinkedIn icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.059-1.863-3.059-1.865 0-2.151 1.456-2.151 2.961v5.702h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.609v5.587z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://rohandesai.bio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors"
                  >
                    🌐 rohandesai.bio
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 prose prose-sm text-gray-700 max-w-none">
                <p>
                  Rohan Desai is a Dallas-based healthcare technology professional
                  with deep expertise spanning <strong>Electronic Medical Records
                  (EMR/EHR)</strong>, <strong>FHIR &amp; HL7 interoperability</strong>,
                  <strong> Artificial Intelligence and Machine Learning</strong> in
                  clinical settings, and advanced data visualisation with{" "}
                  <strong>Tableau</strong> and <strong>PowerBI</strong>.
                </p>
                <p>
                  Passionate about bridging the gap between raw health data and
                  actionable clinical insights, Rohan created <strong>ClinIQwire</strong>{" "}
                  to serve as a curated, always-fresh pulse of the healthcare technology
                  landscape — aggregating news from leading industry sources so
                  clinicians, informaticists, and health-tech professionals can stay
                  current without the noise.
                </p>
                <p>
                  His work sits at the intersection of digital health strategy,
                  enterprise EMR implementations, and data-driven decision-making,
                  with a track record in deploying scalable solutions that improve
                  patient outcomes and operational efficiency.
                </p>
              </div>

              {/* Expertise tags */}
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "EMR / EHR",
                    "FHIR & HL7",
                    "AI in Healthcare",
                    "Machine Learning",
                    "Tableau",
                    "PowerBI",
                    "Digital Health",
                    "Clinical Informatics",
                    "Health IT Strategy",
                    "Interoperability",
                    "Data Analytics",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-medium rounded-full border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connect section */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Connect
                </h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/rohandesai07/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      linkedin.com/in/rohandesai07
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://rohandesai.bio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      rohandesai.bio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
