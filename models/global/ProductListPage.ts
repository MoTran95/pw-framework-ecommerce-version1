import BasePage from "./BasePage";

export default class ProductListPage extends BasePage {
    private pageTiteProductLocator = "//div[@class= 'page-title']";
    protected getAProductLinkFromProductListLocator( productName: string) {
        return `//div[@class='product-item']//a[contains(text(),'${productName}')]`
    }

     goToASpecificProductPage(productName: string) {
        return this.page. locator(this.getAProductLinkFromProductListLocator(productName)).click(); 
    }
}