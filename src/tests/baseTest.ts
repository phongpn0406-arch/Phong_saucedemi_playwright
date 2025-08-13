import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'
import { LoginSteps } from '../steps/loginSteps';

type TestFixtures = {
    page: Page;
    loginPage: LoginPage;
    loginSteps: LoginSteps;
};

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    loginSteps: async ({ loginPage }, use) => {
        await use(new LoginSteps(loginPage));
    },
});

export { expect } from '@playwright/test';
