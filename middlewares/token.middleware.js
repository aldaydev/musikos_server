import token from "../utils/token.js";

export default {

    generateAccessToken: async (req, res, next) => {
        try {
            //Get data to conform access token
            const { id, username, email } = req.user;

            //Generate token and add to req.user
            req.user.accessToken = await token.generate({id, username, email}, '1h');

            next();

        } catch (error) {
            next(error);
        }
    },

    verifyAccessToken: async (req, res, next) => {
        try {
            //Get token from cookies
            const accessToken = req.cookies.accessToken;
            if(!accessToken) {
                throw {code: 'badRequest'}
            }

            //Verifying token
            const user = await token.verify(accessToken);

            //Saving payload in req.user
            req.user = {id: user.id, email: user.email, username: user.username};

            next();
            
        } catch (error) {
            next(error);
        }
    },

    generateRefreshToken: async (req, res, next) => {
        try {
            //Get data to conform refresh token
            const { id, username, email } = req.user;

            //Generate token and add to req.user
            req.user.refreshToken = await token.generate({id, username, email}, '7d');

            next();

        } catch (error) {
            next(error);
        }
    },

    verifyRefreshToken: async (req, res, next) => {
        try {
            //Get token from cookies
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken) {
                throw {code: 'badRequest'}
            }

            //Verifying token
            const user = await token.verify(refreshToken);

            //Saving payload in req.user
            req.user = {id: user.id, email: user.email, username: user.username};

            next();
            
        } catch (error) {
            next(error);
        }
    },

    verifyRecoverPassToken: async (req, res, next) => {
        try {
            //Get token from cookies
            const recoverPassToken = req.cookies.recoverPassToken;
            if(!recoverPassToken) {
                throw {code: 'badRequest'}
            }

            //Clearing recoverPasswordToken
            res.clearCookie("recoverPassToken", { path: "/" });

            //Verifying token
            const user = await token.verify(recoverPassToken);

            //Saving payload in req.user
            req.user = {id: user.id, email: user.email, username: user.username};

            next();
            
        } catch (error) {
            next(error);
        }
    },

}