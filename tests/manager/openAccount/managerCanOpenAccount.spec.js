import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Open account tests', () => {
  let firstName;
  let lastName;
  let postCode;

  test.beforeEach(async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);

    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.addCustomer(firstName, lastName, postCode);
    await page.reload();
  });

  test('Assert manager can open account', async ({ page }) => {
    const bankManagerMainPage = new BankManagerMainPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomersListPage(page);

    const fullName = `${firstName} ${lastName}`;

    await bankManagerMainPage.clickOpenAccountButton();
    await openAccountPage.openAccount(fullName, 'Dollar');
    await page.reload();
    await bankManagerMainPage.clickCustomersButton();

    const lastRow = customersListPage.tableRows.last();
    const accountNumberCell = lastRow.locator('td').nth(3);

    await expect(accountNumberCell).not.toHaveText('');
  });
});
