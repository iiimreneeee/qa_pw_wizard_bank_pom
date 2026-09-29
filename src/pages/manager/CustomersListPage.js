import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('tbody tr');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

  async searchCustomer(searchString) {
    await this.searchCustomerInput.fill(searchString);
  }

  async deleteCustomer() {
    await this.deleteButton.first().click();
  }

  async assertCustomerInList(name) {
    await expect(this.tableRows.filter({ hasText: name })).toBeVisible();
  }

  async assertCustomerNotInList(name) {
    await expect(this.tableRows.filter({ hasText: name })).toHaveCount(0);
  }
}
