// jest.config.js
export default {
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {}, 
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    setupFiles: [],
};