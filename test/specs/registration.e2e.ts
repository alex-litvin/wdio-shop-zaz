import { expect } from '@wdio/globals'
import logindata from '../data/login.json'
import RegistrationZaz from '../pageobjects/registration.page'

describe('Account creation', () => {

    beforeEach("Open site and maximize window", async () => {
        await RegistrationZaz.open()
        await browser.maximizeWindow()
    })

    it('should register with all fields', async () => {

        await RegistrationZaz.clickLoginButton()
        await RegistrationZaz.startRegistration('b@b.ua')

        // Before running the test for the second time, you need to go to login.json and change the Email/Phone
        await RegistrationZaz.enterRegistrationData(
            logindata.valid.lastname, 
            logindata.valid.firstname, 
            logindata.valid.middlename, 
            logindata.valid.phone, 
            logindata.valid.email,
            logindata.valid.password )

        await expect(browser).toHaveUrl('https://zapchastizaz.com.ua/order-history')
    });

    it('should not register without last name', async () => {

        await RegistrationZaz.clickLoginButton()
        await RegistrationZaz.startRegistration('b@b.ua')

        // Before running the test for the second time, you need to go to login.json and change the Email/Phone
        await RegistrationZaz.enterRegistrationData(
            logindata.missingRequiredField.lastname,
            logindata.missingRequiredField.firstname, 
            logindata.missingRequiredField.middlename, 
            logindata.missingRequiredField.phone, 
            logindata.missingRequiredField.email,
            logindata.missingRequiredField.password )

            await RegistrationZaz.errorMessage.waitForDisplayed({timeout:2000})
            await expect(RegistrationZaz.errorMessage).toBeDisplayed();
   
            await expect(RegistrationZaz.errorMessage).toHaveText('Фамилия необходим.')
    });

    it.only('should not register with password shorter than 5 characters', async () => {

        await RegistrationZaz.clickLoginButton()
        await RegistrationZaz.startRegistration('b@b.ua')

        // Before running the test for the second time, you need to go to login.json and change the Email/Phone
        await RegistrationZaz.enterRegistrationData(
            logindata.shortpassword.lastname,
            logindata.shortpassword.firstname, 
            logindata.shortpassword.middlename, 
            logindata.shortpassword.phone, 
            logindata.shortpassword.email,
            logindata.shortpassword.password 
        )

            await RegistrationZaz.errorMessage.waitForDisplayed({timeout:2500})
            await expect(RegistrationZaz.errorMessage).toBeDisplayed();
   
            await expect(RegistrationZaz.errorMessage).toHaveText('passwd неверный')
    });

    it('should show browser validation for incorrect email', async () => {

        await RegistrationZaz.clickLoginButton()
        await RegistrationZaz.startRegistration('b@b.ua')

        // Before running the test for the second time, you need to go to login.json and change the Email/Phone
        await RegistrationZaz.enterRegistrationData(
            logindata.invalid_email.lastname,
            logindata.invalid_email.firstname, 
            logindata.invalid_email.middlename, 
            logindata.invalid_email.phone, 
            logindata.invalid_email.email,
            logindata.invalid_email.password )

            expect(await RegistrationZaz.isEmailInvalid()).toBe(true)
   
    });

});