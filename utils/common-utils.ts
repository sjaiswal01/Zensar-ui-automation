export class commonUtility {

    /** Get date in YYYY-MM-DD format */
    static getDate(date: Date) {
        return date.toJSON().slice(0, 10);
    }

    static getFullMonthName(date: Date) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[date.getMonth()]
    }
}