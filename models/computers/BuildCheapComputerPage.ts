import { Page } from "@playwright/test";
import BuildCommonComputerPage from "./BuildCommonComputerPage"

export default class BuildCheapComputerPage extends BuildCommonComputerPage {

    constructor(protected page: Page){
        super(page);
    }

   async selectRAM(option: string) {
        await this.page.locator(this.getOptionInOptionListLocator(option)).click();
    }

   async selectProcessor(option: string) {
        await this.page.locator(this.getOptionInOptionListLocator(option)).click();
    }

}