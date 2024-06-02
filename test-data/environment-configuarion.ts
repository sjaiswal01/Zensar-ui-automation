export class environmentConstants {
    private static readonly _UIBaseUrl = "https://www.bbc.com/sport/football/scores-fixtures";
    public static get UIBaseUrl() {
        return environmentConstants._UIBaseUrl;
    }

}
