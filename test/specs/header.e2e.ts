import { expect } from '@wdio/globals'
import ChangeLangZaz from '../pageobjects/header.page'

describe('Change language', () => {
    
    it('should change default lang to UA', async () => {
        await ChangeLangZaz.open()

        expect(await ChangeLangZaz.getCurrentLang()).toContain('lang_ru')
        await ChangeLangZaz.switchToUaLang()

        await expect (ChangeLangZaz.selectedUa).toBeDisplayed({ message: 'The language did not switch'})

    });

    it.only('should switch to RU language', async () => {
        await ChangeLangZaz.openUa()

        expect(await ChangeLangZaz.getCurrentLang()).toContain('lang_uk')
        await ChangeLangZaz.switchToRuLang()

        await expect (ChangeLangZaz.selectedRu).toBeDisplayed({ message: 'The language did not switch'})                     

    });   
})


