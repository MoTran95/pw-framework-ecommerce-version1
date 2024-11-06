import { Page } from "@playwright/test";
import BuildCommonComputerPage from "./BuildCommonComputerPage"
import { getTrimmedTextContext } from "../../utils";

export default class BuildOwnComputerPage extends BuildCommonComputerPage {

    constructor(protected page: Page) {
        super(page);
    }

    protected getOptionInDropdownLocator(option: string) {
        return `//select//option[contains(text(),'${option}')]`
    }

    async selectRAM(option: string) {
        const optionLocator = this.page.locator(this.getOptionInDropdownLocator(option));
        const selectLocator = optionLocator.locator('..');
        let fullOptionText = await optionLocator.elementHandle();
        await selectLocator.selectOption(fullOptionText);
        return getTrimmedTextContext(optionLocator);
    }

    async selectProcessor(option: string) {
        const optionLocator = this.page.locator(this.getOptionInDropdownLocator(option));
        const selectLocator = optionLocator.locator('..');
        let fullOptionText = await optionLocator.elementHandle();
        await selectLocator.selectOption(fullOptionText);
        return getTrimmedTextContext(optionLocator);
    }

    async selectOS(option: string) {
        await this.page.locator(this.getOptionInOptionListLocator(option)).check();
        return getTrimmedTextContext(this.page.locator(this.getOptionInOptionListLocator(option)));
    }
}