import { Page } from "@playwright/test";
import BillingAddressComponent from "../components/BillingAddressComponent";
import ShippingAddressComponent from "../components/ShippingAddressComponent";
import PaymentMethodComponents from "../components/PaymentMethodComponent";
import PaymentInfoComponent from "../components/PaymentInfoComponent";
import ConfirmOrderComponent from "../components/ConfirmOrderComponent";

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
