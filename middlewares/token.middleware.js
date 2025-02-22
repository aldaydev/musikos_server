import token from "../utils/token.js";

export default {

    generateAccessToken: async (req, res, next) => {
        try {
            //Get data to conform access token
            const { id, username } = req.user;

            //Generate token and add to req.user
            req.user.accessToken = await token.generate({id, username}, '1h');

            next();

        } catch (error) {
            next(error);
        }
    },

    validateAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            if(!accessToken) {
                throw {code: 'badRequest'}
            }

            await token.verify(accessToken);

            next();
            
        } catch (error) {
            next(error);
        }
    },

    generateRefreshToken: async (req, res, next) => {
        try {
            //Get data to conform refresh token
            const { id, username } = req.user;

            //Generate token and add to req.user
            req.user.refreshToken = await token.generate({id, username}, '7d');

            next();

        } catch (error) {
            next(error);
        }
    },

}