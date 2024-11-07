import { expect, Page, test } from "@playwright/test";
import BuildOwnComputerPage from "../models/computers/BuildOwnComputerPage";
import ProductListPage from "../models/global/ProductListPage";
import BasePage from "../models/global/BasePage";
import ShopingCartPage from "../models/global/ShopingCartPage";
import { OrderComputerFlowDataType } from "../types";
import LoginPage from "../models/global/LoginPage";
import CheckOutPage from "../models/global/CheckOutPage";
import OrderCompletePage from "../models/global/OrderCompletePage";
import OrderDetailPage from "../models/global/OrderDetailPage";


export default class OrderAComputerFlowVersion {
    billingInfo: string[];
    shippingInfo: string [];
    constructor(private page: Page, private productItemData: OrderComputerFlowDataType) {
        this.billingInfo = [productItemData.titleBillingAddress, `${productItemData.firstName} ${productItemData.lastName}`,
        productItemData.email, productItemData.phoneNumber, productItemData.faxNumber || "", productItemData.company || "",
        productItemData.address1, productItemData.address2 || "", productItemData.cityStateZip, productItemData.country, "Payment Method",
        productItemData.paymentMethod];
        this.shippingInfo = [productItemData.titleShippingMethod, productItemData.shippingMethod];
    }
    async openHomePageAndGoToSpecificProduct(productName: string) {
        const homePage: BasePage = new BasePage(this.page);
        const productListPage: ProductListPage = new ProductListPage(this.page);
        await test.step("Navigate to Desktop page", async () => {
            await this.page.goto(" ");
            await homePage.goToAPageFromCagegoriesBar("Computers");
            await productListPage.goToAPageFromCagegoriesBar("Desktops");
        })
        await test.step("Navigate to Build Your Own Computer page", async () => {
            await productListPage.goToASpecificProductPage(productName);
        })
    }

    async buildOwnComputerAndAddToCart() {
        const buildOwnComputerPage: BuildOwnComputerPage = new BuildOwnComputerPage(this.page);
        // const productItemData = this.productItemData;
        const { productItemData } = this;

        await test.step("Select options of computer", async () => {
            productItemData.productName = await buildOwnComputerPage.getProductName();
            productItemData.processor = await buildOwnComputerPage.selectProcessor(productItemData.processor);
            productItemData.ram = await buildOwnComputerPage.selectRAM(productItemData.ram);
            productItemData.hdd = await buildOwnComputerPage.selectHDD(productItemData.hdd);
            productItemData.os = await buildOwnComputerPage.selectOS(productItemData.os);
            productItemData.software = await buildOwnComputerPage.selectSoftware(productItemData.software);
            productItemData.productPrice = await buildOwnComputerPage.getProductPrice();

            productItemData.qty = await buildOwnComputerPage.getQty();
            productItemData.subTotal = await buildOwnComputerPage.getTotalPrice();
            productItemData.total = await buildOwnComputerPage.getTotalPrice();
        })
        await test.step("Go to shopping cart page", async () => {
            await buildOwnComputerPage.addtoCart();
            await buildOwnComputerPage.gotoShopCart();
        })
    }
    async verifyShoppingCart() {
        const shopingCartPage = new ShopingCartPage(this.page);

        await test.step("Verify product information", async () => {
            const itemDatas = await shopingCartPage.getAllProductCartData();
            expect(this.productItemData).toMatchObject(itemDatas[0]);

            const priceDatas = await shopingCartPage.getPrices();
            expect(this.productItemData.subTotal).toEqual(priceDatas.subTotal);
            expect(priceDatas.total).toEqual(priceDatas.subTotal + priceDatas.shipping + priceDatas.tax);
        });

       
    }

