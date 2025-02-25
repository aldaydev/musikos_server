export default {
    //Confirmation email html generator
    confirmation: (confirmationUrl, username) => {
        return `
        <div style="padding: 0px 20px 20px 20px; width: 70%; margin: 0 auto">
            <h1 style="text-align: center; margin-bottom: 20px">
                🎸 Bienvenido a Musikos 🎸
            </h1> 
    
            <p style="font-size: 18px; margin-top: 0px">
                Gracias por registrarte en musikos.es donde podrás personalizar tu perfil (${username}) y enseñarle al mundo tus habilidades musicales.
                Estás a punto de poder empezar a conectar con otros músicos y bandas de tu zona. Solo te falta un paso para poder acceder.
            </p>

            <p style="font-size: 18px; margin-top: 0px">
                Necesitamos que confirmes tu cuenta a través del siguiente enlace: 
            </p> 

            <div style="display: flex; justify-content: center">
                <a href=${confirmationUrl} style="font-size: 16px; font-weight: bold; background-color: #E91E63; color: white; display: block; margin: 0 auto; padding: 8px 20px; border-radius: 10px;text-decoration: none;">
                    CONFIRMA TU CUENTA
                </a>
            </div>

            <p style="margin-top: 30px;">*Atención: Este enlace caducará en 10 minutos. Si tras ese tiempo no has confirmado tu cuenta, tendrás que solicitar un nuevo email de confirmación.</p>
            
        </div>
        `
    },

    //Rsend confirmation email html generator
    resendConfirmation: (confirmationUrl, username) => {
        return `
        <div style="padding: 0px 20px 20px 20px; width: 70%; margin: 0 auto">
            <h1 style="text-align: center; margin-bottom: 20px">
                🎸 Confirma tu cuenta 🎸
            </h1> 
    
            <p style="font-size: 18px; margin-top: 0px">
                Nos has pedido que te mandemos un nuevo email de confirmación para tu cuenta (${username}). Aquí lo tienes. 
            </p>

            <p style="font-size: 18px; margin-top: 0px">
                Para poder editar tu perfil y empezar a conectar con otros músicos y bandas de tu zona, solo tienes que confirmar tu cuenta pulsando en el enlace a continuación:
            </p> 

            <div style="display: flex; justify-content: center">
                <a href=${confirmationUrl} style="font-size: 16px; font-weight: bold; background-color: #E91E63; color: white; display: block; margin: 0 auto; padding: 8px 20px; border-radius: 10px;text-decoration: none;">
                    CONFIRMA TU CUENTA
                </a>
            </div>

            <p style="margin-top: 30px;">*Atención: Este enlace caducará en 10 minutos. Si tras ese tiempo no has confirmado tu cuenta, tendrás que solicitar un nuevo email de confirmación.</p>
            
        </div>
        `
    },

    recoverPassword: (confirmationUrl, username) => {
        return `
        <div style="padding: 0px 20px 20px 20px; width: 70%; margin: 0 auto">
            <h1 style="text-align: center; margin-bottom: 20px">
                🔒 Recupera tu contraseña de Musikos 🔒
            </h1> 
    
            <p style="font-size: 18px; margin-top: 0px">
                Nos has indicado que quieres reestablecer la contraseña de tu cuenta (${username}) en musikos.es. 
            </p>

            <p style="font-size: 18px; margin-top: 0px">
                Sigue el enlace a continuación para establecer una nueva contraseña:
            </p> 

            <div style="display: flex; justify-content: center">
                <a href=${confirmationUrl} style="font-size: 16px; font-weight: bold; background-color: #E91E63; color: white; display: block; margin: 0 auto; padding: 8px 20px; border-radius: 10px;text-decoration: none;">
                    REESTABLECER CONTRASEÑA
                </a>
            </div>

            <p style="margin-top: 30px;">*Atención: Este enlace caducará en 5 minutos. Si tras ese tiempo no has confirmado tu cuenta, tendrás que solicitar un nuevo email de confirmación. Si no has solicitado el cambio de contraseña, por favor indícanoslo respondiendo a este email.</p>
            
        </div>
        `
    }
}

