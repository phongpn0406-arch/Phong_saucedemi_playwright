import { Page, expect } from '@playwright/test';
import { IActions } from './IActions';

export class BaseActions implements IActions {
    protected page: Page; // Encapsulation

    constructor(page: Page) {
        this.page = page;
    }

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
}
