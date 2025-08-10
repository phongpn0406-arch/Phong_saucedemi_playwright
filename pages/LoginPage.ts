import type { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class LoginPage extends BasePage {
    // Đổi từ private sang public hoặc tạo getter để truy cập từ test
    public usernameInput = '#user-name';
    public passwordInput = '#password';
    public loginButton = '#login-button';
    public errorMessage = '[data-test="error"]';

    constructor(page: Page) {
        super(page);
    }

    async isPageLoaded(): Promise<void> {
        await this.waitForVisible(this.usernameInput);
    }

    async login(username: string, password: string): Promise<void> {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async verifyError(text: string): Promise<void> {
        await this.expectText(this.errorMessage, text);
    }
}
