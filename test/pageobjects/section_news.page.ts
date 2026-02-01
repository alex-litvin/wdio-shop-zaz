import { $ } from '@wdio/globals'
import Page from './page';

class NewsSection extends Page{
    private get newsMenu(){return $('a[title="Новости"]')}
    private get pageFour(){return $('=4')}
    private get newsOnThePage () { return $('#smartblogpost-55 a.r_more') }
    public get newsh1Title () { return $('.s1-h')}

    public async clickNewsMenu(){
        await this.newsMenu.waitForClickable({ timeout: 5000, timeoutMsg: 'The "News" menu button was not clickable after 5 seconds' })
        await this.newsMenu.click()
    }

    public async goToPageFour(){
        await this.pageFour.scrollIntoView()
        await this.pageFour.waitForClickable({ timeout: 5000, timeoutMsg: 'The "News" menu button was not clickable after 5 seconds' })    
        await this.pageFour.click()
    }

    public async goToNewsOnThePage(){
        await this.newsOnThePage.scrollIntoView()
        await this.newsOnThePage.waitForClickable({ timeout: 5000, timeoutMsg: 'The "News" menu button was not clickable after 5 seconds' })        
        await this.newsOnThePage.click()
    }

    public open () {
        return super.open('');
    }
}

export default new NewsSection()