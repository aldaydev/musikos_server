import resErrors from "../utils/errors/resErrors.js";

export default (err, req, res, next) => {
    console.error(err); // Log del error en la consola

    if(err.redirect){
        res.status(err.status).redirect(`http://localhost:5173${err.redirect}`);
    }else{
        const errorResponse = resErrors[err.code] || resErrors.unexpected;
    res.status(errorResponse.status).json(errorResponse);
    }
}