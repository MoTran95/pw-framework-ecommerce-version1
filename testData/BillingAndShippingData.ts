import { AddressDetailInConfirmOrder, BillingData, PaymentConfirmOrder, ShippingData,PaymentMethodData } from "../types/BillingShipingPaymentType";

export const paymentWith1QtyAndByCash: PaymentConfirmOrder = {
  subTotal: "1440.00",
  paymentMethodAdditional: "7.00",
  total: "1447.00",
  tax: "0.00",
  shipping: "0.00",
}
export const paymentWith1QtyAndByCash2: PaymentConfirmOrder = {
  subTotal: "1445.00",
  paymentMethodAdditional: "7.00",
  total: "1452.00",
  tax: "0.00",
  shipping: "0.00",
}

export const paymentByCast: PaymentMethodData = {
  paymentMethod:  "Cash On Delivery (COD) (7.00)"
}
 
 export const billingInfo: BillingData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    company: "Acme Corp", // Optional field
    country: "United States",
    stateProvince: "New York", // Optional field for non-US entries
    city: "New York",
    address1: "123 Elm St",
    address2: "Suite 100", // Optional field
    zipOrPostalCode: "10001",
    phoneNumber: "1234567890",
    faxNumber: "0987654321" // Optional field
  };
 export const billingInfoforNewAddress: BillingData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    company: "Acme Corp", // Optional field
    country: "United States",
    stateProvince: "New York", // Optional field for non-US entries
    city: "New York",
    address1: "456 Elm St",
    address2: "Suite 100", // Optional field
    zipOrPostalCode: "10001",
    phoneNumber: "1234567890",
    faxNumber: "0987654321" // Optional field
  };
  export const shippingData: ShippingData = {
    checkInStorePickup: false,
    newAdressOption: false,
    billingData: billingInfoforNewAddress
  
  } 

  const baseAddress: AddressDetailInConfirmOrder = {
    title: "Billing Address",
    name: "John Doe",
    email: "Email: johndoe@example.com",
    phone: "Phone: 1234567890",
    fax: "Fax: 0987654321",
    company: "Acme Corp",
    address1: "123 Elm St",
    address2: "Suite 100",
    cityStateZip: "New York , New York 10001",
    country: "United States",
  };

  export const billingDetailAddress = {
    ...baseAddress,
    title: "Billing Address",
    paymentMethod: "Cash On Delivery (COD)", 
  }
  
  export const shippingDetailAddress = {
    ...baseAddress,
    title: "Shipping Address",
    shippingMethod: "Ground",
  };
export { AddressDetailInConfirmOrder, PaymentConfirmOrder, PaymentMethodData };

