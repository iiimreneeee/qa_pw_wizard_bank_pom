import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await expect(bankManagerMainPage.addCustomerButton).toBeVisible();
  await expect(bankManagerMainPage.openAccountButton).toBeVisible();
  await expect(bankManagerMainPage.customersButton).toBeVisible();
});