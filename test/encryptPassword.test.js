import { encryptPassword } from '../utils/bcrypt';

describe('calculating age function', () => {

    test('should return a hashed password', async () => {
        const password = '123_abcD';
        const hashedPassword = await encryptPassword(password);
        
        expect(typeof hashedPassword).toBe('string');
        expect(hashedPassword.length).toEqual(60);
    });

});