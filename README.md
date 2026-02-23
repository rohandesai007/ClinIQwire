# ClinIQwire

A healthcare technology news aggregator that pulls articles from leading health IT and health tech RSS feeds and displays them in a clean, filterable web interface.

## Features

- Aggregates news from 8+ healthcare & health tech sources (Healthcare IT News, STAT News, MedCity News, Healthcare Dive, Fierce Healthcare, Health Affairs, mHealth Intelligence, EHR Intelligence)
- Filter articles by category (Health IT, Health Tech, Healthcare, EHR, mHealth, Health Policy)
- Live keyword search across article titles and summaries
- Sorted newest-first

## Setup

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the app
python app.py
```

Then open <http://localhost:5000> in your browser.

## Requirements

- Python 3.9+
- See `requirements.txt` for package dependencies
