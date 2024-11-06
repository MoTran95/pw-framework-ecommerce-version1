import { computerType2 } from "../../types/ProductType";
import CartItemRowComponent from "../components/CartItemRowComponent";
import HomePage from "./HomePage";

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
        await this.page.waitForSelector(CartItemRowComponent.SELECTOR)
        const cartItemRowLocators = await this.page.locator(CartItemRowComponent.SELECTOR).all();
        for (const cartItemRowLocator of cartItemRowLocators) {
            const itemData = await new CartItemRowComponent(cartItemRowLocator).getData();
            data.push(itemData);
        }

        return data;
    }
}