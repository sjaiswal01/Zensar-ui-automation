export class ErrorMessages {
    static MissingFieldErrorMessage: string = "Something's missing. Please check and try again.";
    static InvalidUsernameErrorMessage: string = "We don’t recognise that email or username. You can try again or register for an account";
    static InvalidUsernameFormatErrorMessage: string = "Sorry, that email doesn’t look right. Please check it's a proper email.";
    static InvalidUsernameSpecialCharacterErrorMessage: string = "Usernames can only include... Letters, numbers and these characters: ?/|}{+=_-^~`%$#";
    static ShortUsernameErrorMessage: string = "Sorry, that username's too short. It needs to be at least two characters.";
    static LongUsernameErrorMessage: string = "Sorry, that username's too long. It can't be more than 50 characters."; 
    static IncorrectUsernameErrorMessage: string = "Sorry, those details don't match. Check you've typed them correctly.";
    static ShortPasswordErrorMessage: string = "Sorry, that password is too short. It needs to be eight characters or more.";
    static LongPasswordErrorMessage: string = "Sorry, that password is too long. It can't be more than 50 characters.";
    static IncorrectPasswordErrorMessage: string = "That password isn’t right. You can try again or reset your password";
    static NoFixtureMessage: string = "We have no events to show on this date";
}