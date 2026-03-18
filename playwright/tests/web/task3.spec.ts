import path from 'path';
import { test, expect } from './fixtures';

const UPLOAD_ASSET = path.join(__dirname, 'assets', 'testing.png');

test.describe('Automation Testing Practice - Form', () => {
  test('fills form with profile and submits', async ({
    page,
    homepage,
  }) => {
    await page.goto('/');

    await test.step('Submit registration profile', async () => {
      await homepage.inputName('Ega Septian');
      await homepage.inputEmail('septianega18@gmail.com');
      await homepage.inputPhone('1234567890');
      await homepage.inputAddress('Jakarta, Indonesia');
      await homepage.selectRadio('Male');

      await expect(homepage.nameInput).toHaveValue('Ega Septian');
      await expect(homepage.emailInput).toHaveValue('septianega18@gmail.com');
      await expect(homepage.phoneInput).toHaveValue('1234567890');
      await expect(homepage.addressInput).toHaveValue('Jakarta, Indonesia');
      await expect(homepage.maleRadio).toBeChecked();
    });

    await test.step('Select date picker', async () => {
      await test.step('Select date picker 1', async () => {
        await homepage.selectDatePicker1('03/01/2026');
        await expect(homepage.datePicker1Input).toHaveValue('03/01/2026');
      });
      await test.step('Select date picker 2', async () => {
        await homepage.selectDatePicker2('22/03/2026');
        await expect(homepage.datePicker2Input).toHaveValue('22/03/2026');
      });
      await test.step('Select date picker 3', async () => {
        await homepage.selectDatePicker3Range('1993-09-18', '2002-09-18');
        await expect(homepage.datePicker3StartDateInput).toHaveValue('1993-09-18');
        await expect(homepage.datePicker3EndDateInput).toHaveValue('2002-09-18');
      });  
    });

    await test.step('Upload File', async () => {
      await test.step('Upload single file', async () => {
        await homepage.uploadSingleFile(UPLOAD_ASSET);
        await expect(homepage.uploadSingleFileStatus).toContainText('Single file selected: testing.png');
      });
      await test.step('Upload multiple files', async () => {
        await homepage.uploadMultipleFiles(UPLOAD_ASSET);
        await expect(homepage.uploadMultipleFilesStatus).toContainText('Multiple files selected: testing.png');
      });
    });
  });
});
