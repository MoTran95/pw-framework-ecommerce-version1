import { Locator } from "@playwright/test";
import { getCartPriceData, getTrimmedTextContext } from "../../utils";
import { CartPriceDataType } from "../../types";

export default class CartTotalComponent {

    static SELECTOR = ".cart-total";
    private cartTotalLeftSel = ".cart-total-left > span.nobr";
    private cartTotalRightSel = ".cart-total-right > span > span";

    constructor(private component: Locator) { }
    async getPrices() {
        const pricesTypes = await this.component.locator(this.cartTotalLeftSel).all();
        const prices = await this.component.locator(this.cartTotalRightSel).all();

        const rawData = {};
        for (let index = 0; index < pricesTypes.length; index++) {
            const priceType = await getTrimmedTextContext(pricesTypes[index]);
            const price = await getTrimmedTextContext(prices[index]);

            rawData[priceType] = Number(price);
        }

        return getCartPriceData(rawData);
    }
} 