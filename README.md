# pw-wdio

Monorepo for **Playwright** (web + API) and **WebdriverIO** (Android mobile via Appium).

---

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Node.js** | v18 or newer ([`engines`](package.json)) |
| **Playwright browsers** | Install after `npm install` (see [Setup](#setup)) |
| **Mobile tests** | Android device or emulator, **ADB** (`adb devices`), **UiAutomator2** driver under a stable **`APPIUM_HOME`** (see [Appium setup for mobile](#appium-setup-for-mobile)). JDK is usually required for Appium. |

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

3. **Appium setup for mobile**

   WDIO starts Appium from this repo’s `node_modules`. Drivers must be installed into the same **Appium home** that the server uses. Setting **`APPIUM_HOME`** to `~/.appium` avoids “driver not found” when the default home differs per folder.

   From the repo root (`pw-wdio/`):

   ```bash
   export APPIUM_HOME="$HOME/.appium"
   mkdir -p "$APPIUM_HOME"
   npx appium driver install uiautomator2
   ```

   Verify:

   ```bash
   npx appium driver list --installed
   ```

   You should see **uiautomator2**. For everyday runs, either export `APPIUM_HOME` in your shell profile (e.g. `~/.zshrc`) or prefix WDIO commands:

   ```bash
   APPIUM_HOME="$HOME/.appium" npm run test:mobile -w wdio-mobile
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
- **`Could not find a driver for automationName 'UiAutomator2'`** — Install the driver into a fixed home and reuse it when running tests (see [Appium setup for mobile](#appium-setup-for-mobile)). Example one-off run from `wdio-mobile/`:

  ```bash
  export APPIUM_HOME="$HOME/.appium"
  npx wdio run wdio.conf.ts --spec=./tests/task4.spec.ts
  ```

- **Port 4723 already in use** — Stop the other Appium/process, or rely on WDIO’s Appium service (it picks a free port if 4723 is busy). Don’t start a second Appium on the same port.

---

## Links

- [Playwright](https://playwright.dev/)
- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
