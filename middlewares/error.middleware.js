import errors from "../utils/errors.js";

export default (err, req, res, next) => {
    console.error(err); // Log del error en la consola

    const errorResponse = errors[err.code] || errors.unexpected;
    res.status(errorResponse.status).json(errorResponse);
}