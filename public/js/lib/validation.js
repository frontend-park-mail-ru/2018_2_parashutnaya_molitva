const errEmailIsEmpty = 'Email is empty';
const errPassIsEmpty = 'Pass is empty';
const errRePassIsEmpty = 'RePass is empty';
const errEmailIsInvalid = 'Email is invalid';
const errInvalidPasswordData = 'Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase';
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
        return passRe.test(pass);
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
        const size = avatar.size;
        if (size > validImageSize) {
            return errImageSizeIsNotValid;
        }
    }
}
