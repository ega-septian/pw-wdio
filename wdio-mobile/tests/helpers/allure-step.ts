import AllureReporter from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export async function step(name: string, fn: () => Promise<void>): Promise<void> {
  AllureReporter.startStep(name);
  try {
    await fn();
    AllureReporter.endStep(Status.PASSED);
  } catch (err) {
    AllureReporter.endStep(Status.FAILED);
    throw err;
  }
}
