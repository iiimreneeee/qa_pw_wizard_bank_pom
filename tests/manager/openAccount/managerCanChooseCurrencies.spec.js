import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);

  await managerMainPage.open();
  await managerMainPage.clickOpenAccountButton();
  await openAccountPage.selectCurrency('Dollar');
  await expect(openAccountPage.currencySelect).toHaveValue('Dollar');
  await openAccountPage.selectCurrency('Pound');
  await expect(openAccountPage.currencySelect).toHaveValue('Pound');
  await openAccountPage.selectCurrency('Rupee');
  await expect(openAccountPage.currencySelect).toHaveValue('Rupee');
});
