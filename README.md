# bandbros_server
### Spring 1 - 27/01/2025 - Noche - Nodemailer operativo

Dependencias:

npm instal --save-dev nodemon
npm i express
npm i cors
npm i sequelize
npm i mysql2
npm i jsonwebtoken
npm i nodemailer
npm i bcrypt
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
   * Estructuración de carpetas y archivos inciales
   * Creación de server.js -> node, middlewares, conexión a BD
   * Creación de modelo "Musicians"

- Crear endpoint "/signup"
   * Request - Post - email, username, pass
   * Validación de email, username y pass
   * Protección de contraseña con bcrypt
   * Generación de token con jwt
   * Email de confirmación con nodemailer
   * Enlace al endpoint de confirmación (con token en params)

- Crear endpoint "/signup-confirm"
   * Verificar token (obtenido de params)
   * Recopilar email, username y pass (obtenidos del token)
   * Crear usuario en la bd de mySQL (con sequelize)
   * Redirigin a la sección de login del front