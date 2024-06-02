import { test, expect } from '@playwright/test';
import { ScoreFixtureFootballPage } from '../pages/ScoreFixtureFootballPage';
import { SearchPage } from '../pages/SearchPage';
import { environmentConstants } from '../test-data/environment-configuarion';

let scoreFixtureFootballPage: ScoreFixtureFootballPage;
let searchPage: SearchPage;

test.describe('Search for articles: Sports', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(environmentConstants.UIBaseUrl);
        scoreFixtureFootballPage = new ScoreFixtureFootballPage(page);
        searchPage = new SearchPage(page);
    });

    test('Verify number of articles on a page', async ({ page }) => {
        await scoreFixtureFootballPage.clickSearchBBC();
        await searchPage.searchForArticle('sports');
        await page.waitForLoadState('networkidle');
        expect(await searchPage.getSearchResultsCountOnPage()).toBe(10);
        const firstArticle = await searchPage.getFirstArticleTitle();
        console.log(firstArticle);

        const lastArticle = await searchPage.getLastArticleTitle()
        console.log(lastArticle);
    });
});