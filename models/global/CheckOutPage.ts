import { Page } from "@playwright/test";
import BillingAddressComponent from "../components/checkouts/BillingAddressComponent";
import ShippingAddressComponent from "../components/checkouts/ShippingAddressComponent";
import ConfirmOrderComponent from "../components/checkouts/ConfirmOrderComponent";
import PaymentInfoComponent from "../components/checkouts/PaymentInfoComponent";
import PaymentMethodComponents from "../components/checkouts/PaymentMethodComponent";
export default class CheckOutPage  {
    constructor(private page: Page) {}

    getBillingAddressComponent() {
        return new BillingAddressComponent(this.page.locator(BillingAddressComponent.SELECTOR));
    }

    getShippingAddressComponent() {
        return new ShippingAddressComponent(this.page.locator(ShippingAddressComponent.SELECTOR));
    }

    getPaymentMethodComponent() {
        return new PaymentMethodComponents(this.page.locator(PaymentMethodComponents.SELECTOR));
    }
    
    getPaymentInfoComponent() {
        return new PaymentInfoComponent(this.page.locator(PaymentInfoComponent.SELECTOR));
    }

    getConfirmOrderComponent() {
        return new ConfirmOrderComponent(this.page.locator(ConfirmOrderComponent.SELECTOR));
    }
}   
