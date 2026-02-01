import { $ } from '@wdio/globals'
import Page from './page'

class RegistrationZaz extends Page{
    private get loginBtn() { return $('.header__user-info .fa-key')}
    private get registrationEmailInput() { return $('#email_create_ajax')}
    private get submitCreateBtn(){ return $('#SubmitCreateAjax')}

    private get lastNameField(){ return $('#lastname')}
    private get firstNameField(){ return $('#firstname')}
    private get middleNameField(){ return $('#middlename')}
    private get phoneField(){ return $('#phone')}
    private get emailField(){ return $('#email')}
    private get passwordField(){ return $('#passwd')}
    private get submitField(){ return $('#submitAccount')}

    public get errorMessage() { return $('.alert-danger ol li')}


    public async clickLoginButton(){
        await this.loginBtn.waitForClickable({ timeout: 5000 })
        await this.loginBtn.click()
    }

    public async startRegistration (email: string) {
        await this.registrationEmailInput.setValue(email);
        await this.submitCreateBtn.click();
    }

    public async enterRegistrationData (lastname:string, firstname:string, middlename:string,
        phone:string, email: string, password:string) {

        await this.lastNameField.setValue(lastname);
        await this.firstNameField.setValue(firstname);
        await this.middleNameField.setValue(middlename);
        await this.phoneField.setValue(phone);
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.submitField.click();
        
    }

    public async isEmailInvalid(): Promise<boolean> {
        const validity = await this.emailField.getProperty('validity') as ValidityState;
        return validity.valid === false;
    }

    public open () {
        return super.open('');
    }
}

export default new RegistrationZaz()