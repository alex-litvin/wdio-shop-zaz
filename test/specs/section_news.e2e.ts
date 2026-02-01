import { expect } from '@wdio/globals'
import NewsSection from '../pageobjects/section_news.page'

describe('news section', async() => {
    it('should open the first news item on the fourth page of the news section', async() => {

        await NewsSection.open()
        await browser.maximizeWindow()

        await NewsSection.clickNewsMenu()
        await NewsSection.goToPageFour()
        await NewsSection.goToNewsOnThePage()

        let expectedTitle :string = "Акция. До 1 февраля 2019 года. Отменена минимальная сумма заказа. Плюс доставка курьером."   

        await expect(NewsSection.newsh1Title).toHaveText(expectedTitle)

    });
});