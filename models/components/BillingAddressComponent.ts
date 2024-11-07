import { Locator } from "@playwright/test";
import CheckoutPageComponent from "./CheckoutPageComponent";

export default class BillingAddressComponent extends CheckoutPageComponent {

    static SELECTOR = "#checkout-step-billing";
    private firstNameSel = "#BillingNewAddress_FirstName";
    private lastNameSel = "#BillingNewAddress_LastName";
    private emailSel = "#BillingNewAddress_Email";
    private companySel = "#BillingNewAddress_Company";
    private countrySel = "#BillingNewAddress_CountryId";
    private stateSel = "#BillingNewAddress_StateProvinceId";
    private citySel = "#BillingNewAddress_City";
    private address1Sel = "#BillingNewAddress_Address1";
    private address2Sel = "#BillingNewAddress_Address2";
    private zipSel = "#BillingNewAddress_ZipPostalCode";
    private phoneSel = "#BillingNewAddress_PhoneNumber";;
    private faxSel = "#BillingNewAddress_FaxNumber";

    enterFirstName(email: string) {
        return this.component.locator(this.firstNameSel).fill(email);
    }

    enterLastName(lastName: string) {
        return this.component.locator(this.lastNameSel).fill(lastName);
    }

    enterEmail(email: string) {
        return this.component.locator(this.emailSel).fill(email);
    }

    enterCompany(company?: string) {
        return this.component.locator(this.companySel).fill(company || "");
    }

    enterCity(city: string) {
        return this.component.locator(this.citySel).fill(city);
    }

    enterAddress1(address1: string) {
        return this.component.locator(this.address1Sel).fill(address1);
    }

    enterAddress2(address2?: string) {
        return this.component.locator(this.address2Sel).fill(address2|| "");
    }

    enterZipOrPostcode(zipOrPostcode: string) {
        return this.component.locator(this.zipSel).fill(zipOrPostcode);
    }

    enterPhoneNumber(phoneNumber: string) {
        return this.component.locator(this.phoneSel).fill(phoneNumber);
    }

    enterFaxNumber(faxNumber?: string) {
        return this.component.locator(this.faxSel).fill(faxNumber|| "");
    }

    selectCountry(country: string) {
        return this.component.locator(this.countrySel).selectOption({ label: country });
    }

    selectState(state?: string) {
        return this.component.locator(this.stateSel).selectOption({ label: state||"" });
    }

}