import { $ } from '@wdio/globals'
import Page from './page'

class Search extends Page{

    private get searchField(){return $('#search_query_top')}
    private get searchBtn(){return $('.btn-search')}
    public get searchResults() { return $$('.product_list .b-goods__wrap')}

    private get searchCounter() { return $('.heading-counter') }

    private get categoryMenu() { return $('#filtrMenu') }
    private get oilCategory() { return $('label[for="category-search_17"]') }

    public get paginationContainer() { return $('#pagination_bottom') }


    public async enterText(item: string | number){
        await this.searchField.clearValue()
        await this.searchField.setValue(item)
    }

    public async clickSearchBtn(){
        await this.searchBtn.waitForClickable({ timeout: 5000 })
        await this.searchBtn.click()
    }

    public async selectSearchCategory(){
        await this.categoryMenu.waitForClickable({ timeout: 5000 })
        await this.categoryMenu.click()
        await this.oilCategory.waitForClickable({ timeout: 5000 })
        await this.oilCategory.click()
    }

    public async getSearchPlaceholder(){
        await this.searchField.waitForDisplayed()
        return await this.searchField.getAttribute('placeholder')
    }

    public async getCounterNumber(){
        const counterText = await this.searchCounter.getText()
        const numResult = parseInt(counterText)
        return numResult
    }

    public async getResultsQuantity(){
        const quantityResults = (await this.searchResults).length
        return quantityResults
    }
    
    public open () {
        return super.open('');
    }
}

export default new Search()