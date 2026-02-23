# ClinIQwire

**ClinIQwire** is a healthcare technology news aggregator that pulls the latest articles from leading industry publications and cites them with full source attribution.

## Topics Covered

- **Healthcare IT** – digital health, clinical informatics, health information technology
- **FHIR & HL7** – Fast Healthcare Interoperability Resources, standards, interoperability
- **EMR / EHR** – Electronic Medical/Health Records, Epic, Cerner, MEDITECH, and more
- **AI in Health** – machine learning, NLP, predictive analytics in clinical settings

## News Sources

Articles are fetched from trusted RSS feeds including:

- Healthcare IT News
- MedCity News – Health IT
- Fierce Healthcare
- Becker's Health IT
- HIT Consultant
- MobiHealthNews
- ONC HealthIT Buzz Blog
- HL7.org News
- Health Data Management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Tech Stack

- **Next.js** (React framework with API routes)
- **Tailwind CSS** (utility-first styling)
- **rss-parser** (RSS/Atom feed parsing)

## Deployment

Deploy easily to [Vercel](https://vercel.com) – the app uses only Next.js API routes for server-side RSS fetching, so no separate backend is needed.
