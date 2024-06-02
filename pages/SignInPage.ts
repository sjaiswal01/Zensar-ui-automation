import { Locator, Page } from '@playwright/test';

export class SignInPage {
    private page: Page;
    private continueButton: Locator;
    private formErrorMessageUsername: Locator;
    private formErrorMessagePassword: Locator;
    private formErrorMessageGeneral: Locator;
    private emailTextbox: Locator;
    private signInButton: Locator;
    private passwordTextbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByText('Continue');
        this.emailTextbox = page.getByLabel('Email or username');
        this.passwordTextbox = page.getByLabel('Password')
        this.signInButton = page.getByText('Sign in');
        this.formErrorMessageUsername = page.locator('[id = "form-message-username"]');
        this.formErrorMessagePassword = page.locator('[id = "form-message-password"]');
        this.formErrorMessageGeneral = page.locator('[id = "form-message-general"]');
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async enterEmailOrUsername(username: string) {
        await this.emailTextbox.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async getUsernameErrorMessge() {
        return await this.formErrorMessageUsername.textContent();
    }

    async getPasswordErrorMessge() {
        return await this.formErrorMessagePassword.textContent();
    }

    async getGeneralErrorMessge() {
        return await this.formErrorMessageGeneral.textContent();
    }
}