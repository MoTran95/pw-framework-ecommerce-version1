import { expect, Locator, Page } from '@playwright/test';
import { getPriceFromText } from '../../utils';
import HomePage from './HomePage';
import ProductListPage from './ProductListPage';

export default class ProductDetailOnItemPage extends ProductListPage {

    constructor(protected page: Page) {
        super(page);
    }

    private getProductNameLocator(productName: string) {
        return `//div[@class = 'product-name']//h1[contains(text(),"${productName}")]'`
    }

    private getProductPriceLocator(productPrice: string) {
        return `//div[@class='product-price']//span[contains(text(),"${productPrice}")]`
    }

    private qtyInputTxtLocator = "//div[@class='add-to-cart']//input";
    private addToCartBtnLocator = "//div[@class='add-to-cart']//input[@type='button']";
    private emailAFriendLocator = "//div[@class='email-a-friend']//input";
    private addToCompareBtnLocator = "//div[@class='compare-products']//input";
    private shopcartBtnLocator = "//a[text()='shopping cart']";

    verifyShowProductName (productName: string) {
      return expect(this.page.locator(this.getProductNameLocator(productName))).toHaveText(productName);
    }

    getValueInProductPrice (productPrice: string) {
      return this.page.locator(this.getProductNameLocator(productPrice)).getAttribute("value");
    }

    async addtoCart() {
        await this.page.locator(this.addToCartBtnLocator).click();
    }

    async emailAFriend() {
        await this.page.locator(this.emailAFriendLocator).click();
    }

    async addToCompare() {
        await this.page.locator(this.addToCompareBtnLocator).click();
    }

    async gotoShopCart() {
        await this.page.locator(this.shopcartBtnLocator).click();
    } 
    
    async getPriceFromOptions(locator: string) {
        const allOptionList = await this.page.locator(locator).all(); 
        let sum = 0;
        for (const option of allOptionList) {
            if ( await option.isChecked()){
                const labelTextContent = await option.textContent();
                sum += getPriceFromText(labelTextContent);
            }
        } 
        return sum;
    }

    async getPriceFromSelections(locator: string) {
        const allSelectionOptions = await this.page.locator(locator).all(); 
        let sum = 0;
        for (const option of allSelectionOptions) {
            const labelTextContent = await option.textContent();
            sum += getPriceFromText(labelTextContent);
        } 
        return sum;
    }

}