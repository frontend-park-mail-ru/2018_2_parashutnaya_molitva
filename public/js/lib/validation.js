const errLoginIsEmpty = 'Login is empty';
const errEmailIsEmpty = 'Email is empty';
const errPassIsEmpty = 'Pass is empty';
const errLoginOrEmailIsEmpty = 'Input login or email';
const errRePassIsEmpty = 'RePass is empty';
const errLoginIsInvalid = 'Must contain at most 12 characters';
const errEmailIsInvalid = 'Email is invalid';
const errInvalidPasswordData = 'Must contain at least 4 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';
const errImageExtensionIsInvalid = 'Image extension is not valid';
const errImageSizeIsNotValid = 'Image size must be less than 5 MB';

let emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
let passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;

const validImageSize = 5 * (1 << 20);

export default class Validation {
    /**
     * Валидирует email.
     * @param email
     * @param withRegex если true - то емаил проверяется Regex на валидность
     * @returns {string} если не валидный емаил, возвращает ошибку.
     */
    static validateEmail (email, withRegex = false) {
        if (!email) {
            return errEmailIsEmpty;
        }

        if (withRegex && !Validation.validateEmailRegex(email)) {
            return errEmailIsInvalid;
        }
    }

    /**
     * Валидирует login.
     * @param login
     * @returns {string} если не валидный логин, возвращает ошибку.
     */
    static validateLogin (login) {
        if (!login) {
            return errLoginIsEmpty;
        }

        if (login.length > 12) {
            return errLoginIsInvalid;
        }
    }

    /**
     * Валидирует loginOrEmail.
     * @param loginOrEmail
     * @returns {string} если не валидный логин или email, возвращает ошибку.
     */
    static validateLoginOrEmail (loginOrEmail) {
        if (!loginOrEmail) {
            return errLoginOrEmailIsEmpty;
        }
    }

    /**
     * Валидирует пароль.
     * @param pass
     * @param withRegex если true - то пароль проверяется Regex на валидность
     * @returns {string} если не валидный пароль, возвращает ошибку.
     */
    static validatePassword (pass, withRegex = false) {
        if (!pass) {
            return errPassIsEmpty;
        }
        if (withRegex && !Validation.validatePassRegex(pass)) {
            return errInvalidPasswordData;
        }
    }

    /**
     * Сравнивает 2 пароля.
     * @param repass
     * @param pass
     * @returns {string}
     */
    static validateRepass (repass, pass) {
        const errRepass = Validation.validatePassword(repass);
        if (errRepass) {
            return errRePassIsEmpty;
        }

        if (pass !== repass) {
            return errNotEqualPassRePass;
        }
    }

    /**
     * RFC 2822. Покрывает 99.99% адресов.
     * @param email
     * @returns {boolean}
     */
    static validateEmailRegex (email) {
        return emailRe.test(String(email).toLowerCase());
    }

    /**
     * Проверяет на условие: 8 символов, 1 цифра, 1 в верхнем и 1 в нижнем регистре.
     * @param pass
     * @returns {boolean}
     */
    static validatePassRegex (pass) {
        return pass.length >= 4;
    }

    /**
     * Валидирует расширение и размер изображения.
     * @param avatar
     * @returns {string}
     */
    static validateAvatar (avatar) {
        const validExtensions = new Set(['gif', 'png', 'bmp', 'jpeg', 'jpg']);
        const extension = avatar.name.substring(avatar.name.lastIndexOf('.') + 1).toLowerCase();
        if (!validExtensions.has(extension)) {
            return errImageExtensionIsInvalid;
        }

        if (avatar.size > validImageSize) {
            return errImageSizeIsNotValid;
        }
    }
}
