import { test } from '@playwright/test';
import OrderAComputerFlowVersion2 from '../testflows/OrderAComputerFlowVersion2.ts';
import { ORDER_COMPUTER_DATAS2 } from '../testData/OrderComputerData2.ts';

const testData = { ...ORDER_COMPUTER_DATAS2 };
const { processor, ram, hdd, os, software, productName } = testData;
test(`Test build your computer when ordering 1 type product: CPU ${processor}, RAM: ${ram}, HDD: ${hdd}, OS: ${os}, Software: ${software}`, async ({ page }) => {
  const orderComputerFlow = new OrderAComputerFlowVersion2(page, testData);
  await orderComputerFlow.openHomePageAndGoToSpecificProduct(productName);
  await orderComputerFlow.buildOwnComputerAndAddToCart();
  await orderComputerFlow.verifyShoppingCart();
});

