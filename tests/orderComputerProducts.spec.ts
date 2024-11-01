import { test } from '@playwright/test';
import OrderAComputerFlow from '../testflows/OrderAComputerFlow';
import { ORDER_COMPUTER_TEST_DATAS } from '../testData/OrderComputerData';

ORDER_COMPUTER_TEST_DATAS.forEach((testData) => {
  const { computerData,billingInfo, shippingData,paymentMethodByCast,billingDetailAddress,shippingDetailAddress,paymentConfirmOrderWith1QtyAndByCash } = testData;
  const { processorType, ram, hdd, os, software } = computerData;
  test(`Test build your computer when ordering 1 type product: CPU ${processorType}, RAM: ${ram}, HDD: ${hdd}, OS: ${os}, Software: ${software}`, async ({ page }) => {
    const orderComputerFlow: OrderAComputerFlow = new OrderAComputerFlow(page);
    await orderComputerFlow.openHomePageAndGoToSpecificProduct(computerData);
    await orderComputerFlow.buildOwnComputerAndAddToCart(computerData);
    await orderComputerFlow.verifyProductAndCheckOutInShopingCart(computerData,1);
    await orderComputerFlow.checkoutAsAGuest();
    await orderComputerFlow.provideInforBillingAddressAndGoToShippingAddressStep(billingInfo);
    await orderComputerFlow.provideInforShippingAddressAndGoToShippingMethod(shippingData);
    await orderComputerFlow.provideInformationShipingMethodAndGoToPaymentMethod();
    await orderComputerFlow.provideInformationPaymentMethodAndGoToPaymentInformation(paymentMethodByCast);
    await orderComputerFlow.providePaymentInformationdAndGoToConfirmOrder();
    await orderComputerFlow.checkoutAndGoToOrderCompletedPage(billingDetailAddress,shippingDetailAddress, computerData, paymentConfirmOrderWith1QtyAndByCash,1);
    await orderComputerFlow.verifyOrderCompletedAndGotoOrderDetail();
    await orderComputerFlow.verifyOrderDetailCompleted(billingDetailAddress,shippingDetailAddress, computerData, paymentConfirmOrderWith1QtyAndByCash, 1);
    
  });
});