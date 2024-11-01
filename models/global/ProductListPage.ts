import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";

export default class ProductListPage extends HomePage {
    
    constructor(protected page: Page) {
        super(page);
    } 

    private pageTiteProductLocator = "//div[@class= 'page-title']";
    protected getAProductLinkFromProductListLocator( productName: string) {
        return `//div[@class='product-item']//a[contains(text(),'${productName}')]`
    }

    protected verifyTextsInPageTitle(productType: string) {
        return expect(this.page.locator(this.pageTiteProductLocator)).toHaveText(productType);
    } 

    public goToASpecificProductPage(productName: string) {
        return this.page. locator(this.getAProductLinkFromProductListLocator(productName)).click(); 
    }
}