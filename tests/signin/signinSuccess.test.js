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

const userObject = {
    loginOrEmail: 'sinimawath@gmail.com',
    pass: 'very_good'
};

describe('', () => {
    beforeEach(() => {
        const data = { test: 'test' };
        const json = () => Promise.resolve(data);
        const resp = { status: 200, json };

        Api.signIn.mockResolvedValue(resp);

        eventBus = new EventBus(eventList);
        model = new SigninModel(eventBus);
    });

    it('Правильный логин и пароль. Проверяем, что приходит событие signinSuccess', (done) => {
        onSuccesMock.mockImplementationOnce(() => {
            done();
        });

        eventBus.subscribeToEvent('signinSuccess', onSuccesMock);
        eventBus.triggerEvent('signin', userObject);

        expect(Api.signIn).toHaveBeenCalled();
    }, 500);

    it('Правильный логин и пароль. Проверяем, что приходит событие signinSuccess c данными', (done) => {
        onSuccesMock.mockImplementationOnce((data) => {
            expect(data.test).toBe('test');
            done();
        });

        eventBus.subscribeToEvent('signinSuccess', onSuccesMock);
        eventBus.triggerEvent('signin', userObject);
    }, 500);
});
