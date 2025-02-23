//Dependency imports
import Token from "../utils/token.js";

//Email views import
import EmailViews from "../views/email.views.js";
import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js";
import Email from "../utils/mailing.js";
import token from "../utils/token.js";

export default {

    //Check if a email already exists
    checkEmail: async (req, res, next) => {
        try {
            if (!req.body.email) {
                throw { code: 'badRequest' }
            }

            const exists = await musicianService.findOne('email', req.body.email);

            if (exists) {
                res.status(200).json({ exists: true });
            } else {
                res.status(200).json({ exists: false });
            }
        } catch (e) {
            next(error);
        }
    },

    //Check if a username already exists
    checkUsername: async (req, res, next) => {
        try {
            if (!req.body.username) {
                throw { code: 'badRequest' }
            }

            const exists = await musicianService.findOne('username', req.body.username);

            if (exists) {
                res.status(200).json({ exists: true });
            } else {
                res.status(200).json({ exists: false });
            }
        } catch (error) {
            next(error);
        }
    },

    //SignUp controller
    signUp: async (req, res, next) => {
        try {

            //Collecting request body required data
            const { email, username, password } = req.body;

            //Creating musician
            await musicianService.create({ email, username, password });

            //Generate token
            const generatedToken = await Token.generate({ email, username }, '600s');

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/musicians/signup-confirmation/${generatedToken}?username=${username}`

            //Setting up confirmation email
            const newEmail = new Email({
                to: email,
                subject: 'Confirma tu cuenta en Musiko',
                html: EmailViews.confirmation(confirmationUrl, username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Final response
            return res.status(200).json({
                title: '¡CONFIRMA TU CUENTA!',
                message: `Te hemos enviado un link de confirmación a ${email}. Por favor, revisa tu correo y sigue el enlace`
            });

        } catch (error) {
            next(error);
        }
    },

    //Confirm SignUp controller
    signUpConfirmation: async (req, res, next) => {
        try {
            //Initial log
            logger.http({ message: 'Account confirmation started', action: 'Confirm account', method: req.method, endpoint: req.originalUrl });

            //Token verification
            const authData = await Token.verifyAndRedirect(req.params.token, req.query.username);

            //Taking user data from token (authData)
            const username = authData.username;

            //Checking if user is already confirmed
            const isConfirmed = await musicianService.checkConfirmed(username);
            if (!isConfirmed) {
                //If not... set is_confirmed -> true
                await musicianService.updateIsConfirmed(username);
            } else {
                throw {
                    code: 'badRequest',
                    redirect: `/login?error=already-updated`
                };
            }

            //Final log
            logger.http({ message: 'Account successfully confirmed', action: 'Confirm account', method: req.method, endpoint: req.originalUrl });
            //Final response - redirect to front
            return res.status(303).redirect("http://localhost:5173/login?confirmation=true");
        } catch (error) {
            next(error);
        }
    },

    //Resend confirmation email
    resendConfirmation: async (req, res, next) => {
        try {
            //Initial log
            logger.http({ message: 'Resending email request stared', action: 'Resend confirmation email', method: req.method, endpoint: req.originalUrl });

            //Check if username exists in request body
            const username = req.body.username;
            if (!username) {
                throw { code: 'badRequest' };
            }

            //Check if user exists
            const user = await musicianService.findOne('username', username);
            if (!user) {
                throw { code: 'badRequest' };
            }

            //Checking if user is already confirmed
            const isConfirmed = await musicianService.checkConfirmed(username);
            if (isConfirmed) {
                throw { code: 'badRequest' };
            }

            //Generate token from username
            const generatedToken = await Token.generate({ username }, '600s');

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/musicians/signup-confirmation/${generatedToken}?username=${username}`

            //Setting up confirmation email
            const newEmail = new Email({
                to: user.email,
                subject: 'Nuevo email de confirmación',
                html: EmailViews.resendConfirmation(confirmationUrl, username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Finaization log
            logger.http({ message: `confirmation link has been sent to ${user.email}`, action: 'Resend confirmation email', method: req.method, endpoint: req.originalUrl })
            //Final response
            return res.status(200).json({
                message: `EMAIL ENVIADO`
            });

        } catch (error) {
            next(error);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { accessToken, refreshToken } = req.user;

            //Send cookie with accessToken
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,  // In production set to "true"
                sameSite: 'lax',
                maxAge: 3600000, // 1 hour duration
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,  // In production set to "true"
                sameSite: 'lax',
                maxAge: 604800000, // 7 days
            });

            res.status(200).json({ loggedin: true });
        } catch (error) {
            next(error);
        }
    },

    verifyMusician: async (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                throw { code: 'badRequest' }
            }

            const user = await token.verify(accessToken);
            
            const allUserData = await musicianService.findOne('id', user.id);

            console.log(allUserData);
            const userData = {
                id: allUserData.id,
                first_name: allUserData.first_name,
                username: allUserData.username
            }

            res.status(200).json({ verified: true, user: userData });
        } catch (error) {
            next(error)
        }
    }
}