import Validation from '../../public/js/lib/validation';

let password;

describe('', () => {
    beforeEach(() => {
        password = '1234';
    });

    it('Проверяем правильность пароля регуляркой. Пароль состоит из >=4 символом. Pass Regex', () => {
        const result = Validation.validatePassRegex(password);

        return expect(result).toBeTruthy();
    });
});


describe('', () => {
    beforeEach(() => {
        password = '12';
    });

    it('Проверяем правильность пароля регуляркой. Пароль состоит из < 4 символом. Pass Regex', () => {
        const result = Validation.validatePassRegex(password);

        return expect(result).toBeFalsy();
    });
});

describe('', () => {
    beforeEach(() => {
        password = '12345';
    });

    it('Проверяем правильность пароля. Пароль правильный.', () => {
        const result = Validation.validatePassword(password);

        return expect(result).toBe(void 0);
    });
});

describe('', () => {
    beforeEach(() => {
        password = '12';
    });

    it('Проверяем правильность пароля. Пароль неправильный. с PassRegex', () => {
        const result = Validation.validatePassword(password, true);

        return expect(result).toBe('Must contain at least 4 chars');
    });

});

describe('', () => {
    beforeEach(() => {
        password = '';
    });

    it('Проверяем правильность пароля. Пароль пустой. ', () => {
        const result = Validation.validatePassword(password);

        return expect(result).toBe('Pass is empty');
    });
});


