import { expect } from "@wdio/globals"
import Product from "../pageobjects/product.page"

describe('Product page', () => {

    it.only('should successfully place an order for multiple products', async () => {
        await Product.openProduct1()
        await browser.maximizeWindow()

        await Product.addToCart()
        await Product.clickContinueShopping()

        await Product.openProduct2()
        await Product.addToCart()       
        await Product.clickPlaceAnOrder()

        await Product.fillingOutPesonalInfo('Johnson', 'John', '+380501000022') //Before each new launch you need to change your phone number

        await Product.carrierSelection()
        await Product.citySelect()
        await Product.postOfficeSelect()
        await Product.selectCashOnDelivery()

        await Product.addComment('Вибачте! Автоматизоване тестування. Заявка невірна, будь ласка, не обробляйте її.')
        await Product.clickCheckoutBtn()
        expect(await Product.getSuccessMessage()).toContain('успешно оформлен');

    });

    it('should change quantity by clicking plus button', async () => {
        await Product.openProduct1()
        await browser.maximizeWindow()
        const startQuantity = await Product.getCurrentQuantity()
        await Product.changeQuantityPlus(2)
        const newQuantity = await Product.getCurrentQuantity()
        expect (newQuantity).toBe(startQuantity + 2)    
    });

    it('should decrease quantity by clicking minus button', async () => {
        await Product.openProduct1()
        await browser.maximizeWindow()
        await Product.changeQuantityPlus(3)
        const startQuantityBeforeMinus = await Product.getCurrentQuantity()
        await Product.changeQuantityMinus(2)
        const newQuantityAfterMinus = await Product.getCurrentQuantity()
        expect (newQuantityAfterMinus).toBe(startQuantityBeforeMinus - 2)        
    });

});