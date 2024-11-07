import { OrderComputerFlowDataType } from "../types";

const BASE_DATA: OrderComputerFlowDataType = {
  productName: "Build your own computer",
  processor: "2.2 GHz Intel Pentium Dual-Core E2200",
  ram: "4GB",
  hdd: "400 GB",
  os: "Windows 10",
  software: "Acrobat Reader",
  productPrice: 0,
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  qty: 1,
  total: 0,
  subTotal: 0,
  shipping: 0,
  tax: 0,
  titleBillingAddress: "Billing Address",
  titleShippingMethod: "Shipping Method",
  paymentMethodAdditionalFee: 0,
  shippingMethod: "In-Store Pickup",
  paymentMethod: "Cash On Delivery (COD)",
  paymentInformation: "You will pay by COD",
  country: "United States",
  city: "New York",
  address1: "456 Elm St",
  zipOrPostalCode: "10001",
  cityStateZip: "New York , New York 10001",
  phoneNumber: "1234567890",
}

export const ORDER_COMPUTER_DATAS2: OrderComputerFlowDataType = {
  ...BASE_DATA,
  company: "Acme Corp", // Optional field
  stateProvince: "New York", // Optional field for non-US entries
  address2: "Suite 100", // Optional field
  faxNumber: "0987654321", // Optional field
};

export const ORDER_COMPUTER_DATAS3: OrderComputerFlowDataType = {
  ...BASE_DATA,
  ram: "8 GB",
  company: "Acme Corp", // Optional field
  stateProvince: "New York", // Optional field for non-US entries
  address2: "Suite 100", // Optional field
  faxNumber: "0987654321", // Optional field
};
