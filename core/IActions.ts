export interface IActions {
    navigate(url: string): Promise<void>;
    click(selector: string): Promise<void>;
    type(selector: string, text: string): Promise<void>;
    selectDropdown(selector: string, value: string): Promise<void>;
    getText(selector: string): Promise<string | null>;
    waitForVisible(selector: string): Promise<void>;
}
