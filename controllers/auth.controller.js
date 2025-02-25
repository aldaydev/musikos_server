//Dependency imports
import token from "../utils/token.js";

//Email views import
import EmailViews from "../views/email.views.js";
import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js";
import Email from "../utils/mailing.js";

export default {

    //SignUp controller
    signUp: async (req, res, next) => {
        try {
            //Collecting request body required data
            let { email, username, password } = req.body;

            //Converting email to lowercase
            email = email.toLowerCase();

            //Creating musician
            await musicianService.create({ email, username, password });

            //Generate token
            const generatedToken = await token.generate({ email, username }, '600s');

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/auth/signup-confirmation/${generatedToken}?username=${username}`

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

            //Checking if user is already confirmed
            const isConfirmed = await musicianService.checkConfirmed(req.query.username);
            
            //If is already confirmed, throw an error
            if (isConfirmed) {
                throw {
                    code: 'badRequest',
                    redirect: `/login?error=already-confirmed&type=confirmation`
                };
            }

            //Token verification
            const authData = await token.verifyAndRedirect(req.params.token, req.query.username, 'confirmation');

            //If not... set is_confirmed -> true
            await musicianService.updateIsConfirmed(authData.username);

            //Final log
            logger.http({ message: 'Account successfully confirmed', action: 'Confirm account', method: req.method, endpoint: req.originalUrl });

            //Final response - redirect to front
            return res.status(303).redirect("http://localhost:5173/login?success=true&type=confirmation");

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
            const isConfirmed = await musicianService.checkConfirmed(username, 'confirmation');
            if (isConfirmed) {
                throw { code: 'badRequest' };
            }

            //Generate token from username
            const generatedToken = await token.generate({ username }, '600s');

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/auth/signup-confirmation/${generatedToken}?username=${username}`

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
            //Taking tokens from req.user
            const { accessToken, refreshToken } = req.user;

            //Send cookie with accessToken
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,  // In production set to "true"
                sameSite: 'lax',
                maxAge: 3600000, // 1 hour duration
            });

            //Send cookie with refreshToken
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,  // In production set to "true"
                sameSite: 'lax',
                maxAge: 604800000, // 7 days
            });

            //Set userData to save in sessionStorage
            const userData = {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email
            }

            //Final response
            res.status(200).json({ verified: true, user: userData });

        } catch (error) {
            next(error);
        }
    },

    verifyAccessToken: async (req, res, next) => {
        try {
            //Taking userData from req.user
            const userData = {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email
            }

            //Final response
            res.status(200).json({ verified: true, user: userData });

        } catch (error) {
            next(error)
        }
    },

    newAccessToken: async (req, res, next) => {
        try {
            //Taking userData from req.user
            const userData = {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email
            }

            //Taking new accessToken from req.user
            const accessToken = req.user.accessToken;

            //Faltan COSAS!!!!!!!!!!!!!!!!!!

            //Send cookie with new accessToken
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,  // In production set to "true"
                sameSite: 'lax',
                maxAge: 3600000, // 1 hour duration
            });

            //Final response
            res.status(200).json({ verified: true, user: userData });

        } catch (error) {
            next(error)
        }
    },

    clearCookies: async (req, res, next) => {
        try {
            //Clearing all tokens
            res.clearCookie("accessToken", { path: "/" });
            res.clearCookie("refreshToken", { path: "/" });

            //Final response
            res.status(200).json({title: "Sesión cerrada", message: 'Has cerrado sesión con tu cuenta. Nos vemos pronto.'});

        } catch (error) {
            next(error);
        }
        
    },

    passwordRecoverEmail: async (req, res, next) => {
        try {
            //Taking data from req.user
            const {id, username, email} = req.user;

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/auth/confirm-password-recover?id=${id}&username=${username}&email=${email}`

            //Setting up confirmation email
            const newEmail = new Email({
                to: email,
                subject: 'Recupera tu contraseña',
                html: EmailViews.recoverPassword(confirmationUrl, username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Final response
            return res.status(200).json({
                title: '¡EMAIL ENVIADO!',
                message: `Te hemos enviado un email para reestablecer tu contraseña. Por favor, revisa tu correo y sigue el enlace.`
            });

        } catch (error) {
            next(error);
        }
    },

    confirmPasswordRecover: async (req, res, next) => {
        try {
            //Taking data from req.query
            const {email, username, id} = req.query;

            //Generating token
            const generatedToken = await token.generate({ email, username, id }, '300s');

            //Checking if user has confirmed
            const isConfirmed = await musicianService.checkConfirmed(username, 'recoverPassword');
            
            //If is hasn´t confirmed, set is_confirmed to "true"
            if (!isConfirmed) {
                await musicianService.updateIsConfirmed(username, 'recoverPassword')
            }

            //Send recoverPassToken to cookies
            res.cookie('recoverPassToken', generatedToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 604800000, // 7 days
            });

            //Final response - redirect to front
            return res.status(303).redirect(`http://localhost:5173/login?success=true&type=recoverPassword&username=${username}`);

        } catch (error) {
            next(error);
        }
    },

    recoverPassword: async (req, res, next) =>{
        try {
            //Collecting necessary data
            const {id, username, email} = req.user;
            const newPassword = req.body.password;
        
            //Updating user password
            await musicianService.recoverPassword(newPassword, id, 'recoverPassword');

            //Clearing recoverPasswordToken
            res.clearCookie("recoverPassToken", { path: "/" });

            //Final response
            res.status(200).json({title: 'Contraseña modificada', message: 'Tu contraseña ha sido modificada correctamente. Ya puedes acceder a tu cuenta con ella.'});

        } catch (error) {
            next(error);
        }
    }
}