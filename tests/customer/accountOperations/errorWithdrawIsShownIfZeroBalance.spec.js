import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert the customer cannot withdraw money with empty balance', async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Ron Weasly');
  await customerLoginPage.clickLoginButton();
  await accountPage.assertAccountLineContainsText('Balance : 0');
  
  await accountPage.clickWithdrawalButton();

  const amount = '100';

  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawalFormButton();
  await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
});
