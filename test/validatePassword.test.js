import validate from "../utils/validate";

describe('Validación de contraseñas', () => {
    test('Debe validar correctamente una contraseña válida', () => {
        const validPassword = '123_abcD';
        expect(validate.pass(validPassword)).toBe(true);
    });

    test('Debe rechazar una contraseña sin mayúsculas', () => {
        const invalidPassword = '123_abcd@';
        expect(validate.pass(invalidPassword)).toBe(false);
    });

    test('debe rechazar una contraseña sin minúsculas', () => {
        const invalidPassword = '123ABC_D';
        expect(validate.pass(invalidPassword)).toBe(false);
    });

    test('debe rechazar una contraseña sin números', () => {
        const invalidPassword = 'ABCD_EFG';
        expect(validate.pass(invalidPassword)).toBe(false);
    });

    test('debe rechazar una contraseña sin caracteres especiales', () => {
        const invalidPassword = 'AbcdeaDA';
        expect(validate.pass(invalidPassword)).toBe(false);
    });

    test('debe rechazar una contraseña demasiado corta', () => {
        const invalidPassword = 'Ab@';
        expect(validate.pass(invalidPassword)).toBe(false);
    });
});