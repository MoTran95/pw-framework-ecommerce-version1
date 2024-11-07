import { Locator } from "@playwright/test";
import CheckoutPageComponent from "./CheckoutPageComponent";
import { getTrimmedTextContext } from "../../../utils";

export default class PaymentInfoComponent extends CheckoutPageComponent {
    static SELECTOR = "#checkout-step-payment-info"; 
    private info = ".info";

   async getTextPaymentInfoByCOD() {
        await this.component.waitFor({ state: "visible" });
        return await getTrimmedTextContext(this.component.locator(this.info));
    }

}
