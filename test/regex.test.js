const testItems = {
    password: '123_abcD',
    wrongPassword: '123456',
    email: 'test@test.com',
    wrongEmail: 'test@test',
    name: 'Pepito grillo',
    wrongName: 'Pep1to',
    username: 'pepito',
    wrongUsername: 'Pepito'
};
const testItemsObj = () => testItems;

describe('SignUp data testing regex', () => {
    const exp = testItemsObj();
    //Testing password
    test('Testing ok password should be accepted', () => {
        expect(exp.password).toMatch(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-_%*?&])[A-Za-z\d@$!-_%*?&]{8,}$/);
    });
    test('Testing wrong password should be rejected', () => {
        expect(exp.wrongPassword).not.toMatch(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-_%*?&])[A-Za-z\d@$!-_%*?&]{8,}$/);
    });
    //Testing email
    test('Testing ok email should be accepted', () => {
        expect(exp.email).toMatch(/^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    });
    test('Testing wrong email should be rejected', () => {
        expect(exp.wrongEmail).not.toMatch(/^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    });
    //Testing name
    test('Testing ok name should be accepted', () => {
        expect(exp.name).toMatch(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{3,60}$/);
    });
    test('Testing wrong name should be rejected', () => {
        expect(exp.wrongName).not.toMatch(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{3,60}$/);
    });
    //Testing username
    test('Testing ok username should be accepted', () => {
        expect(exp.username).toMatch(/^(?!.*[_-]{2})(?![_-])([a-z0-9_-]{3,30})(?<![_-])$/);
    });
    test('Testing wrong username should be rejected', () => {
        expect(exp.wrongUsername).not.toMatch(/^(?!.*[_-]{2})(?![_-])([a-z0-9_-]{3,30})(?<![_-])$/);
    });
});