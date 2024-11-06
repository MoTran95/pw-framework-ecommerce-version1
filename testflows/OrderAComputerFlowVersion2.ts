import { expect, Page, test } from "@playwright/test";
import BuildOwnComputerPage from "../models/computers/BuildOwnComputerPage";
import { computerType2 } from "../types/ProductType";
import ProductListPage from "../models/global/ProductListPage";
import HomePage from "../models/global/HomePage";
import ShopingCartPage2 from "../models/global/ShopingCartPage2";


export default class OrderAComputerFlowVersion2 {

    constructor(private page: Page, private productItemData: computerType2) {}

    async openHomePageAndGoToSpecificProduct(data: computerType2) {
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

    async buildOwnComputerAndAddToCart(data: computerType2) {
        const buildOwnComputerPage: BuildOwnComputerPage = new BuildOwnComputerPage(this.page);

        await test.step("Select options of computer", async () => {
            this.productItemData.productName = await buildOwnComputerPage.getProductName();
            this.productItemData.processor = await buildOwnComputerPage.selectProcessor(data.processor);
            this.productItemData.ram = await buildOwnComputerPage.selectRAM(data.ram);
            this.productItemData.hdd = await buildOwnComputerPage.selectHDD(data.hdd);
            this.productItemData.os = await buildOwnComputerPage.selectOS(data.os);
            this.productItemData.software = await buildOwnComputerPage.selectSoftware(data.software);
            this.productItemData.qty = await buildOwnComputerPage.getQty();
            this.productItemData.productPrice = await buildOwnComputerPage.getProductPrice();
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
