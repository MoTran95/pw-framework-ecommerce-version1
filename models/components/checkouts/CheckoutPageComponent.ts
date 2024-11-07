import { Locator } from "@playwright/test";

export default class CheckoutPageComponent {
    
    private continueSel = ".button-1";
    private backSel = ".back-link";

    constructor(protected component: Locator){}

    continue() {
        return this.component.locator(this.continueSel).click();
    }

    back() {
        return this.component.locator(this.backSel).click();
    }

}