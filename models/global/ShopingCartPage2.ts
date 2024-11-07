import { computerType2 } from "../../types/ProductType";
import CartItemRowInShoppingCartComponent from "../components/CartItemRowInShoppingCartComponent";
import CartTotalComponent from "../components/CartTotalComponent";
import HomePage from "./BasePage";

export default class ShopingCartPage2 extends HomePage {
    private conditionCheckboxLocator = "//input[@id='termsofservice']";
    private checkoutBtnLocator = "//button[@id='checkout']";
    

    checkConditionCheckbox() {
       return this.page.locator(this.conditionCheckboxLocator).click();
    }

    checkOut() {
        return this.page.locator(this.checkoutBtnLocator).click();
    }
    
    async getAllProductCartData() {
        const data: computerType2[] = [];
        await this.page.waitForSelector(CartItemRowInShoppingCartComponent.SELECTOR)
        const cartItemRowLocators = await this.page.locator(CartItemRowInShoppingCartComponent.SELECTOR).all();
        for (const cartItemRowLocator of cartItemRowLocators) {
            const itemData = await new CartItemRowInShoppingCartComponent(cartItemRowLocator).getProductData();
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