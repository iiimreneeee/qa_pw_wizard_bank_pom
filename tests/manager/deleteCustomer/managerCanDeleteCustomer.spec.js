import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Delete customer tests', () => {
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
  });

  test('Assert manager can delete customer', async ({ page }) => {
    const customersListPage = new CustomersListPage(page);
    await customersListPage.open();

    const customerRow = customersListPage.tableRows.filter({ hasText: firstName });
    await customerRow.getByRole('button', { name: 'Delete' }).click();
    await customersListPage.assertCustomerNotInList(firstName);
    await page.reload();
    await customersListPage.assertCustomerNotInList(firstName);
  });
});
