import { Page, test } from "@playwright/test";
import BuildOwnComputerPage from "../models/computers/BuildOwnComputerPage";
import ShopingCartPage from "../models/global/ShopingCartPage";
import HomePage from "../models/global/HomePage";
import ProductListPage from "../models/global/ProductListPage";
import LoginPage from "../models/global/LoginPage";
import CheckOutPage from "../models/global/CheckOutPage";
import { AddressDetailInConfirmOrder, PaymentConfirmOrder, PaymentMethodData, ShippingData, billingAddress } from "../types/BillingShipingPaymentType";
import { computerType } from "../types/ProductType";
import OrderDetailPage from "../models/global/OrderDetailPage";
import OrderCompletePage from "../models/global/OrderCompletePage";

export default class OrderAComputerFlow {

    constructor(private page: Page) {
        this.page = page;
    }

    async openHomePageAndGoToSpecificProduct(data: computerType) {
        const homePage: HomePage = new HomePage(this.page);
        const productListPage: ProductListPage = new ProductListPage(this.page);
        await test.step("Navigate to Desktop page", async () => {
            await this.page.goto(" ");
            await homePage.goToAPageFromCagegoriesBar("Computers");
            await productListPage.goToAPageFromCagegoriesBar("Desktops");
        })
        await test.step("Navigate to Build Your Own Computer page", async () => {
            await productListPage.goToASpecificProductPage(data.productName);
        })
    }

    async buildOwnComputerAndAddToCart(data: computerType) {
        const buildOwnComputerPage: BuildOwnComputerPage = new BuildOwnComputerPage(this.page);

        await test.step("Select options of computer", async () => {
            await buildOwnComputerPage.selectProcessor(data.processorType);
            await buildOwnComputerPage.selectRAM(data.ram);
            await buildOwnComputerPage.selectHDD(data.hdd);
            await buildOwnComputerPage.selectOS(data.os);
            await buildOwnComputerPage.selectSoftware(data.software);
        })

        await test.step("Go to shopping cart page", async () => {
            await buildOwnComputerPage.addtoCart();
            await buildOwnComputerPage.gotoShopCart();
        })
    }

    async verifyOptionProductInShoppingCartAndCheckOutPage(data: computerType, rowIndex: number) {
        const shopingCartPage: ShopingCartPage = new ShopingCartPage(this.page);

        await test.step("Verify option of product", async () => {
            let optionList = [data.displayProcessorType, data.displayRam, data.displayHDD, data.displaySoftware];
            for (let i = 0; i <= rowIndex; i++ ) {
                await shopingCartPage.verifyProductName(data.productName, rowIndex);
                await shopingCartPage.verifyShowPriceAProduct(data.productName, rowIndex, data.priceAfterAddToCart);
                await shopingCartPage.verifyShowTotalAProduct(data.productName, rowIndex, data.totalAComputer);
                for (const option of optionList) {
                    await shopingCartPage.verifyOptionsInProduct(data.productName, rowIndex, option);
                }

                if(data.displayOS){
                    await shopingCartPage.verifyOptionsInProduct(data.productName, rowIndex, data.displayOS);
            }
        }
        });
    }
    async verifyOptionProductInOrderDetailCompletePage(data: computerType, rowIndex: number) {
        const orderDetail: OrderDetailPage = new OrderDetailPage(this.page);

        await test.step("Verify option of product", async () => {
            let optionList = [data.displayProcessorType, data.displayRam, data.displayHDD, data.displaySoftware];
            for (let i = 0; i <= rowIndex; i++ ) {
                await orderDetail.verifyProductName(data.productName, rowIndex);
                await orderDetail.verifyShowPriceACart( rowIndex, data.priceAfterAddToCart);
                await orderDetail.verifyShowTotalACart( rowIndex, data.totalAComputer);
                for (const option of optionList) {
                    await orderDetail.verifyOptionsInProduct(data.productName, rowIndex, option);
                }
    
                if(data.displayOS){
                    await orderDetail.verifyOptionsInProduct(data.productName, rowIndex, data.displayOS);
                }
            }
           
        });
    }
    async verifyProductAndCheckOutInShopingCart(data: computerType, rowIndex: number) {
        const shopingCartPage: ShopingCartPage = new ShopingCartPage(this.page);

        await test.step("Verify information of product", async () => {
            await shopingCartPage.verifyShownShopingCartTitle();
            await shopingCartPage.verifyShowSubTotalAllProduct(data.subTotal);
            await shopingCartPage.verifyShowTotalAllProduct(data.totalAllProduct);
            for (let i = 1; i <= rowIndex; i ++) {
                await this.verifyOptionProductInShoppingCartAndCheckOutPage(data, rowIndex);
            }
            
        });

        await test.step("Argree terms and check out", async () => {
            await shopingCartPage.checkConditionCheckbox();
            await shopingCartPage.checkOut();
        });
    }

    async checkoutAsAGuest() {
        const loginPage: LoginPage = new LoginPage(this.page);
        await test.step("Checkout as a guest", async () => {
            await loginPage.checkoutAsGuest();
        });
    }

