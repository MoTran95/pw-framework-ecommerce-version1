import { Locator } from "@playwright/test";
import { getTrimmedTextContext } from "../../../utils";

export default class ShippingInfoComponent {
    static SELECTOR = ".shipping-info"
    private shippingInfo = "li";

    constructor(private component: Locator) { }
    async getShippingInfoData () {
        await this.component.waitFor({ state: "visible" });
        const shippingInfoList = await this.component.locator(this.shippingInfo).all();
        let  data: string[] = [];
        for (const row of shippingInfoList) {
             const text =  (await getTrimmedTextContext(row)).split(":");
                data.push(text[1]?.trim()|| text[0]);    
        }
        return data;
    }

}   
