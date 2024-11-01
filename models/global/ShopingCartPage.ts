import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";

export default class ShopingCartPage extends HomePage {

    constructor(protected page: Page) {
        super(page);
    }
    
    private pageTitleShopingCartLocator = "//div[@class='page-title']//h1[text()= 'Shopping cart']";
    protected subTotalAllProductLocator = "//table[@class='cart-total']//span[text()='Sub-Total:']/parent::td/following-sibling::td//span[@class='product-price']";
    protected totalAllProductLocator = "//table[@class='cart-total']//span[contains(text(),'Total:')]/parent::td/following-sibling::td//span[@class='product-price order-total']";
    protected additionalFeeLocator = "//table[@class='cart-total']//span[text()='Payment method additional fee:']/parent::td/following-sibling::td//span[@class='product-price']";
    protected taxLocator = "//table[@class='cart-total']//span[contains(text(),'Tax:')]/parent::td/following-sibling::td//span[@class='product-price']";
    protected shippingLocator = "//table[@class='cart-total']//span[contains(text(),'Shipping:')]/parent::td/following-sibling::td//span[@class='product-price']";
    private conditionCheckboxLocator = "//input[@id='termsofservice']";
    private checkoutBtnLocator = "//button[@id='checkout']";

    protected getProductNameLocator (name: string, rowIndex: number){
        return `(//a[@class='product-name' and text()='${name}']/ancestor::tr)[${rowIndex}]//a[@class='product-name']`;
    }

    protected getProductOptionLocator (name: string, rowIndex: number){
        return `(//a[text()='${name}']/ancestor::tr)[${rowIndex}]//div[@class='attributes']`;
    }

    protected getPriceAProductLocator (name: string, rowIndex: number){
        return `(//a[@class='product-name' and text()='${name}']/ancestor::tr)[${rowIndex}]//td[@class='unit-price nobr']//span[@class='product-unit-price']`;
    }

    protected getTotalAProductLocator (name: string, rowIndex: number){
        return `(//a[@class='product-name' and text()='${name}']/ancestor::tr)[${rowIndex}]//td[@class='subtotal nobr end']//span[@class='product-subtotal']`;
    }

    verifyProductName(productName: string, rowIndex: number) {
       return expect(this.page.locator(this.getProductNameLocator(productName,rowIndex))).toHaveText(productName);
    }

    verifyOptionsInProduct(productName: string, rowIndex: number, option: string) {
       return expect(this.page.locator(this.getProductOptionLocator(productName,rowIndex))).toContainText(option);
    }

    verifyShowPriceAProduct(productName: string, rowIndex: number, price: string) {
       return expect(this.page.locator(this.getPriceAProductLocator(productName,rowIndex))).toHaveText(price);
    }

    verifyShowTotalAProduct(productName: string, rowIndex: number, price: string) {
       return expect(this.page.locator(this.getTotalAProductLocator(productName,rowIndex))).toHaveText(price);
    }

    verifyShownShopingCartTitle() {
      return expect(this.page.locator(this.pageTitleShopingCartLocator)).toHaveText('Shopping cart');
    }

    verifyShowSubTotalAllProduct (price: string) {
       return expect(this.page.locator(this.subTotalAllProductLocator)).toHaveText(price);
    }

    verifyShowTotalAllProduct(price: string) {
       return expect(this.page.locator(this.totalAllProductLocator)).toHaveText(price);
    }

    verifyPaymentAdditionalFee( price: string) {
        return expect(this.page.locator(this.additionalFeeLocator)).toHaveText(price);
     }

    verifyTax( price: string) {
        return expect(this.page.locator(this.taxLocator)).toHaveText(price);
     }

    verifyShipping( price: string) {
        return expect(this.page.locator(this.shippingLocator)).toHaveText(price);
     }

    checkConditionCheckbox() {
       return this.page.locator(this.conditionCheckboxLocator).click();
    }

    checkOut() {
        return this.page.locator(this.checkoutBtnLocator).click();
    }
        
}