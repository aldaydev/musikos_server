# bandbros_server
### Spring 1 - 26/01/2025 - Noche - SignUp / Model

Dependencias:

npm instal --save-dev nodemon
npm i express
npm i cors
npm i sequelize
npm i mysql2
npm i jsonwebtoken
npm i nodemailer
npm i dotenv (PENDIENTE)


MUSICIAN:
 - Atributos:
    //DATOS NECESARIOS PARA CREAR LA CUENTA
    * username <>
    * email <>
    * pass <>
    //DATOS QUE SE COMPLETAN DESPUÉS DE CREAR LA CUENTA
    * imagen <>
    * firstname <>
    * lastname <>
    * slogan <>
    * descripcion <>
    * web <>
    * instagram <>
    * youtube <>
    * tiktok <>
 - Primary key:
    * id <>
 - Foreign Keys:
    * Instrumentos
    * estilos
    * Ciudad

1er SPRINT

- Crear esqueleto del backend
- Crear funcionalidad de signUp
    * Request - Post - email, username, pass
    * Protección de contraseña con bcrypt
    * Email de confirmación (con token)
    * Primer signIn a través del email
