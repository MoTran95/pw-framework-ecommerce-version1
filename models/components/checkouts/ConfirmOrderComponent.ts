import CartTotalComponent from "../shoppingCarts/CartTotalComponent";
import BillingInfoComponent from "../commom/BillingInfoComponent";
import CartItemAllComponent from "./CartItemAllComponent ";
import CartItemRowComponent from "./CartItemRowComponent";
import CheckoutPageComponent from "./CheckoutPageComponent";
import ShippingInfoComponent from "../commom/ShippingInfoComponent";

export default class ConfirmOrderComponent extends CheckoutPageComponent {
    static SELECTOR = "#checkout-step-confirm-order";

    async getBillingInfoData () {
        return new BillingInfoComponent(this.component.locator(BillingInfoComponent.SELECTOR)).getBillingInfoData();
    }

    async getShippingInfoData () {
        return new ShippingInfoComponent(this.component.locator(ShippingInfoComponent.SELECTOR)).getShippingInfoData();
    }

    async getAllProductCartData() {
        return new CartItemAllComponent(this.component.locator(CartItemAllComponent.SELECTOR)).getAllProductCartData();
    }

    async getProductCartData() {
        return new CartItemRowComponent(this.component.locator(CartItemRowComponent.SELECTOR)).getProductData();
    }

    async getCartTotalData () {
        return new CartTotalComponent(this.component.locator(CartTotalComponent.SELECTOR)).getPrices();
    }

}