import { computerType2 } from "../../types/ProductType";
import {getTrimmedTextContext } from "../../utils";
import BillingInfoComponent2 from "./BillingInfoComponent2";
import CartItemAllOrderComponent from "./CartItemAllOrderComponent ";
import CartItemRowOrderComponent from "./CartItemRowOrderComponent";
import CartTotalComponent from "./CartTotalComponent";
import CheckoutPageComponent from "./CheckoutPageComponent";
import ShippingInfoComponent2 from "./ShippingInfoComponent2";

export default class ConfirmOrderComponent extends CheckoutPageComponent {
    static SELECTOR = "#checkout-step-confirm-order";

    async getBillingInfoData () {
        return new BillingInfoComponent2(this.component.locator(BillingInfoComponent2.SELECTOR)).getBillingInfoData();
    }

    async getShippingInfoData () {
        return new ShippingInfoComponent2(this.component.locator(ShippingInfoComponent2.SELECTOR)).getShippingInfoData();
    }

    async getAllProductCartData() {
        return new CartItemAllOrderComponent(this.component.locator(CartItemAllOrderComponent.SELECTOR)).getAllProductCartData();
    }

    async getProductCartData() {
        return new CartItemRowOrderComponent(this.component.locator(CartItemRowOrderComponent.SELECTOR)).getProductData();
    }

    async getCartTotalData () {
        return new CartTotalComponent(this.component.locator(CartTotalComponent.SELECTOR)).getPrices();
    }

}