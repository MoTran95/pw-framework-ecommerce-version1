import { expect, Page, test } from "@playwright/test";
import BuildOwnComputerPage from "../models/computers/BuildOwnComputerPage";
import ProductListPage from "../models/global/ProductListPage";
import HomePage from "../models/global/HomePage";
import ShopingCartPage2 from "../models/global/ShopingCartPage2";
import { OrderComputerFlowDataType } from "../types";


export default class OrderAComputerFlowVersion2 {

    constructor(private page: Page, private productItemData: OrderComputerFlowDataType) {}

    async openHomePageAndGoToSpecificProduct(productName: string) {
        const homePage: HomePage = new HomePage(this.page);
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
        const { productItemData } = this;

        await test.step("Select options of computer", async () => {
            productItemData.productName = await buildOwnComputerPage.getProductName();
            productItemData.processor = await buildOwnComputerPage.selectProcessor(productItemData.processor);
            productItemData.ram = await buildOwnComputerPage.selectRAM(productItemData.ram);
            productItemData.hdd = await buildOwnComputerPage.selectHDD(productItemData.hdd);
            productItemData.os = await buildOwnComputerPage.selectOS(productItemData.os);
            productItemData.software = await buildOwnComputerPage.selectSoftware(productItemData.software);
            productItemData.productPrice = await buildOwnComputerPage.getProductPrice();
            
            this.productItemData.qty = await buildOwnComputerPage.getQty();
            this.productItemData.subTotal = await buildOwnComputerPage.getTotalPrice();
            this.productItemData.total = await buildOwnComputerPage.getTotalPrice();
        })
        await test.step("Go to shopping cart page", async () => {
            await buildOwnComputerPage.addtoCart();
            await buildOwnComputerPage.gotoShopCart();
        })
    }
    async verifyShoppingCart() {
        const shopingCartPage = new ShopingCartPage2(this.page);

        await test.step("Select options of computer", async () => {
            const itemDatas = await shopingCartPage.getAllProductCartData();
            expect(this.productItemData).toMatchObject(itemDatas[0]);
        });
    }
}
