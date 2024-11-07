import { expect, Page } from "@playwright/test";
import { AddressDetailInConfirmOrder } from "../../testData/BillingAndShippingData";
import { getCorrectedStateZipCode, getObjectKeyFromClassName } from "../../utils";

export default class BillingInfoComponent {
    constructor(private page: Page) {}

    private billingAdressInformationLocator = "//ul[@class='billing-info']//li";


    async verifyBillingAddressInformation(billingInfor: AddressDetailInConfirmOrder) {
        await this.page.waitForSelector(this.billingAdressInformationLocator);
        let inforList = await this.page.locator(this.billingAdressInformationLocator).all();

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
}   
