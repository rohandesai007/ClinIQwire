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

## Viewing the Site

**No external host is required to run the site.** You can run it entirely on your own computer in under a minute.

### Prerequisites

- [Node.js](https://nodejs.org/) **v18.18 or later** (LTS recommended)
- npm (bundled with Node.js)

Confirm your versions:

```bash
node -v   # should print v18.18.0 or higher
npm -v
```

### Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The page live-reloads as you edit files.

To stop the server, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the terminal.

## Tech Stack

- **Next.js** (React framework with API routes)
- **Tailwind CSS** (utility-first styling)
- **rss-parser** (RSS/Atom feed parsing)

## Deployment (sharing with others)

If you want to share the site publicly on the internet, you need to deploy it to a host. The easiest option is **Vercel** – it is free for personal projects and deploys directly from GitHub with zero configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohandesai007%2FClinIQwire)

> **Fork users:** update the `repository-url` in the button link above to point to your own fork, or just follow the manual steps below.

**Manual steps:**
1. Push your code to GitHub (already done if you're reading this).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project**, select this repository, and click **Deploy**.
4. Vercel will build and host the app automatically at a public URL.

> The app uses only Next.js API routes for server-side RSS fetching – no separate backend or database is needed.
