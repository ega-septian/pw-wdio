# pw-wdio

Monorepo for **Playwright** (web + API) and **WebdriverIO** (Android mobile via Appium).

---

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Node.js** | v18 or newer ([`engines`](package.json)) |
| **Playwright browsers** | Install after `npm install` (see [Setup](#setup)) |
| **Mobile tests** | Android device or emulator, **ADB** (`adb devices`), **Appium 2** with **UiAutomator2** driver (`npx appium driver install uiautomator2` if needed). JDK is usually required for Appium. |

---

## Repository layout

```
pw-wdio/
├── package.json              # npm workspaces (root)
├── .env                      # Committed with repo (root)
├── playwright/
│   ├── playwright.config.ts
│   └── tests/
│       ├── web/              # Browser tests
│       └── api/              # API tests
└── wdio-mobile/
    ├── wdio.conf.ts          # Capabilities, Appium service
    ├── pages/                # Page objects
    └── tests/                # Mobile specs (e.g. task4.spec.ts)
```

---

## Setup (new machine)

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd pw-wdio
   npm install
   ```

2. **Playwright browsers**

   ```bash
   cd playwright && npx playwright install && cd ..
   ```

---

## Running tests

Run these from the **repository root** (`pw-wdio/`).

### Playwright — API (task2) + HTML report

```bash
npm run test:api:task2:report -w playwright
```

Runs [`playwright/tests/api/task2.spec.ts`](playwright/tests/api/task2.spec.ts) and opens the Playwright HTML report.

### Playwright — Web (task3) + HTML report

```bash
npm run test:web:task3:report -w playwright
```

Runs [`playwright/tests/web/task3.spec.ts`](playwright/tests/web/task3.spec.ts) and opens the report (report opens even if a test fails).

### WebdriverIO — task4 only + Allure report

```bash
npm run wdio:task4:report -w wdio-mobile
# or from root:
npm run test:mobile:task4:report
```

Same as above, but only [`wdio-mobile/tests/task4.spec.ts`](wdio-mobile/tests/task4.spec.ts).

### Other useful commands

| Command | Description |
|---------|-------------|
| `npm run test:web -w playwright` | All web tests |
| `npm run test:api -w playwright` | All API tests |
| `npm run test:mobile -w wdio-mobile` | WDIO without Allure |
| `npm run report -w playwright` | Open last Playwright HTML report |

---

## Troubleshooting

- **API tests fail** — Check **`BASE_URL`** in **`.env`** at repo root (Playwright loads it from there).
- **Allure report shows empty / “Loading…”** — Open the report with **`npx allure open allure-report`** (HTTP), not by double-clicking `index.html`.

---

## Links

- [Playwright](https://playwright.dev/)
- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
