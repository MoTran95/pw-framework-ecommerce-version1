export type BillingData = {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    country: string;
    stateProvince?: string;
    city: string;
    address1: string;
    address2?: string;
    zipOrPostalCode: string;
    phoneNumber: string;
    faxNumber?: string;
  }

export type ShippingData = {
    checkInStorePickup?: boolean;
    newAdressOption?: boolean;
    billingData: BillingData;

}

export type PaymentMethodData = {
   paymentMethod: string;
}

export type PaymentConfirmOrder = {
   subTotal: string;
   shipping: string;
   paymentMethodAdditional: string;
   tax: string;
   total: string;
}
export type AddressDetailInConfirmOrder = {
    title: string;
    name: string;
    email: string;
    phone: string;
    fax?: string;
    company?: string;
    address1: string;
    address2?: string;
    cityStateZip: string;
    country: string;
    paymentMethod?: string;
    shippingMethod?: string;
}
export type billingAddress = {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    country: string;
    stateProvince?: string;
    city: string;
    address1: string;
    address2?: string;
    zipOrPostalCode: string;
    phoneNumber: string;
    faxNumber?: string;
}