import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    private usernameInput = this.page.locator('#user-name');
    private passwordInput = this.page.locator('#password');
    private loginButton = this.page.locator('#login-button');
    private errorMessage = this.page.locator('[data-test="error"]');
    private title = this.page.locator('.title');

    constructor(page: Page) {
        super(page);
    }

    async isPageLoaded(): Promise<void> {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async getPageTitle() {
        return await this.title.textContent();
    }

    async clearInputs() {
        await this.usernameInput.clear();
        await this.passwordInput.clear();
    }
}
