const errors = {

    // ---------- STATUS 500 ----------
    
    unexpected: {
        origin: 'unexpected',
        type: 'interno',
        message: 'Error inesperado en el servidor',
        status: 500
    },

    database: {
        origin: 'database',
        type: 'interno',
        message: 'Error al cargar el recurso. Inténtalo más tarde',
        status: 500
    },

    validation: {
        origin: 'server',
        type: 'interno', 
        message: 'Error en la validación de los datos. Inténtalo más tarde',
        status: 500
    },

    // ---------- STATUS 400 ----------

    notFound: {
        origin: 'database',
        type: 'interno',
        message: 'El recurso no se encontró. Inténtalo más tarde',
        status: 404
    },

    //--------- CURSTOM LEGALS ----------

    notFoundTerms: {
        origin: 'database',
        type: 'interno',
        message: 'Fallo al obtener los términos y condiciones de servicio. Inténtalo más tarde',
        status: 404
    },

    notFoundPrivacy: {
        origin: 'database',
        type: 'interno',
        message: 'Fallo al obtener la política de privacidad. Inténtalo más tarde',
        status: 404
    }

}

export default errors;