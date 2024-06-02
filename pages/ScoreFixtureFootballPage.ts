import { Locator, Page } from "@playwright/test";
import { commonUtility } from "../utils/common-utils";

export class ScoreFixtureFootballPage {
    private page: Page;
    private signInButton: Locator;
    private searchButton: Locator;
    private todayButton: Locator;
    private datePickerButton: Locator;
    private calendarMonth: Locator;
    private noFixtureText: Locator;
    private nextMonthButton: Locator;
    private teamNames: Locator;
    private todayButtonDatePicker: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByText('Sign in');
        this.searchButton = page.getByText('Search BBC');
        this.todayButton = page.locator('a[id = "today"]');
        this.todayButtonDatePicker = page.getByTestId('datepicker-header-today');
        this.datePickerButton = page.getByTestId('datepicker-open-calendar');
        this.calendarMonth = page.locator('#calendar-month');
        this.nextMonthButton = page.getByTestId('calendar-next-month');
        this.noFixtureText = page.locator('.ssrcss-1oz4vre-NoFixtures');
        this.teamNames = page.locator('//div[@class = "ssrcss-1exl1kb-TeamNameWrapper emlpoi32"]/span[1]');
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async clickSearchBBC() {
        await this.searchButton.click();
    }

    async getAllTeamNamesWithMatchOnSelectedDate() {
        return await this.teamNames.allTextContents();
    }

    async selectToday(isDatePicker: boolean = false) {
        isDatePicker ? await this.todayButtonDatePicker.click() : await this.todayButton.click();

    }

    async clickDatePicker() {
        await this.datePickerButton.click();
    }

    async selectDateInFromCalendar(date: Date) {
        const day = date.getDate();
        const month = commonUtility.getFullMonthName(date);
        const year = date.getFullYear();

        const calenderMonth = month + " " + year;

        await this.clickDatePicker();
        while(await this.calendarMonth.textContent() != calenderMonth) {
            await this.nextMonthButton.click();
        }
        await this.page.getByRole('link', { name : `${day}`, exact: true }).click();
    }

    async getNoFixtureText() {
        return await this.noFixtureText.textContent();
    }
}