import { Locator } from "@playwright/test";
import { getTrimmedTextContext } from "../../utils";

export default class BillingInfoComponent2 {
    static SELECTOR = ".billing-info";
    private billingInfo = "li";
    constructor(private component: Locator) {}

    async getBillingInfoData () {
        await this.component.waitFor({ state: "visible" });
        const billingInfoList = await this.component.locator(this.billingInfo).all();
        let  data: string[] = [];
        for (const row of billingInfoList) {
             const text =  (await getTrimmedTextContext(row)).split(":");
                data.push(text[1]?.trim()|| text[0]);
        }
        return data;
    }
}   
