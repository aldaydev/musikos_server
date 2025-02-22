import token from "../utils/token.js";

export default {

    accessToken: async (req, res, next) => {
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

    refreshToken: async (req, res, next) => {
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