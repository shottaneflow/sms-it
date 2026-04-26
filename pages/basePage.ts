import {expect,Locator,Page} from "@playwright/test"

export abstract class BasePage{
    protected readonly page: Page;
    private readonly popup:      Locator;
    private readonly popupClose: Locator;
    constructor(page: Page){
        this.page=page
        this.popup      = page.locator('[role="dialog"].mo-modal__paper');
        this.popupClose = page.locator('button[aria-label="Close"]');
    }

    protected abstract root(): Locator;
    protected abstract pageName: string;



    async waitForOpen(): Promise<void>{
        await expect(
            this.root(),
            `Страница ${this.pageName} не открылась`)
            .toBeVisible();
    }
    async waitForUrl(re : RegExp): Promise<void>{
        await expect(this.page).toHaveURL(re);
    }
    async fill(locator: Locator,value: string): Promise<void>{
        await locator.fill(value);
    }
    async click(locator: Locator): Promise<void>{
        await locator.click()
    }
    async expectVisible(locator: Locator): Promise<void>{
        await expect(locator).toBeVisible();
    }
    async closePopupIfVisible(): Promise<void> {
        try {
            await this.popupClose.waitFor({ state: 'visible', timeout: 3_000 });
            await this.popupClose.click();
            await this.popup.waitFor({ state: 'hidden', timeout: 3_000 });
        } catch {

        }
    }
    async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        await this.waitForOpen();
        await this.closePopupIfVisible(); 
    }
}