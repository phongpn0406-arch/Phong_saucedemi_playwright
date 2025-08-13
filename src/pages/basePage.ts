import { Page, expect } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    // Hành động cơ bản
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(selector: string): Promise<void> {
        await this.page.locator(selector).click();
    }

    async type(selector: string, text: string): Promise<void> {
        await this.page.locator(selector).fill(text);
    }

    async selectDropdown(selector: string, value: string): Promise<void> {
        await this.page.locator(selector).selectOption(value);
    }

    async getText(selector: string): Promise<string | null> {
        return await this.page.locator(selector).textContent();
    }

    async waitForVisible(selector: string): Promise<void> {
        await this.page.locator(selector).waitFor({ state: 'visible' });
    }

    async expectUrlContains(substring: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(substring));
    }

    protected async expectText(selector: string, expected: string): Promise<void> {
        await expect(this.page.locator(selector)).toContainText(expected);
    }

    // Mỗi page con phải tự define cách xác nhận đã load
    abstract isPageLoaded(): Promise<void>;
}