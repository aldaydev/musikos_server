export class ResError {
    constructor(message, status = '500', type = 'interno', ){
        this.message = message;
        this.status = status;
        this.type = type;
    }

    add (key){
        resErrors[key] = this;
        return {code: key};
    }
}

export const resErrors = {

    // ---------- STATUS 500 ----------
    
    unexpected: new ResError (
        'Error inesperado en el servidor',
        500,
        'interno'
        
    ),

    database: new ResError (
        'Error al cargar el recurso. Inténtalo más tarde',
        500,
        'interno'
    ),

    validation: new ResError (
        'Error en la validación de los datos. Inténtalo más tarde',
        500,
        'interno'
    ),

    // ---------- STATUS 400 ----------

    notFound: new ResError(
        'El recurso no se encontró. Inténtalo más tarde',
        404,
        'interno'
    ),
}

// EJEMPLO DE CÓMO LANZAR PERSONALIZADOS

// throw new ResError (
//     'Fallo al obtener los términos y condiciones de servicio. Inténtalo más tarde',
//     404,
// ).add('notFoundTerms');