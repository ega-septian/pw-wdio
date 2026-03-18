import welcomePage from '../pages/welcome.page';
import homepagePage from '../pages/homepage.page';
import { step } from './helpers/allure-step';
import { expect } from 'chai';

describe('Mobile - Create wallet', () => {
  it('Successfully create a new wallet with passcode and see home', async function () {
    await step('Tap Create new wallet button', async () => {
      await welcomePage.clickCreateNewWallet();
    });
    await step('Create passcode', async () => {
      await welcomePage.inputPasscode('123456');
    });

    await step('Confirm passcode', async () => {
      await welcomePage.inputPasscode('123456');
    });

    await step('Click deny on biometric login screen', async () => {
      await welcomePage.clickDeny();
    });

    await step('Success create wallet', async () => {
      await welcomePage.walletReadyTitle.waitForDisplayed({ timeout: 30000 });
      await welcomePage.addFundsToGetStartedText.waitForDisplayed({ timeout: 30000 });
      expect(await welcomePage.walletReadyTitle.isDisplayed()).to.be.true;
      expect(await welcomePage.addFundsToGetStartedText.isDisplayed()).to.be.true;
    });

    await step('Click skip on create wallet screen', async () => {
      await welcomePage.clickSkip();
      expect(await homepagePage.homeNavigationButton.isDisplayed()).to.be.true;
    });
  });
});
