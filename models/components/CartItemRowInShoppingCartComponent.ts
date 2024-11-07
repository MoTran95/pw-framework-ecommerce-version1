import { Locator } from "@playwright/test";
import { getTrimmedTextContext } from "../../utils";

export default class CartItemRowInShoppingCartComponent {
   static SELECTOR = '.cart-item-row';
   private productSel = ".product-name";
   private attributeSel = '.attributes';
   private unitPriceSel = '.product-unit-price';
   private quantityInputSel = '.qty-input';
   private subTotalSel = '.product-subtotal';

   constructor(private component: Locator) { }

   async getProductData() {
      const data: any = {};

      data.productName = await getTrimmedTextContext(this.component.locator(this.productSel));
      data.productPrice = Number(await getTrimmedTextContext(this.component.locator(this.unitPriceSel)));
      data.qty = Number(await this.component.locator(this.quantityInputSel).inputValue());
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
}