import { Page } from "@playwright/test";
import BillingInfoComponent from "../components/commom/BillingInfoComponent";
import ShippingInfoComponent from "../components/commom/ShippingInfoComponent";
import CartItemAllComponent from "../components/checkouts/CartItemAllComponent ";
import CartItemRowComponent from "../components/checkouts/CartItemRowComponent";
import CartTotalComponent from "../components/shoppingCarts/CartTotalComponent";

export default class OrderDetailPage {
   private reOrderSel = ".button-1";

   constructor(private page: Page){}

   async getBillingInfoData () {
       return new BillingInfoComponent(this.page.locator(BillingInfoComponent.SELECTOR)).getBillingInfoData();
   }

   async getShippingInfoData () {
       return new ShippingInfoComponent(this.page.locator(ShippingInfoComponent.SELECTOR)).getShippingInfoData();
   }

   async getAllProductCartData() {
       return new CartItemAllComponent(this.page.locator(CartItemAllComponent.SELECTOR)).getAllProductCartData();
   }

   async getProductCartData() {
       return new CartItemRowComponent(this.page.locator(CartItemRowComponent.SELECTOR)).getProductData();
   }

   async getCartTotalData () {
       return new CartTotalComponent(this.page.locator(CartTotalComponent.SELECTOR)).getPrices();
   }
   
   reOrder() {
      return this.page.locator(this.reOrderSel).click();
  }
}