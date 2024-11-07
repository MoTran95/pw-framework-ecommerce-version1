import { expect, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {

    constructor(protected page: Page) {
        super(page);
    }

    public  inputEmailLocator = "//input[@id = 'Email']";
    public  inputPasswordLocator = "//input[@id = 'Password']";
    public loginBtnLocator = "//input[@class = 'button-1 login-button']";
    public checkoutAsGuestBtnLocator = "//input[@class = 'button-1 checkout-as-guest-button']";

    inputEmail(email: string) {
        return this.page.locator(this.inputEmailLocator).fill(email);
    }

    inputPassword(password: string) {
        return this.page.locator(this.inputPasswordLocator).fill(password);
    }

    submitLogin() {
        return this.page.locator(this.loginBtnLocator).click();
    }

    checkoutAsGuest() {
        return this.page.locator(this.checkoutAsGuestBtnLocator).click();
    }
}