import { Locator } from "@playwright/test";
import { getTrimmedTextContext } from "../../utils";
import { computerType2 } from "../../types/ProductType";

export default class CartItemRowOrderComponent {
   static SELECTOR = '.cart-item-row';
   private productSel = ".product-name";
   private attributeSel = '.attributes';
   private unitPriceSel = '.product-unit-price';
   private quantitySel = '.qty.nobr > span';
   private subTotalSel = '.product-subtotal';

   constructor(private component: Locator) { }

   async getProductData() {
      await this.component.waitFor({ state: "visible" });
      const data: any = {};

      data.productName = await getTrimmedTextContext(this.component.locator(this.productSel));
      data.productPrice = Number(await getTrimmedTextContext(this.component.locator(this.unitPriceSel)));
      data.qty = Number(await getTrimmedTextContext(this.component.locator(this.quantitySel).nth(1)));
      data.subTotal = Number(await getTrimmedTextContext(this.component.locator(this.subTotalSel)));
      const attributes = await this.component.locator(this.attributeSel).innerHTML();

      attributes
         .split('<br>')
         .map(sequence => sequence.trim().split(':'))
         .forEach((item) => {
            data[item[0].trim().toLowerCase()] = item[1].trim();
         });

      return data;
  }

   async getAllProductCartData() {
      const data: computerType2[] = [];
      await this.component.waitFor({ state: "visible" });
      const cartItemRowLocators = await this.component.locator(CartItemRowOrderComponent.SELECTOR).all();
      for (const cartItemRowLocator of cartItemRowLocators) {
         const itemData = await this.getProductData();
         data.push(itemData);
      }

      return data;
   }
}