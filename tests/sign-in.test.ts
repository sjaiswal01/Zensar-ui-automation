import { test, expect } from '@playwright/test';
import { ScoreFixtureFootballPage } from '../pages/ScoreFixtureFootballPage';
import { SignInPage } from '../pages/SignInPage';
import { environmentConstants } from '../test-data/environment-configuarion';
import { ErrorMessages } from '../test-data/error-messages';
import { userData } from '../test-data/user-data';

let scoreFixtureFootballPage: ScoreFixtureFootballPage;
let signInPage: SignInPage;

test.describe('All negative scenario of Sign-In test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(environmentConstants.UIBaseUrl);
        scoreFixtureFootballPage = new ScoreFixtureFootballPage(page);
        await scoreFixtureFootballPage.clickSignIn();
        signInPage = new SignInPage(page);
    })

    test('Click continue with no email', async () => {
        await signInPage.clickContinueButton();
        const errorMessage = await signInPage.getUsernameErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.MissingFieldErrorMessage);
    });

    test('Click continue with unregistered email', async () => {
        await signInPage.enterEmailOrUsername(userData.unregisteredEmail);
        await signInPage.clickContinueButton();
        const errorMessage = await signInPage.getGeneralErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.InvalidUsernameErrorMessage);
    });

    test('Click continue with invalid email format', async () => {
        await signInPage.enterEmailOrUsername(userData.invalidEmail);
        await signInPage.clickContinueButton();
        const errorMessage = await signInPage.getUsernameErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.InvalidUsernameFormatErrorMessage);
    });

    test('Click continue with invalid username format', async () => {
        await signInPage.enterEmailOrUsername(userData.invalidUsername);
        await signInPage.clickContinueButton();
        const errorMessage = await signInPage.getUsernameErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.InvalidUsernameSpecialCharacterErrorMessage);
    });
    
    test('Sign in with invalid username and blank password', async () => {
        await signInPage.enterEmailOrUsername(userData.invalidUsername);
        await signInPage.clickContinueButton();
        await signInPage.clickSignInButton();
        const errorMessage = await signInPage.getPasswordErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.MissingFieldErrorMessage);
        const generalMessage = await signInPage.getGeneralErrorMessge();
        expect(generalMessage).toBe(ErrorMessages.IncorrectUsernameErrorMessage);
    });

    test('Sign in with invalid password', async () => {
        await signInPage.enterEmailOrUsername(userData.registeredEmail);
        await signInPage.clickContinueButton();
        await signInPage.enterPassword(userData.invalidPassword);
        await signInPage.clickSignInButton();
        const errorMessage = await signInPage.getGeneralErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.IncorrectPasswordErrorMessage);
    });

    test('Sign in with Short password',async()=>{
        await signInPage.enterEmailOrUsername(userData.registeredEmail);
        await signInPage.clickContinueButton();
        await signInPage.enterPassword(userData.shortPassword);
        await signInPage.clickSignInButton();
        const errorMessage = await signInPage.getPasswordErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.ShortPasswordErrorMessage);
    });

    test('Sign in with Long password',async()=>{
        await signInPage.enterEmailOrUsername(userData.registeredEmail);
        await signInPage.clickContinueButton();
        await signInPage.enterPassword(userData.longPassword);
        await signInPage.clickSignInButton();
        const errorMessage = await signInPage.getPasswordErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.LongPasswordErrorMessage);
    });

    test('Click continue with short username', async () => {
        await signInPage.enterEmailOrUsername(userData.shortUserName);
        await signInPage.clickContinueButton();
        const errorMessage = await signInPage.getUsernameErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.ShortUsernameErrorMessage);
    });

    test('Click continue with long username', async () => {
        await signInPage.enterEmailOrUsername(userData.longUserName);
        await signInPage.clickContinueButton();
        const errorMessage = await signInPage.getUsernameErrorMessge();
        expect(errorMessage).toBe(ErrorMessages.LongUsernameErrorMessage);
    });
});