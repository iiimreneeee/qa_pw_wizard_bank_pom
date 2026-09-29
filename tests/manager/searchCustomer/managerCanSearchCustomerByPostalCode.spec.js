import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  page.on('dialog', async (dialog) => await dialog.accept());

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postCode);
});

test('Assert manager can search customer by Post Code', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.searchCustomer(postCode);

  const searchResultRow = customersListPage.tableRows
    .filter({ hasText: firstName })
    .filter({ hasText: lastName })
    .filter({ hasText: postCode });

  await expect(searchResultRow).toBeVisible();
  await expect(searchResultRow).toHaveCount(1);
});