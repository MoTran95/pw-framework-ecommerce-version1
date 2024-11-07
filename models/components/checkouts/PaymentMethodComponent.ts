import { Locator } from "@playwright/test";
import CheckoutPageComponent from "./CheckoutPageComponent";
import { getTrimmedTextContext } from "../../../utils";


export default class PaymentMethodComponents extends CheckoutPageComponent {

    static SELECTOR = "#checkout-step-payment-method";
    private paymentDetailSel = ".payment-details";

    async selectPaymentMethod(method: string) {
        await this.component.waitFor({ state: "visible" });
        let paymentList = await this.component.locator(this.paymentDetailSel).all();

        for (const payment of paymentList) {
            const labelTextContent = await getTrimmedTextContext(payment.locator('label'));
            if(labelTextContent.includes(method)) {
               await payment.locator("input").check();
               return;
            }
        }
    }
}

