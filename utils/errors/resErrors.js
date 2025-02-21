export class ResError {
    constructor(message, status = '500' ){
        this.message = message;
        this.status = status;
    }

    //Method to add a resError instance to resErrors object
    add (key){
        resErrors[key] = this;
        return key;
    }
}

export const resErrors = {

    // ---------- STATUS 500 ----------
    
    internalServerError: new ResError(
        'Error interno en el servidor. Inténtalo más tarde.',
        500
    ),

    unexpected: new ResError (
        'Error inesperado en el servidor.',
        500
    ),

    serviceUnavailable: new ResError(
        'El servicio no está disponible en este momento. Inténtalo más tarde.',
        503
    ),

    timeout: new ResError(
        'El servidor tardó demasiado en responder. Inténtalo más tarde.',
        504
    ),

    // ---------- STATUS 400 ----------

    badRequest: new ResError(
        'Solicitud incorrecta. Verifica los datos enviados.',
        400
    ),

    unauthorized: new ResError(
        'No autorizado. Debes iniciar sesión para acceder a este recurso.',
        401
    ),

    forbidden: new ResError(
        'Acceso prohibido. No tienes permisos para realizar esta acción.',
        403
    ),

    notFound: new ResError(
        'El recurso no se encontró. Inténtalo más tarde.',
        404
    ),
}