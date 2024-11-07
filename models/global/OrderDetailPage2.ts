import { Page } from "@playwright/test";
import BillingInfoComponent2 from "../components/BillingInfoComponent2";
import ShippingInfoComponent2 from "../components/ShippingInfoComponent2";
import CartItemRowOrderComponent from "../components/CartItemRowOrderComponent";
import CartTotalComponent from "../components/CartTotalComponent";
import CartItemAllOrderComponent from "../components/CartItemAllOrderComponent ";

export default class OrderDetailPage2 {
   private reOrderSel = ".button-1";

   constructor(private page: Page){}

   async getBillingInfoData () {
       return new BillingInfoComponent2(this.page.locator(BillingInfoComponent2.SELECTOR)).getBillingInfoData();
   }

   async getShippingInfoData () {
       return new ShippingInfoComponent2(this.page.locator(ShippingInfoComponent2.SELECTOR)).getShippingInfoData();
   }

   async getAllProductCartData() {
       return new CartItemAllOrderComponent(this.page.locator(CartItemAllOrderComponent.SELECTOR)).getAllProductCartData();
   }

   async getProductCartData() {
       return new CartItemRowOrderComponent(this.page.locator(CartItemRowOrderComponent.SELECTOR)).getProductData();
   }

   async getCartTotalData () {
       return new CartTotalComponent(this.page.locator(CartTotalComponent.SELECTOR)).getPrices();
   }
   
   reOrder() {
      return this.page.locator(this.reOrderSel).click();
  }
}