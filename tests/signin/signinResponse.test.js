import SigninModel from '../../public/js/models/SigninModel';
import EventBus from '../../public/js/lib/eventbus/eventbus';
import Api from '../../public/js/lib/api';

jest.mock('../../public/js/lib/api');

let model;
let eventBus;

const eventList = [
    'signin',
    'signinResponse',
    'signinSuccess',
    'loadWaiting'
];

const onSuccesMock = jest.fn();
const notSuccessMock = jest.fn();

const userObjectGood = {
    loginOrEmail: 'sinimawath@gmail.com',
    pass: 'very_good'
};

const userObjectBadLogin = {
    pass: 'very_good'
};

const userObjectBadPass = {
    loginOrEmail: 'sinimawath@gmail.com',
};

describe('Проверям функциональность события singinResponse', () => {
    beforeEach(() => {
        const data = { test: 'test' };
        const json = () => Promise.resolve(data);
        const resp = { status: 201, json };

        Api.signIn.mockResolvedValue(resp);

        eventBus = new EventBus(eventList);
        model = new SigninModel(eventBus);
    });

    it('Правильный логин и пароль. Проверяем, что приходит событие signinResponse, когда ответ не 200', (done) => {
        onSuccesMock.mockImplementationOnce(() => {
            done();
        });

        eventBus.subscribeToEvent('signinResponse', onSuccesMock);
        eventBus.triggerEvent('signin', userObjectGood);
    }, 500);

    it('Правильный логин и пароль. Проверяем, что приходят правильные данные на событие signinResponse,' +
        ' когда ответ не 200', (done) => {
        onSuccesMock.mockImplementationOnce((data) => {
            expect(data.test).toBe('test');
            done();
        });

        eventBus.subscribeToEvent('signinResponse', onSuccesMock);
        eventBus.triggerEvent('signin', userObjectGood);
    }, 500);

    it('Неправильный логин. Проверяем, что вызывается событияе signinResponse с ошибкой', (done) => {
        notSuccessMock.mockImplementationOnce((data) => {
            expect(data.error).not.toBe(void 0);
            done();
        });

        eventBus.subscribeToEvent('signinResponse', notSuccessMock);
        eventBus.triggerEvent('signin', userObjectBadLogin);
    }, 500);

    it('Неправльный паролm(пустой). Проверяем, что вызывается событияе signinResponse с ошибкой', (done) => {
        notSuccessMock.mockImplementationOnce((data) => {
            expect(data.error).not.toBe(void 0);
            done();
        });

        eventBus.subscribeToEvent('signinResponse', notSuccessMock);
        eventBus.triggerEvent('signin', userObjectBadPass);
    }, 500);
});

