import { Page } from "@playwright/test";
import { CREDENTIALS_USER } from '../testData/Credential';
import LoginPage from "../models/global/LoginPage";

export default class AuthFlow {

    constructor(private page: Page) {
        this.page = page;
    }

    async login() {
        const loginPage = new LoginPage(this.page);
        await this.page.goto("/login");
        await loginPage.inputEmail(CREDENTIALS_USER.email);
        await loginPage.inputPassword(CREDENTIALS_USER.password);
        await loginPage.submitLogin();
        await loginPage.verifyShownLogoutLink();
    }
}