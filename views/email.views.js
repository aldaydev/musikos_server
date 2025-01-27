class EmailViews {
    confirmation (confirmationUrl, username) {
        const html = `
        <div style="padding: 0px 20px 20px 20px; width: 70%; margin: 0 auto">
            <h1 style="text-align: center; margin-bottom: 20px">
                🎸 Bienvenido a BandBros 🎸
            </h1> 
    
            <p style="font-size: 18px; margin-top: 0px">
                Hola ${username}. Solo te falta un paso para poder editar tu perfil de músico y disfrutar de todas las funcionalidades de bandbros.
            </p>

            <p style="font-size: 18px; margin-top: 0px">
                Necesitamos que confirmes tu cuenta a través del siguiente enlace: 
            </p> 

            <div style="display: flex; justify-content: center">
                <a href=${confirmationUrl} style="font-size: 16px; background-color: orange; display: block; margin: 0 auto; padding: 8px 20px; border-radius: 10px;text-decoration: none;">
                    ENLACE DE CONFIRMACIÓN
                </a>
            </div>

            <p>*Este enlace caducará en unos 10 minutos. Si tras ese tiempo no has confirmado tu cuenta, deberás volver a registrarte en la web</p>
            
        </div>
        `
        return html;
    } 
}

export default new EmailViews;

