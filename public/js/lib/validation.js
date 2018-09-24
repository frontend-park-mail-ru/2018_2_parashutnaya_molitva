const errEmailIsEmpty = "Email is empty";
const errPassIsEmpty = "Pass is empty";
const errRePassIsEmpty = "RePass is empty";
const errEmailIsInvalid = "Email is invalid";
const errInvalidPasswordData = "Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";
const errNotEqualPassRePass = "Password and Password Repeat are not equal";

export default class Validation {
    static validateEmail(email, withRegex = false) {

        if (!email) {
            return errEmailIsEmpty;
        }

        if (withRegex && !Validation.validateEmailRegex(email)) {
            return errEmailIsInvalid;
        }
    }

    static validatePassword(pass, withRegex = false) {
        if (!pass) {
            return errPassIsEmpty;
        }
        if (withRegex && !Validation.validatePassRegex(pass)) {
            return errInvalidPasswordData;
        }
    }

    static validateRepass(repass, pass) {
        const errRepass = Validation.validatePassword(repass);
        if (errRepass) {
            return errRePassIsEmpty;
        }

        if (pass !== repass) {
            return errNotEqualPassRePass;
        }
    }

    static validateEmailRegex(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    static validatePassRegex(pass) {
        let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
        return re.test(pass);
    }
}