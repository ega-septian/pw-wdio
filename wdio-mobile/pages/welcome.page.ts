import { $ } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import Page from './page';

/**
 * Page Object: Welcome / onboarding screen (Create new wallet).
 */
class WelcomePage extends Page {
  get createNewWalletButton(): ChainablePromiseElement {
    return $('//android.view.View[@resource-id="CreateNewWalletButton"]');
  }

  get denyButton(): ChainablePromiseElement {
    return $('//android.widget.TextView[@text="Deny"]');
  }

  get skipButton(): ChainablePromiseElement {
    return $('//android.widget.TextView[@text="Skip"]');
  }

  get walletReadyTitle(): ChainablePromiseElement {
    return $('//android.widget.TextView[@text="Brilliant, your wallet is ready!"]');
  }

  get addFundsToGetStartedText(): ChainablePromiseElement {
    return $('//android.widget.TextView[@text="Add funds to get started"]');
  }

  async clickCreateNewWallet(): Promise<void> {
    await this.clickElement(this.createNewWalletButton);
  }

  async clickDeny(): Promise<void> {
    await this.clickElement(this.denyButton);
  }

  async clickSkip(): Promise<void> {
    await this.clickElement(this.skipButton);
  }

  async inputPasscode(passcode: string): Promise<void> {
    for (const digit of passcode) {
      const digitEl = $(
        `//android.widget.TextView[@text="${digit}"]`,
      );
      await this.clickElement(digitEl);
    }
  }
}

export default new WelcomePage();
