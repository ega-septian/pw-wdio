import { type Page, type Locator } from '@playwright/test';

export class Homepage {
  page: Page;
  nameInput: Locator;
  emailInput: Locator;
  phoneInput: Locator;
  addressInput: Locator;
  maleRadio: Locator;
  femaleRadio: Locator;
  datePicker1Input: Locator;
  datePicker2Input: Locator;
  datePicker3StartDateInput: Locator;
  datePicker3EndDateInput: Locator;
  uploadSingleFileInput: Locator;
  uploadMultipleFilesInput: Locator;
  uploadSingleFileNameDisplay: Locator;
  uploadMultipleFilesNameDisplay: Locator;
  uploadSingleFileStatus: Locator;
  uploadMultipleFilesStatus: Locator;
  uploadSingleFileButton: Locator;
  uploadMultipleFilesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Enter Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Enter EMail' });
    this.phoneInput = page.getByRole('textbox', { name: 'Enter Phone' });
    this.addressInput = page.getByRole('textbox', { name: 'Address:' });
    this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.femaleRadio = page.getByRole('radio', { name: 'Female', exact: true });
    this.datePicker1Input = page.locator('#datepicker');
    this.datePicker2Input = page.locator("#txtDate");
    this.datePicker3StartDateInput = page.getByPlaceholder('Start Date');
    this.datePicker3EndDateInput = page.getByPlaceholder('End Date');
    this.uploadSingleFileInput = page.locator('input[type="file"]').first();
    this.uploadMultipleFilesInput = page.locator('input[type="file"]').nth(1);
    this.uploadSingleFileNameDisplay = page.locator('tr').filter({ has: page.locator('input[type="file"]') }).first();
    this.uploadMultipleFilesNameDisplay = page.locator('tr').filter({ has: page.locator('input[type="file"]') }).nth(1);
    this.uploadMultipleFilesStatus = page.locator('#multipleFilesStatus');
    this.uploadSingleFileStatus = page.locator('#singleFileStatus');
    this.uploadSingleFileButton = page.getByRole('button', { name: 'Upload Single File' });
    this.uploadMultipleFilesButton = page.getByRole('button', { name: 'Upload Multiple Files' });
  }

  async uploadSingleFile(filePath: string) {
    await this.uploadSingleFileInput.setInputFiles(filePath);
    await this.uploadSingleFileButton.click();
  }

  async uploadMultipleFiles(filePath: string) {
    await this.uploadMultipleFilesInput.setInputFiles(filePath);
    await this.uploadMultipleFilesButton.click();
  }

  private async pickDayInCalendar(day: number) {
    const dayStr = String(day);
    await this.page
      .locator('.ui-datepicker-calendar td:not(.ui-datepicker-other-month) a')
      .filter({ hasText: new RegExp(`^${dayStr}$`) })
      .first()
      .click();
  }

  async inputName(text: string) {
    await this.nameInput.fill(text);
  }

  async inputEmail(text: string) {
    await this.emailInput.fill(text);
  }

  async inputPhone(text: string) {
    await this.phoneInput.fill(text);
  }

  async inputAddress(text: string) {
    await this.addressInput.fill(text);
  }

  async selectRadio(option: 'Male' | 'Female') {
    const radio = option === 'Male' ? this.maleRadio : this.femaleRadio;
    await radio.click();
  }

  async selectDatePicker1(dateOrDay: string) {
    await this.datePicker1Input.click();
    await this.datePicker1Input.pressSequentially(dateOrDay);
    await this.datePicker1Input.press('Enter');
  }

  async selectDatePicker2(dateOrDay: string) {
    const [day] = dateOrDay.split('/').map(Number);
    await this.datePicker2Input.click();
    await this.page.locator('.ui-datepicker-calendar').waitFor({ state: 'visible', timeout: 5000 });
    await this.pickDayInCalendar(day);
  }

  async selectDatePicker3Range(fromDate: string, toDate: string) {
    await this.datePicker3StartDateInput.fill(fromDate);
    await this.datePicker3EndDateInput.fill(toDate);
  }
}
