import { Page } from '@playwright/test';
import { BaseActions } from './BaseAction';


export abstract class BasePage extends BaseActions {
    protected constructor(page: Page) {
        super(page);
    }

    // Mọi page con đều cần implement hàm này
    abstract isPageLoaded(): Promise<void>;
}
