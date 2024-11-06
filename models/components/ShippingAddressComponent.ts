import { expect, Page } from "@playwright/test";
import { AddressDetailInConfirmOrder } from "../../testData/BillingAndShippingData";
import { getCorrectedStateZipCode, getObjectKeyFromClassName } from "../../utils";

export default class ShippingAddressComponent {

    constructor(private page: Page) { }
    
    private shippingAdressInformationLocator = "//ul[@class='shipping-info']//li";

    async verifyShippingAddressInformation(billingInfor: AddressDetailInConfirmOrder) {
        await this.page.waitForSelector(this.shippingAdressInformationLocator);
        let inforList = await this.page.locator(this.shippingAdressInformationLocator).all();

        const actualBillInfo = {};
        for (const infor of inforList) {
            let className = await infor.getAttribute("class") || '';
            let value = await infor.textContent() || '';

            className = getObjectKeyFromClassName(className);
            value = getCorrectedStateZipCode(value);

            if (!actualBillInfo[className]) {
                actualBillInfo[className] = value.trim();
            }
        }

        expect(actualBillInfo).toMatchObject(billingInfor);
    }

    getShippingAddressInformation(shippingInfor: string[]) {
        return expect(this.page.locator(this.shippingAdressInformationLocator)).toHaveText(shippingInfor);
    }
}   
