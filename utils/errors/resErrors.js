// const setError = (key, message, status, type) => {
//     errors[key] = {
//         message: message,
//         status: status,
//         type: type
//     }

//     return {code: key};
// }


const resErrors = {

    // ---------- STATUS 500 ----------
    
    unexpected: {
        message: 'Error inesperado al procesar la solicitud. Intétalo más tarde',
        status: 500,
        type: 'interno'
    },

    database: {
        message: 'Error al cargar el recurso. Inténtalo más tarde',
        status: 500,
        type: 'interno',
    },

    validation: {
        message: 'Los datos proporcionados no son válidos. Por favor, revisa la información enviada',
        status: 400,
        type: 'interno',
    },

    // ---------- STATUS 400 ----------

    notFound: {
        message: 'El recurso no se encontró. Inténtalo más tarde',
        status: 404,
        type: 'interno'
    },

    //--------- CURSTOM ----------

    notFoundTerms: {
        message: 'Fallo al obtener los términos y condiciones de servicio. Inténtalo más tarde',
        status: 404,
        type: 'interno'
    },

    notFoundPrivacy: {
        message: 'Fallo al obtener la política de privacidad. Inténtalo más tarde',
        status: 404,
        type: 'interno',
    },

    emailFailed: {
        message: 'No se ha podido enviar el email de confirmación. Inténtalo más tarde',
        status: 500,
        type: 'interno'
    },

    tokenExpired: {
        message: 'El enlace de confirmación ha expirado. Vuelve a registrarte para obtener uno nuevo',
        status: 410,
        type: 'del cliente'
    },

    tokenIncorrect: {
        message: 'El enlace de confirmación ha expirado. Vuelve a registrarte para obtener uno nuevo',
        status: 410,
        type: 'del cliente'
    },

}

export default resErrors;