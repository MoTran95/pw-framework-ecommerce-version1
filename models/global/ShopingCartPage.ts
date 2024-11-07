import { computerType } from "../../types/ProductType";
import CartItemRowComponent from "../components/shoppingCarts/CartItemRowComponent";
import CartTotalComponent from "../components/shoppingCarts/CartTotalComponent";
import BasePage from "./BasePage";

export default class ShopingCartPage extends BasePage {
    private conditionCheckboxLocator = "//input[@id='termsofservice']";
    private checkoutBtnLocator = "//button[@id='checkout']";
    

    checkConditionCheckbox() {
       return this.page.locator(this.conditionCheckboxLocator).click();
    }

    checkOut() {
        return this.page.locator(this.checkoutBtnLocator).click();
    }
    
    async getAllProductCartData() {
        const data: computerType[] = [];
        await this.page.waitForSelector(CartItemRowComponent.SELECTOR)
        const cartItemRowLocators = await this.page.locator(CartItemRowComponent.SELECTOR).all();
        for (const cartItemRowLocator of cartItemRowLocators) {
            const itemData = await new CartItemRowComponent(cartItemRowLocator).getProductData();
            data.push(itemData);
        }

        return data;
    }

    async getPrices() {
        await this.page.waitForSelector(CartTotalComponent.SELECTOR)
        const cartTotalPriceLocator = this.page.locator(CartTotalComponent.SELECTOR);
        return new CartTotalComponent(cartTotalPriceLocator).getPrices();
    }
}