    async agreeConditionAndGotoCheckout() {
        const shopingCartPage = new ShopingCartPage(this.page);
        await test.step("Go to checkout page", async () => {
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

    async inputBillingAddress () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("Input billing address", async () => {
            const billingAddressComponent = checkoutPage.getBillingAddressComponent();
            await billingAddressComponent.enterFirstName(this.productItemData.firstName);
            await billingAddressComponent.enterLastName(this.productItemData.lastName);
            await billingAddressComponent.enterAddress1(this.productItemData.address1);
            await billingAddressComponent.enterAddress2(this.productItemData.address2);
            await billingAddressComponent.enterCity(this.productItemData.city);
            await billingAddressComponent.enterCompany(this.productItemData.company);
            await billingAddressComponent.enterEmail(this.productItemData.email);
            await billingAddressComponent.enterFaxNumber(this.productItemData.faxNumber);
            await billingAddressComponent.enterPhoneNumber(this.productItemData.phoneNumber);
            await billingAddressComponent.enterZipOrPostcode(this.productItemData.zipOrPostalCode);
            await billingAddressComponent.selectCountry(this.productItemData.country);
            await billingAddressComponent.selectState(this.productItemData.stateProvince);
            await billingAddressComponent.continue();
        });
    }

    async inputShippingAddress () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("Input billing address", async () => {
            await test.step("Input shipping address", async () => {
                const shippingAddressComponent = checkoutPage.getShippingAddressComponent();
                await shippingAddressComponent.checkInStorePickup();
                expect(shippingAddressComponent.isSelectAddressDropdown()).toBeTruthy();
                await shippingAddressComponent.continue();
            });
    
        });
    }

    async selectPaymentMethod () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("select payment method", async () => {
            const paymentMethodComponent = checkoutPage.getPaymentMethodComponent();
            await paymentMethodComponent.selectPaymentMethod(this.productItemData.paymentMethod);
            await paymentMethodComponent.continue();
        });
    }

    async selectPaymentInfo () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("Verify payment info", async () => {
            const paymentInfoComponent = checkoutPage.getPaymentInfoComponent();
            expect(await paymentInfoComponent.getTextPaymentInfoByCOD()).toEqual(this.productItemData.paymentInformation);
            await paymentInfoComponent.continue();
        });
    }

    async verifyBillingInfo () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("Verify billing info", async () => {
            const confirmOrderComponent = checkoutPage.getConfirmOrderComponent();
            const text = await confirmOrderComponent.getBillingInfoData();
            expect(this.billingInfo).toEqual(text);
        });
    }

    async verifyShippingInfo () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("Verify shipping info", async () => {
            const confirmOrderComponent = checkoutPage.getConfirmOrderComponent();
            const text = await confirmOrderComponent.getShippingInfoData();
            expect(this.shippingInfo).toEqual(text);
        });
    }

    async verifyProductInfoAndConfirmOrder () {
        const checkoutPage = new CheckOutPage(this.page);
        await test.step("Verify product info and go to order complete page", async () => {
            const confirmOrderComponent = checkoutPage.getConfirmOrderComponent();
            const item = await confirmOrderComponent.getAllProductCartData();
            expect(this.productItemData).toMatchObject(item[0]);

            const priceDatas = await confirmOrderComponent.getCartTotalData();
            expect(this.productItemData.subTotal).toEqual(priceDatas.subTotal);
            expect(priceDatas.total).toEqual(priceDatas.subTotal + priceDatas.shipping + priceDatas.tax + (priceDatas.paymentMethodAdditionalFee || 0));
            await confirmOrderComponent.continue();
        });
    }

    async verifyOrderCompletedAndGotoOrderDetail() {
        const orderCompletedPage: OrderCompletePage = new OrderCompletePage(this.page); 
        await test.step("Checkout order, Verify information billing detail, shipping address, product and confirm order ", async() => {
            await orderCompletedPage.verifyTextsInPageTitle("Thank you");
            await orderCompletedPage.verifyTextsInOrderTitle("Your order has been successfully processed!");
            await orderCompletedPage.goToOrderDetailPage();
        })

    }

    async verifyOrderDetailPage() {
        const orderDetailPage = new OrderDetailPage(this.page); 
        await test.step("Verify billing info", async () => {
            const text = await orderDetailPage.getBillingInfoData();
            expect(this.billingInfo).toEqual(text);
        });

        await test.step("Verify shipping info", async () => {
            const text = await orderDetailPage.getShippingInfoData();
            expect(this.shippingInfo).toEqual(text);
        });

    }

}
