import Net from '../../public/js/lib/net';
import Api from '../../public/js/lib/api';

jest.mock('../../public/js/lib/net');
const userguid = 'guid';
const user = { user: 'user' };

describe('', () => {
    beforeEach(() => {
        const json = () => Promise.resolve(user);
        const resp = { json };
        Net.doGet.mockResolvedValue(resp);
    });

    it('Проверяем вызов loaduser', function () {
        return Api.loadUser(userguid).then((data) => expect(data.user).toBe(user.user));
    });
});
