import { billingDetailAddress, billingInfo, paymentByCast, paymentWith1QtyAndByCash, paymentWith1QtyAndByCash2, shippingData, shippingDetailAddress } from "./BillingAndShippingData";
import { yourOwnComputer, yourOwnComputer2 } from "./ComputerData";

export const ORDER_COMPUTER_TEST_DATAS = [
    {
        computerData: yourOwnComputer,
        billingInfo: billingInfo,
        shippingData: shippingData,
        paymentMethodByCast: paymentByCast,
        billingDetailAddress: billingDetailAddress,
        shippingDetailAddress: shippingDetailAddress,
        paymentConfirmOrderWith1QtyAndByCash: paymentWith1QtyAndByCash,
    },
    {
        computerData: yourOwnComputer2,
        billingInfo: billingInfo,
        shippingData: shippingData,
        paymentMethodByCast: paymentByCast,
        billingDetailAddress: billingDetailAddress,
        shippingDetailAddress: shippingDetailAddress,
        paymentConfirmOrderWith1QtyAndByCash: paymentWith1QtyAndByCash2,
    }

]