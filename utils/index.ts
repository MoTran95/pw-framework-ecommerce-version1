import { Locator } from "@playwright/test";
import { CartPriceDataType } from "../types";

export function getPriceFromText(labelText: string | null) {
  if (labelText) {
    const match = labelText.match(/\[\+(\d+(\.\d{2})?)\]/);
    if (match) {
      return parseFloat(match[1]);
    }
  }
  return 0;
}

export function getObjectKeyFromClassName(className: string) {
  let objectKey = className;
  objectKey = objectKey
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  objectKey = objectKey.charAt(0).toLowerCase() + objectKey.slice(1);
  return objectKey;
}

export function getCorrectedStateZipCode(stateZipCode: string) {
  return stateZipCode.split(' ').filter(word => word && word).join(" ").replace(',\n', ',');
}

export async function getTrimmedTextContext(locator: Locator) {
  const text = await locator.textContent() || '';
  return text.trim().replace(/\s\s+/g, ' ');
}

export function getCartPriceData(rawData) {
  const data: CartPriceDataType = {
    total: 0,
    subTotal: 0,
    shipping: 0,
    tax: 0
  }

  data.subTotal = rawData['Sub-Total:'] || 0;
  data.shipping = rawData['Shipping:'] || rawData['Shipping: (In-Store Pickup)'] || 0;
  data.tax = rawData['Tax:'] || 0;
  data.total = rawData['Total:']  || 0;
  data.paymentMethodAdditionalFee = rawData['Payment method additional fee:']  || 0;

  return data;
}
