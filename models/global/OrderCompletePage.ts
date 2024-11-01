import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";

export default class OrderCompletePage extends HomePage {

    constructor(protected page: Page) {
        super(page);
    }
    private orderCompletedTiteLocator = "//div[@class= 'title']";
    private continuteBtnLocator = "//input[@value= 'Continue']";
    private orderDetailLocator = "//a[contains(text(),'Click here for order details.')]";

    verifyTextsInOrderTitle(texts: string) {
        return expect(this.page.locator(this.orderCompletedTiteLocator)).toHaveText(texts);
    } 

    continue() {
       return this.page.locator(this.continuteBtnLocator).click();
    }

    goToOrderDetailPage() {
       return this.page.locator(this.orderDetailLocator).click();
    }

}