import { test, expect } from './baseTest';

test.describe('Login Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate('https://www.saucedemo.com/');
    });

    test('TC01 - Login thành công với tài khoản hợp lệ', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('standard_user', 'secret_sauce');
        expect(await loginPage.getPageTitle()).toBe('Products');
    });

    test('TC02 - Login thất bại với tài khoản bị khóa', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('locked_out_user', 'secret_sauce');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC03 - Login thất bại với username sai', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('wrong_user', 'secret_sauce');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC04 - Login thất bại với password sai', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('standard_user', 'wrong_pass');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC05 - Login thất bại khi để trống username', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('', 'secret_sauce');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Username is required');
    });

    test('TC06 - Login thất bại khi để trống password', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('standard_user', '');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Password is required');
    });

    test('TC07 - Login thất bại khi để trống cả username và password', async ({ loginSteps, loginPage }) => {
        await loginSteps.login('', '');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Username is required');
    });

    test('TC08 - Login thành công sau khi nhập sai rồi sửa lại đúng', async ({ loginPage, loginSteps }) => {
        await loginSteps.login('wrong_user', 'wrong_pass');
        expect(await loginPage.getErrorMessage())
            .toBe('Epic sadface: Username and password do not match any user in this service');

        await loginPage.clearInputs();
        await loginSteps.login('standard_user', 'secret_sauce');
        expect(await loginPage.getPageTitle()).toBe('Products');
    });

});
