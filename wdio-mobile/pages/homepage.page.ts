import { $ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import Page from './page';

class HomepagePage extends Page {
  get homeNavigationButton(): ChainablePromiseElement {
    return $('//android.view.View[@resource-id="HomeNavigationButton"]');
  }

  async clickHomeNavigation(): Promise<void> {
    await this.clickElement(this.homeNavigationButton);
  }
}

export default new HomepagePage();
