import { LoginPage } from '../pages/loginPage';

export class LoginSteps {
    private loginPage: LoginPage;

    constructor(loginPage: LoginPage) {
        this.loginPage = loginPage;
    }

    async login(username: string, password: string) {
        await this.loginPage.enterUsername(username);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
    }
}
