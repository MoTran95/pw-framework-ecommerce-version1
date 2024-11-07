import { expect, Page } from "@playwright/test";

export default class HomePage {

    constructor(protected page: Page) {
        this.page = page;
    }
    protected pageTiteLocator = "//div[@class= 'page-title']";
    protected loginLocator = "//a[@class='ico-login']"; 
    protected logoutLocator = "//a[@class='ico-logout']"; 
    protected registerLocator = "//a[@class='ico-register']";
    protected getAlinkInCategoriesBarLocator(linkName: string) {
        return `//div[@class='block block-category-navigation']//a[contains(text(),'${linkName}')]`
    }
    
    verifyTextsInPageTitle(texts: string) {
        return expect(this.page.locator(this.pageTiteLocator)).toHaveText(texts);
    } 

    goToLoginPage(){
       return this.page.locator(this.loginLocator).click();
    }

    goToRegisterPage(){
       return this.page.locator(this.registerLocator).click();
    }

    logout() {
        return this.page.locator(this.logoutLocator).click();
    }

    verifyShownLogoutLink() {
      return  expect(this.page.locator(this.logoutLocator)).toHaveText("Log out")
    }

    goToAPageFromCagegoriesBar(linkName: string) {
        return this.page.locator(this.getAlinkInCategoriesBarLocator(linkName)).click();
    } 
} 