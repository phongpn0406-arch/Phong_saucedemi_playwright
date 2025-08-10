import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../data/user.json';

test.describe('SauceDemo Login Tests - Data Driven', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/v1/');
    });

    for (const data of loginData) {
        test(`${data.id} - ${data.desc}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.isPageLoaded();

            // Nếu có xóa input trước khi login
            if (data.clearInputsBeforeLogin) {
                // Nhập trước rồi xóa (giả lập xóa thủ công)
                await loginPage.type(loginPage.usernameInput, data.username);
                await loginPage.type(loginPage.passwordInput, data.password);

                await loginPage.type(loginPage.usernameInput, '');
                await loginPage.type(loginPage.passwordInput, '');
                await loginPage.click(loginPage.loginButton);
            } else {
                await loginPage.login(data.username, data.password);
            }

            if (data.expectedUrl) {
                await loginPage.expectUrlContains(data.expectedUrl);
            }
            if (data.expectedError) {
                await loginPage.verifyError(data.expectedError);
            }
        });
    }
});
