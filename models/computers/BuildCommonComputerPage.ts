import { Page } from "@playwright/test";
import ProductDetailOnItemPage from "../global/ProductDetailOnItemPage";
import { getTrimmedTextContext } from "../../utils";

export default abstract class BuildCommonComputerPage extends ProductDetailOnItemPage {

    constructor(protected page: Page){
        super(page);
    }

    protected getOptionInOptionListLocator (option: string) {
        return `//ul[@class='option-list']//label[contains(text(), '${option}')]`
    }

    private getCheckBoxOrRadionOptionLocator (option: string) {
        return `//ul[@class='option-list']//label[contains(text(), '${option}')]/preceding-sibling::input`
    }
    
    private allOptionLocator = "//ul[@class='option-list']/li/label";
    private productNameLocator = "//div[@class='product-name']";
    private productPriceLocator = "//div[@class='product-price']";
    private qtyLocator = "//input[@class='qty-input']";

    // abstract selectRAM(option: string);
    abstract selectProcessor(option: string);

    async selectHDD(option: string ) {
       await this.page.locator(this.getOptionInOptionListLocator(option)).check();
       return getTrimmedTextContext(this.page.locator(this.getOptionInOptionListLocator(option)));
    }

    async selectSoftware(option: string) {
      await this.page.locator(this.getOptionInOptionListLocator(option)).check();
      return getTrimmedTextContext(this.page.locator(this.getOptionInOptionListLocator(option)));
    }

    async unSelectSoftware(option: string) {
        await this.page.locator(this.getCheckBoxOrRadionOptionLocator(option)).uncheck();
    }

    getProductName() {
       return getTrimmedTextContext(this.page.locator(this.productNameLocator));
    }

    async getQty() {
        return Number(await this.page.locator(this.qtyLocator).inputValue());
    }

    async getProductPrice() {
        return Number(await getTrimmedTextContext(this.page.locator(this.productPriceLocator))) + await this.getAdditionalPrice();
    }

    async getAdditionalPrice() {
        const sum1 = await this.getPriceFromSelections("option:checked");
        const sum2 = await this.getPriceFromOptions(this.allOptionLocator) ;
        return (sum1 + sum2 );
    }

    async getTotalPrice() {
        return await this.getQty() * await this.getProductPrice();
    }
}