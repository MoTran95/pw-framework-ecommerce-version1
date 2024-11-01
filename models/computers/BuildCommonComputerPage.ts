import { Page } from "@playwright/test";
import ProductDetailOnItemPage from "../global/ProductDetailOnItemPage";

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
    
    protected allOptionLocator = "//ul[@class='option-list']/li/label";

    // abstract selectRAM(option: string);
    abstract selectProcessor(option: string);

    async selectHDD(option: string ) {
       await this.page.locator(this.getOptionInOptionListLocator(option)).check();
    }

    async selectSoftware(option: string) {
      await this.page.locator(this.getOptionInOptionListLocator(option)).check();
    }

    async unSelectSoftware(option: string) {
        await this.page.locator(this.getCheckBoxOrRadionOptionLocator(option)).uncheck();
    }

    async getAddictionalPrice() {
        const sum1 = await this.getPriceFromSelections("option:checked");
        const sum2 = await this.getPriceFromOptions(this.allOptionLocator) ;
        return sum1 + sum2;
    }
}