import { test, expect } from '@playwright/test';
import { ScoreFixtureFootballPage } from '../pages/ScoreFixtureFootballPage';
import { environmentConstants } from '../test-data/environment-configuarion';
import { commonUtility } from '../utils/common-utils';
import { ErrorMessages } from '../test-data/error-messages';

let scoreFixtureFootballPage: ScoreFixtureFootballPage;

test.describe('Match Fixtures', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(environmentConstants.UIBaseUrl);
        scoreFixtureFootballPage = new ScoreFixtureFootballPage(page);
    });

    test("Make sure Today's Matches are displayed", async ({ page }) => {
        await scoreFixtureFootballPage.selectToday();
        const todayDate = commonUtility.getDate(new Date());
        expect(page.url()).toBe(environmentConstants.UIBaseUrl + "/" + todayDate);

        const teamNamesHavingMatches = await scoreFixtureFootballPage.getAllTeamNamesWithMatchOnSelectedDate();
        console.log(teamNamesHavingMatches);
        expect(teamNamesHavingMatches).not.toBeNull();
    });

    test("Verify text message for no match on selected date", async ({ page }) => {
        const targetDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        await scoreFixtureFootballPage.selectDateInFromCalendar(targetDate);
        expect(page.url()).toBe(environmentConstants.UIBaseUrl + "/" + commonUtility.getDate(targetDate));
        const noFixtureText = await scoreFixtureFootballPage.getNoFixtureText();
        console.log(noFixtureText);
        expect(noFixtureText).toBe(ErrorMessages.NoFixtureMessage);
    });
});