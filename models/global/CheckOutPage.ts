import { expect, Page } from "@playwright/test";
import ShopingCartPage from "./ShopingCartPage";
import { AddressDetailInConfirmOrder } from "../../testData/BillingAndShippingData";
import { getCorrectedStateZipCode, getObjectKeyFromClassName } from "../../utils";

export default class CheckOutPage extends ShopingCartPage {

    constructor(protected page: Page) {
        super(page);
    }
    private billingAddressLocator = "//li[@id='opc-billing']//div[@class='step-title']";
    private firstNameInputLocator = "//input[@id='BillingNewAddress_FirstName']";
    private lastNameInputLocator = "//input[@id='BillingNewAddress_LastName']";
    private emailInputLocator = "//input[@id='BillingNewAddress_Email']";
    private companyInputLocator = "//input[@id='BillingNewAddress_Company']";
    private cityInputLocator = "//input[@id='BillingNewAddress_City']";
    private address1InputLocator = "//input[@id='BillingNewAddress_Address1']";
    private address2InputLocator = "//input[@id='BillingNewAddress_Address2']";
    private zipOrPostcodeInputLocator = "//input[@id='BillingNewAddress_ZipPostalCode']";
    private phoneNumberInputLocator = "//input[@id='BillingNewAddress_PhoneNumber']";
    private faxNumberInputLocator = "//input[@id='BillingNewAddress_FaxNumber']";
    private countryDropdownLocator = "//select[@id='BillingNewAddress_CountryId']";
    private newAddressDropdownLocator = "//select[@id='shipping-address-select']";
    private stateDropdownLocator = "//select[@id='BillingNewAddress_StateProvinceId']";
    private paymentMethodLocator = "//ul[@class='method-list']//label[contains(text(),'{{option}}')]"
    private continuteBillingAdressBtnLocator = "//input[@onclick='Billing.save()']";
    private continuteShipingAddressBtnLocator = "//input[@onclick='Shipping.save()']";
    private continuteShipingMethodBtnLocator = "//input[@onclick='ShippingMethod.save()']";
    private continutePaymentMethodBtnLocator = "//input[@onclick='PaymentMethod.save()']";
    private continutePaymentInfoBtnLocator = "//input[@onclick='PaymentInfo.save()']";
    private confirmBtnLocator = "//input[@onclick='ConfirmOrder.save()']";
    private inStorePickupCheckBoxLocator = "//input[@id='PickUpInStore']";
    private paymentInforLocator = "//p[text()='You will pay by COD']";
    private billingAdressInformationLocator = "//ul[@class='billing-info']//li";
    private shippingAdressInformationLocator = "//ul[@class='shipping-info']//li";
    private priceSubTotalLocator = "//span[text()='Sub-Total:']/parent::td/following-sibling::td//span[@class='product-price']";
    private pricePaymentMethodAdditionalFeeLocator = "//span[text()='Payment method additional fee:']/parent::td/following-sibling::td//span[@class='product-price']";
    private priceTotalLocator = "//span[contains(text(),'Total:')]/parent::td/following-sibling::td//span[@class='product-price']";


    protected getOptionCountryDropdownLocator(option: string) {
        return `//select[@id='BillingNewAddress_CountryId']//option[text()='${option}']`;
    }

    protected stateOrProvinceDropdownLocator = "//select[@id='BillingNewAddress_StateProvinceId']";
    protected getOptionStateOrProvinceDropdownLocator(option: string) {
        return `//select[@id='BillingNewAddress_StateProvinceId']//option[text()='${option}']`;
    }

    async verifyBillingAddress() {
        await expect(this.page.locator(this.billingAddressLocator)).toHaveText("Billing address");
        await this.page.locator(this.billingAddressLocator).isEnabled
    }

    enterFirstName(email: string) {
        return this.page.locator(this.firstNameInputLocator).fill(email);
    }

    enterLastName(lastName: string) {
        return this.page.locator(this.lastNameInputLocator).fill(lastName);
    }

    enterEmail(email: string) {
        return this.page.locator(this.emailInputLocator).fill(email);
    }

    enterCompany(company: string) {
        return this.page.locator(this.companyInputLocator).fill(company);
    }

    enterCity(city: string) {
        return this.page.locator(this.cityInputLocator).fill(city);
    }

    enterAddress1(address1: string) {
        return this.page.locator(this.address1InputLocator).fill(address1);
    }

    enterAddress2(address2: string) {
        return this.page.locator(this.address2InputLocator).fill(address2);
    }

    enterZipOrPostcode(zipOrPostcode: string) {
        return this.page.locator(this.zipOrPostcodeInputLocator).fill(zipOrPostcode);
    }

    enterPhoneNumber(phoneNumber: string) {
        return this.page.locator(this.phoneNumberInputLocator).fill(phoneNumber);
    }

    enterFaxNumber(faxNumber: string) {
        return this.page.locator(this.faxNumberInputLocator).fill(faxNumber);
    }

    selectCountry(country: string) {
        return this.page.selectOption(this.countryDropdownLocator, { label: country });
    }

    selectState(state: string) {
        return this.page.selectOption(this.stateDropdownLocator, { label: state });
    }

    selectAddress(address: string) {
        return this.page.selectOption(this.newAddressDropdownLocator, { label: address });
    }

    clickContinueBillingAddress() {
        return this.page.locator(this.continuteBillingAdressBtnLocator).click();
    }

    clickContinueShippingAddress() {
        return this.page.locator(this.continuteShipingAddressBtnLocator).click();
    }

    clickContinueShippingMethod() {
        return this.page.locator(this.continuteShipingMethodBtnLocator).click();
    }

    clickContinuePaymentMethod() {
        return this.page.locator(this.continutePaymentMethodBtnLocator).click();
    }

    clickContinuePaymentInfo() {
        return this.page.locator(this.continutePaymentInfoBtnLocator).click();
    }

    confirm() {
        return this.page.locator(this.confirmBtnLocator).click();
    }

    async checkInStorePickup() {
        const checkBox = this.page.locator(this.inStorePickupCheckBoxLocator);
        if (!(await checkBox.isChecked())) {
            await checkBox.check();
        }
    }

    verifyPaymentInformation() {
        return expect(this.page.locator(this.paymentInforLocator)).toHaveText("You will pay by COD");
    }

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

    verifyPriceSubTotal(subTotal: string) {
        return expect(this.page.locator(this.priceSubTotalLocator)).toHaveText(subTotal);
    }

    verifyPricePaymentMethodAdditionalFee(paymentMethodAdditionalFee: string) {
        return expect(this.page.locator(this.pricePaymentMethodAdditionalFeeLocator)).toHaveText(paymentMethodAdditionalFee);
    }

    verifyPriceTotal(total: string) {
        return expect(this.page.locator(this.priceTotalLocator)).toHaveText(total);
    }

    async selectPaymentMethod(option: string) {
        const locator = await this.paymentMethodLocator.replace('{{option}}', option);
        await this.page.locator(locator).click();
    }
}   
