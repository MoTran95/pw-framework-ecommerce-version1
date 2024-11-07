import { Locator } from "@playwright/test";
import { computerType2 } from "../../types/ProductType";
import CartItemRowOrderComponent from "./CartItemRowOrderComponent";

export default class CartItemAllOrderComponent {
   static SELECTOR = '.cart';

   constructor(private component: Locator) { }

   async getAllProductCartData() {
      const data: computerType2[] = [];
      await this.component.waitFor({ state: "visible" });
      const cartItemRowLocators = await this.component.locator(CartItemRowOrderComponent.SELECTOR).all();
      for (const cartItemRowLocator of cartItemRowLocators) {
         const itemData = await new CartItemRowOrderComponent(cartItemRowLocator).getProductData();
         data.push(itemData);
      }

      return data;
   }
}