    async provideInforBillingAddress(data: billingAddress) {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Provide information for Billing addresss", async() => {
            await checkoutPage.enterFirstName(data.firstName);
            await checkoutPage.enterLastName(data.lastName);
            await checkoutPage.enterEmail(data.email);
            await checkoutPage.enterCity(data.city);
            await checkoutPage.enterAddress1(data.address1);
            await checkoutPage.enterZipOrPostcode(data.zipOrPostalCode);
            await checkoutPage.enterPhoneNumber(data.phoneNumber);
            await checkoutPage.selectCountry(data.country);

            if(data.stateProvince) {
                await checkoutPage.selectState(data.stateProvince);
            }
            if(data.address2) {
                await checkoutPage.enterAddress2(data.address2);
            } 
            if(data.company) {
                await checkoutPage.enterCompany(data.company);
            }          
            if(data.faxNumber) {
                await checkoutPage.enterFaxNumber(data.faxNumber);
            }          
        })
    } 
    async provideInforBillingAddressAndGoToShippingAddressStep(data: billingAddress) {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Provide information for Billing addresss and go to shipping address step ", async() => {
            await this.provideInforBillingAddress(data);
            await checkoutPage.clickContinueBillingAddress();
        })
    } 

    async provideInforShippingAddressAndGoToShippingMethod(data: ShippingData) {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Provide information for shipping address and go to shiping method step", async() => {
           if(data.checkInStorePickup) {
             await checkoutPage.checkInStorePickup();
           }
           if(data.newAdressOption) {
             await checkoutPage.selectAddress("New Address");
             await this.provideInforBillingAddress(data.billingData);   
           }
          await checkoutPage.clickContinueShippingAddress();
        })
    }
    async provideInformationShipingMethodAndGoToPaymentMethod () {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Provide information for shipping method and go to payment method step", async() => {
              // Handle provide information for payment infor
            await  checkoutPage.clickContinueShippingMethod();
         })
    }
    async provideInformationPaymentMethodAndGoToPaymentInformation (data: PaymentMethodData) {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Provide information for payment method and go to payment information step", async() => {
             await  checkoutPage.selectPaymentMethod(data.paymentMethod);
             await checkoutPage.clickContinuePaymentMethod();
         })
    }

    async providePaymentInformationdAndGoToConfirmOrder () {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Provide information for payment method and go to confirm order ", async() => {
              // Handle provide information for payment infor
             await checkoutPage.clickContinuePaymentInfo();
         })
    }
    async checkoutAndGoToOrderCompletedPage (billingData: AddressDetailInConfirmOrder,shipinggData: AddressDetailInConfirmOrder, computer: computerType, payment:PaymentConfirmOrder, rowIndex: number) {
        const checkoutPage: CheckOutPage = new CheckOutPage(this.page); 
        await test.step("Checkout order, Verify information billing detail, shipping address, product and confirm order ", async() => {
            await checkoutPage.verifyBillingAddressInformation(billingData);
            await checkoutPage.verifyShippingAddressInformation(shipinggData);
            await this.verifyOptionProductInShoppingCartAndCheckOutPage(computer,rowIndex);
            await checkoutPage.verifyShowSubTotalAllProduct(payment.subTotal);
            await checkoutPage.verifyShowTotalAllProduct(payment.total);
            await checkoutPage.verifyPaymentAdditionalFee(payment.paymentMethodAdditional);
            await checkoutPage.verifyTax(payment.tax);
            await checkoutPage.verifyShipping(payment.shipping);
            await checkoutPage.verifyPaymentAdditionalFee(payment.paymentMethodAdditional);
            await checkoutPage.confirm();
         })
    }

    async verifyOrderCompletedAndGotoOrderDetail() {
        const orderCompletedPage: OrderCompletePage = new OrderCompletePage(this.page); 
        await test.step("Checkout order, Verify information billing detail, shipping address, product and confirm order ", async() => {
            await orderCompletedPage.verifyTextsInPageTitle("Thank you");
            await orderCompletedPage.verifyTextsInOrderTitle("Your order has been successfully processed!");
            await orderCompletedPage.goToOrderDetailPage();
        })

    }

    async verifyOrderDetailCompleted(billingData: AddressDetailInConfirmOrder,shipinggData: AddressDetailInConfirmOrder, computer: computerType, payment:PaymentConfirmOrder, rowIndex: number) {
        const orderDetailPage: OrderDetailPage = new OrderDetailPage(this.page); 
        await test.step("Verify order detail information products after completing an order ", async() => {
            await orderDetailPage.verifyBillingAddressInformation(billingData);
            await orderDetailPage.verifyShippingAddressInformation(shipinggData);
            await this.verifyOptionProductInOrderDetailCompletePage(computer, rowIndex);
            await orderDetailPage.verifyShowSubTotalAllProduct(payment.subTotal);
            await orderDetailPage.verifyShowToOrderTotalAllProductInTotal(payment.total);
            await orderDetailPage.verifyShowToOrderTotalInOrderView(payment.total);
            await orderDetailPage.verifyPaymentAdditionalFee(payment.paymentMethodAdditional);
            await orderDetailPage.verifyTax(payment.tax);
            await orderDetailPage.verifyShipping(payment.shipping);
            await orderDetailPage.verifyPaymentAdditionalFee(payment.paymentMethodAdditional);
         })
    }

}
