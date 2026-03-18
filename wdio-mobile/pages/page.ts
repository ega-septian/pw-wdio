import type { ChainablePromiseElement } from 'webdriverio';

export default class Page {
  async waitForElement(element: ChainablePromiseElement): Promise<void> {
    await element.waitForDisplayed({ timeout: 10000 });
  }

  async clickElement(element: ChainablePromiseElement): Promise<void> {
    await this.waitForElement(element);
    await element.click();
  }

  async getElementText(element: ChainablePromiseElement): Promise<string> {
    await this.waitForElement(element);
    return await element.getText();
  }
}
