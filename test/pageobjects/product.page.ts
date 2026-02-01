import { $ } from '@wdio/globals'
import Page from './page'

class Product extends Page{

    private get addToCartBtn (){return $('#add_to_cart_submit');}
    private get quantityPlusBtn() {return $('#inputCountUp');}
    private get quantityMinusBtn() {return $('#inputCountDown');}
    private get quantityWanted() {return $('#quantity_wanted');}

    private get lastNameInput (){return $('#new_account_form #lastname')}
    private get firstNameInput (){return $('#new_account_form #firstname')}
    private get phoneInput (){return $('#new_account_form #phone')}
    private get nextBtn (){return $('#submitAccount')}

    private get placeAnOrder() {return $('#layer_cart .btn--order')}

    private get continueShopping() {return $('div.continue a')}

    private get deliveryOptions() {return $('[id^="select2-carrier_delivery-"]')}
    private get novaPostOption() {return $('span[title="Нова Пошта"]')}
    private get cashOnDelivery() {return $('label[for="cashondelivery"]')}

    private get citySearchInputContainer() { return $('#select2-address_city-container'); }
    private get cityResults() {return $('#select2-address_city-results')}
    private get cityKorostyshiv() {return $('//li[text()="Коростышев"]')}
    
    private get activeInputField() {return $('.select2-container--open .select2-search__field')}

    private get postSearchInputContainer() { return $('#select2-address_warehouse-container')}
    private get postResults() {return $('#select2-address_warehouse-results')}
    private get postThirdDepartment() {return $('//li[contains(text(), "Отделение №3")]')}

    private get commentsField() { return $('#textarea') }
    private get finishOrderBtn() { return $('#submitOrderForm .btn__form-next') }

    private get orderSuccessMessage() { return $('.b-order-info__item p') }

    public async changeQuantityPlus(count:number){

        await this.quantityPlusBtn.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Plus' button did not become available after 5 seconds" })

        for (let i = 0; i < count; i++) {
            await this.quantityPlusBtn.click()  
            await browser.pause(700)
        }
    }

    public async changeQuantityMinus(count:number){

        await this.quantityMinusBtn.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Minus' button did not become available after 5 seconds" })

        for (let i = 0; i < count; i++) {
            await this.quantityMinusBtn.click()  
            await browser.pause(700)
        }
    }

    public async addToCart(){
        await this.addToCartBtn.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Купить' button did not become available after 5 seconds" })
        await this.addToCartBtn.click()
    }

    public async clickContinueShopping(){
        await this.continueShopping.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Продолжить покупки' button did not become available after 5 seconds" })
        await this.continueShopping.click()
    }

    public async clickPlaceAnOrder(){
        await this.placeAnOrder.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Оформить заказ' button did not become available after 5 seconds" })
        await this.placeAnOrder.click()
    }

    public async clickCheckoutBtn(){
        await this.finishOrderBtn.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Оформить заказ' button did not become available after 5 seconds" })
        await this.finishOrderBtn.click()
    }

    public async fillingOutPesonalInfo (lastname : string, firstname:string, phone:string) {
        await this.lastNameInput.clearValue();
        await this.lastNameInput.setValue(lastname);
        await this.firstNameInput.clearValue();
        await this.firstNameInput.setValue(firstname);
        await this.phoneInput.clearValue();
        await this.phoneInput.setValue(phone);
        await this.nextBtn.waitForClickable({ timeout: 5000, timeoutMsg: "The 'Далі' button did not become available after 5 seconds" });
        await this.nextBtn.click();       
    }

    public async carrierSelection(){
        await this.deliveryOptions.waitForClickable({timeout: 2000, timeoutMsg:"The 'Чим відправляти?' dropdown didn't become available after 5 seconds"})
        await this.deliveryOptions.click()
        await this.novaPostOption.waitForClickable({timeout: 2000, timeoutMsg:"The 'Нова пошта' dropdown didn't become available after 5 seconds"})
        await this.novaPostOption.click()
    }

    public async citySelect(){
        await this.citySearchInputContainer.waitForClickable({timeout: 5000, timeoutMsg:"The 'Куди відправляти?' didn't become available after 5 seconds"})
        await this.citySearchInputContainer.click()
        await this.activeInputField.waitForDisplayed()
        await this.activeInputField.setValue('коро')
        await this.cityResults.waitForDisplayed()
        await this.cityKorostyshiv.click()
    }

    public async postOfficeSelect(){
        await this.postSearchInputContainer.waitForClickable({timeout: 5000, timeoutMsg:"The 'На яке відділення?' didn't become available after 5 seconds"})
        await this.postSearchInputContainer.click()
        await this.activeInputField.waitForDisplayed()
        await this.activeInputField.setValue('3')
        await this.postResults.waitForDisplayed()
        await this.postThirdDepartment.click()
    }

    public async selectCashOnDelivery() {
        await this.cashOnDelivery.waitForClickable({ timeout: 5000, timeoutMsg:"The 'Післяплата' didn't become available after 5 seconds" })
        await this.cashOnDelivery.click()
    }

    public async addComment(comment:string) {
        await this.commentsField.waitForEnabled({ timeout: 5000 })
        await this.commentsField.clearValue()
        await this.commentsField.setValue(comment)
    }

     public async getCurrentQuantity(){
        const currentQuantity = await this.quantityWanted.getValue()
        const currentQuantityResult = parseInt(currentQuantity)
        return currentQuantityResult
    }

    public async getSuccessMessage() {
        await this.orderSuccessMessage.waitForDisplayed({ timeout: 5000 });
        const successMsg = await this.orderSuccessMessage.getText()
        return successMsg
    }
    
    public openProduct1 () {
        return super.open('matiz/13728-vazhil-ruchnogo-galma-v-zbori-matiz-gm-96644485');
    }

    public openProduct2 () {
        return super.open('matiz/9516-disk-tormoznoj-perednij-matiz-valeo-r3007#');
    }
}

export default new Product()