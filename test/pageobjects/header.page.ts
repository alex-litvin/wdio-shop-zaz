import { $ } from '@wdio/globals'
import Page from './page';

class ChangLangZaz extends Page{

    private get getBody(){ return $('body')}
    private get languageBtnUa() {return $('a[href*="/uk/"]') }
    private get languageBtnRu() {return $('a=RU')}
    public get selectedUa() {return $('li=UA')}   
    public get selectedRu() { return $('li=RU')}

    public async getCurrentLang(){
        const currentLang = await this.getBody.getAttribute('class')
        return currentLang
    }

    public async switchToUaLang(){
        await this.languageBtnUa.waitForClickable({ timeout: 5000, timeoutMsg: 'The button to switch to the Ukrainian language did not appear on the page for 5 seconds' })

        await this.languageBtnUa.click()
    }

    public async switchToRuLang(){
        await this.languageBtnRu.waitForClickable({ timeout: 5000, timeoutMsg: 'The button to switch to the Ukrainian language did not appear on the page for 5 seconds' })

        await this.languageBtnRu.click()
    }

    public open () {
        return super.open('');
    }

    public openUa () {
        return super.open('uk');
    }
}

export default new ChangLangZaz()
  
