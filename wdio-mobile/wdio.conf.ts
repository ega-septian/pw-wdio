import type { Capabilities, Options } from '@wdio/types';

/** WDIO CLI options (autoCompileOpts) tidak ada di @wdio/types — di-extend di sini. */
export const config: Options.Testrunner &
  Capabilities.WithRequestedTestrunnerCapabilities & {
    autoCompileOpts?: {
      autoCompile?: boolean;
      tsNodeOpts?: { project?: string };
    };
  } = {
  runner: 'local',
  specs: ['./tests/**/*.spec.ts'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      'appium:platformName': 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'com.wallet.crypto.trustapp',
      'appium:appActivity': '.ui.app.AppActivity.default',
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
    },
  },
};
