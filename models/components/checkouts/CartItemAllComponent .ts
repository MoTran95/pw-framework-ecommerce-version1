import { Locator } from "@playwright/test";
import CartItemRowComponent from "./CartItemRowComponent";
import { computerType } from "../../../types/ProductType";

export default class CartItemAllComponent {
   static SELECTOR = '.cart';

   constructor(private component: Locator) { }

   async getAllProductCartData() {
      const data: computerType[] = [];
      await this.component.waitFor({ state: "visible" });
      const cartItemRowLocators = await this.component.locator(CartItemRowComponent.SELECTOR).all();
      for (const cartItemRowLocator of cartItemRowLocators) {
         const itemData = await new CartItemRowComponent(cartItemRowLocator).getProductData();
         data.push(itemData);
      }

      return data;
   }
}