import { Locator, Page } from "@playwright/test";

export class SearchPage {
    private page: Page;
    private searchTextbox: Locator;
    private searchButton: Locator;
    private searchResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchTextbox = page.getByPlaceholder('Search the BBC');
        this.searchButton = page.getByRole('button', {name : 'Search'});
        this.searchResults = page.getByTestId('default-promo');
    }

    async searchForArticle(articleTopic: string){
        await this.searchTextbox.fill(articleTopic);
        await this.searchButton.click();
    }

    async getSearchResultsCountOnPage() {
        return await this.searchResults.count();
    }

    async getFirstArticleTitle() {
        return await this.searchResults.first().getByRole('link').textContent();
    }

    async getLastArticleTitle() {
        return await this.searchResults.last().getByRole('link').textContent();
    }

    async getNthArticleTitle(nth: number) {
        return await this.searchResults.nth(nth).getByRole('link').textContent();
    }
}