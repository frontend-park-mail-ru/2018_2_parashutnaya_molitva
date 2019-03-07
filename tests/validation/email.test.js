import Validation from '../../public/js/lib/validation';

let email;

describe('', () => {
    beforeEach(() => {
        email = 'sinimawa@gmail.com';
    });

    it('Проверяем правильность email регуляркой. Email удовлетворяет регулряке. ', () => {
        const result = Validation.validateEmailRegex(email);

        return expect(result).toBeTruthy();
    });
});


describe('', () => {
    beforeEach(() => {
        email = '12@';
    });

    it('Проверяем правильность email регуляркой. Email не удовлетворяет регулряке. ', () => {
        const result = Validation.validateEmailRegex(email);

        return expect(result).toBeFalsy();
    });
});

describe('', () => {
    beforeEach(() => {
        email = '12345';
    });

    it('Проверяем правильность email. Email правильный.', () => {
        const result = Validation.validateEmail(email);

        return expect(result).toBe(void 0);
    });
});

describe('', () => {
    beforeEach(() => {
        email = '12';
    });

    it('Проверяем правильность пароля. Email неправильный. WithRegex', () => {
        const result = Validation.validateEmail(email, true);

        return expect(result).toBe('Email is invalid');
    });

});

describe('', () => {
    beforeEach(() => {
        email = '';
    });

    it('Проверяем правильность пароля. Пароль пустой. ', () => {
        const result = Validation.validateEmail(email);

        return expect(result).toBe('Email is empty');
    });
});
