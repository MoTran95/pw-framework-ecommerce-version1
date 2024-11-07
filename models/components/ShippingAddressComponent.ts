import { Locator } from "@playwright/test";
import CheckoutPageComponent from "./CheckoutPageComponent";

export default class ShippingAddressComponent extends CheckoutPageComponent {
    static SELECTOR = "#checkout-step-shipping";
    private shippingaddressDropdownSel = "shipping-address-select";
    private inStorePickupSel = "#PickUpInStore";
    private firstNameSel = "#ShippingNewAddress_FirstName";
    private lastNameSel = "#ShippingNewAddress_LastName";
    private emailSel = "#ShippingNewAddress_Email";
    private companySel = "#ShippingNewAddress_Company";
    private countrySel = "#ShippingNewAddress_CountryId";
    private stateSel = "#ShippingNewAddress_StateProvinceId";
    private citySel = "#ShippingNewAddress_City";
    private address1Sel = "#ShippingNewAddress_Address1";
    private address2Sel = "#ShippingNewAddress_Address2";
    private zipSel = "#ShippingNewAddress_ZipPostalCode";
    private phoneSel = "#ShippingNewAddress_PhoneNumber";;
    private faxSel = "#ShippingNewAddress_FaxNumber";

    async checkInStorePickup() {
        await this.component.locator(this.inStorePickupSel).waitFor({state: "visible"});
        return this.component.locator(this.inStorePickupSel).check();
    }

    selectNewAddress() {
        return this.component.locator(this.shippingaddressDropdownSel).selectOption("New Address");
    }

    isSelectAddressDropdown() {
        return this.component.locator(this.shippingaddressDropdownSel).isVisible();
    }

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