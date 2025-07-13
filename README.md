# Performance Lighthouse Runner 🚦


## Commands
FE
```
npm run dev
```
BE
```
cd backend
node index.js
```

A **Vue 3** web application to automate **Google Lighthouse audits** for multiple URLs — with advanced features for running tests in batches, averaging results, retrying failed runs, exporting reports, and comparing historical performance data.

---

## ✨ Features

- 📂 **Upload** URLs from `.xlsx` or `.xml` files, or paste them manually.
- 🔢 **Configure runs:** Set how many Lighthouse runs to execute per URL.
- 🔄 **Auto-retry:** Automatically re-run failed audits to reach a full set of successful results for accurate averages.
- 📊 **Visualize results:** View per-URL averages, min/max scores, and interactive charts.
- 📋 **Export & share:** Copy results as Markdown (for Confluence/Jira) or download detailed reports in Excel.
- 📈 **Compare runs:** Upload previous results to compare performance trends side-by-side with charts and diffs.

---

## 🛠️ Tech Stack

- **Frontend:** Vue 3, Vite, Element Plus, Tailwind CSS
- **Data parsing:** SheetJS (`xlsx`), `xml2js`
- **Charts:** Chart.js (`vue-chartjs`)
- **Clipboard:** `clipboard.js` for easy copy to Markdown
- **Backend:** Node.js, Express, Puppeteer, Lighthouse CLI (planned)

---

## 📌 Project Goals

✅ Simplify running **Lighthouse audits** for teams.
✅ Automate **batch runs** for more reliable metrics.
✅ Make it easy to **share results** with non-technical stakeholders.
✅ Provide **side-by-side comparisons** for performance regressions.

---

## 🚧 Status

This project is **actively being developed**.
Core goals:
- Build an intuitive **file upload + URL input UI**
- Implement **batch run & retry logic**
- Add **progress tracking** and **live results**
- Deliver clear, shareable **exports & charts**

---

## 📄 License

[MIT](LICENSE)

---

## 🤝 Contributions

PRs welcome! Ideas, suggestions, and feedback are highly appreciated.

---

## How the FE and BE works

┌──────────────────────────────┐
│         User's Browser       │
│──────────────────────────────│
│  🧑‍💻 Vue 3 Frontend App       │
│  - Vite                      │
│  - Tailwind CSS              │
│  - Element Plus (UI)         │
│  - Vue Router                │
│                              │
│  👇                          │
│  Calls API: /run-lighthouse  │
└───────────────┬──────────────┘
                │  HTTPS Request (JSON)
                ▼
┌───────────────────────────────────────────────┐
│           Node.js Backend Server              │
│────────────────────────────────────────────── │
│  🟢 Express.js                                 │
│  - Defines route POST /run-lighthouse         │
│  - Validates input (URL, runs, title, mode)   │
│                                               │
│  ┌─────────────┐                               │
│  │ Lighthouse  │                              │
│  │ (npm pkg)   │                              │
│  └─────────────┘                               │
│    ⬇                                            │
│  🟢 chrome-launcher or puppeteer-core           │
│  - Spins up headless Chrome                    │
│  - Runs Lighthouse audit                      │
│  - Collects JSON reports                      │
│                                               │
│  🟢 (Optional) Worker queue                    │
│  - If running multiple URLs / big runs        │
│  - Helps retry failed runs                    │
│                                               │
│  📄 Generates final result JSON                │
│                                               │
│  ✅ Sends JSON back to frontend                │
└───────────────┬───────────────────────────────┘
                │
                ▼
┌──────────────────────────────┐
│   Vue Frontend Receives JSON │
│  - Shows result table/chart  │
│  - Lets user copy Markdown   │
│  - Lets user download Excel  │
└──────────────────────────────┘
