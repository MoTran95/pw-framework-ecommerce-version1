import HomePage from "./HomePage";

export default class ProductListPage extends HomePage {
    private pageTiteProductLocator = "//div[@class= 'page-title']";
    protected getAProductLinkFromProductListLocator( productName: string) {
        return `//div[@class='product-item']//a[contains(text(),'${productName}')]`
    }

    public goToASpecificProductPage(productName: string) {
        return this.page. locator(this.getAProductLinkFromProductListLocator(productName)).click(); 
    }
}