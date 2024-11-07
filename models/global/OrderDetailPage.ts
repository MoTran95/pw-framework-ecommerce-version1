import { expect } from "@playwright/test";
import ProductOrderPage from "./ProductOrderPage";
import { AddressDetailInConfirmOrder } from "../../types/BillingShipingPaymentType";
import BillingInfoComponent from "../components/BillingInfoComponent";
import ShippingInfoComponent from "../components/ShippingInfoComponent";


export default class OrderDetailPage extends ProductOrderPage {
   private orderTotalInOrderOviewLocator = "//div[@class='order-total']//strong";
   protected subTotalAllProductLocator = "//table[@class='cart-total']//span[contains(text(),'Sub-Total:')]/parent::td/following-sibling::td//span";
   protected orderTotalInTotalAllProductLocator = "//table[@class='cart-total']//span[contains(text(),'Order Total:')]/parent::td/following-sibling::td//span";
   protected additionalFeeLocator = "//table[@class='cart-total']//span[contains(text(),'Payment method additional fee:')]/parent::td/following-sibling::td//span";
   protected shippingLocator = "//table[@class='cart-total']//span[contains(text(),'Shipping:')]/parent::td/following-sibling::td//span";
   protected taxLocator = "//table[@class='cart-total']//span[contains(text(),'Tax:')]/parent::td/following-sibling::td//span";
   private billingAddressComponent = new BillingInfoComponent(this.page);
   private shippingAddressComponent = new ShippingInfoComponent(this.page);


   getBillingAddressComponent() {
      return this.billingAddressComponent;
   }

   verifyBillingAddressInformation(billingInfor: AddressDetailInConfirmOrder) {
      return this.billingAddressComponent.verifyBillingAddressInformation(billingInfor);
   }

   verifyShippingAddressInformation(billingInfor: AddressDetailInConfirmOrder) {
      return this.shippingAddressComponent.verifyShippingAddressInformation(billingInfor);
   }

   protected getPriceACartLocator(rowIndex: number) {
      return `(//span[@class='td-title']//ancestor::tr)[${rowIndex}]//span[contains(text(),'Price:')]/parent::td`;
   }

   protected getTotalACartLocator(rowIndex: number) {
      return `(//span[@class='td-title']//ancestor::tr)[${rowIndex}]//span[contains(text(),'Total:')]/parent::td`;
   }

   protected getProductNameLocator(name: string, rowIndex: number) {
      return `(//td[@class='a-left name']/parent::tr)[${rowIndex}]//a[text()='${name}']`;
   }

   verifyShowSubTotalAllProduct(price: string) {
      return expect(this.page.locator(this.subTotalAllProductLocator)).toHaveText(price);
   }

   verifyShowToOrderTotalAllProductInTotal(price: string) {
      return expect(this.page.locator(this.orderTotalInTotalAllProductLocator)).toHaveText(price);
   }

   verifyShowToOrderTotalInOrderView(price: string) {
      return expect(this.page.locator(this.orderTotalInOrderOviewLocator)).toHaveText(price);
   }

   verifyPaymentAdditionalFee(price: string) {
      return expect(this.page.locator(this.additionalFeeLocator)).toHaveText(price);
   }

   verifyTax(price: string) {
      return expect(this.page.locator(this.taxLocator)).toHaveText(price);
   }

   verifyShipping(price: string) {
      return expect(this.page.locator(this.shippingLocator)).toHaveText(price);
   }

   verifyShowPriceACart(rowIndex: number, price: string) {
      return expect(this.page.locator(this.getPriceACartLocator(rowIndex))).toContainText(price);
   }

   verifyShowTotalACart(rowIndex: number, price: string) {
      return expect(this.page.locator(this.getTotalACartLocator(rowIndex))).toContainText(price);
   }

   verifyProductName(productName: string, rowIndex: number) {
      return expect(this.page.locator(this.getProductNameLocator(productName, rowIndex))).toHaveText(productName);
   }

}