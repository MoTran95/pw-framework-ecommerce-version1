import ProductOrderPage from "./ProductOrderPage";

export default class ShopingCartPage extends ProductOrderPage {
    private conditionCheckboxLocator = "//input[@id='termsofservice']";
    private checkoutBtnLocator = "//button[@id='checkout']";

    
    checkConditionCheckbox() {
       return this.page.locator(this.conditionCheckboxLocator).click();
    }

    checkOut() {
        return this.page.locator(this.checkoutBtnLocator).click();
    }
        
}