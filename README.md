# bandbros_server
### Spring 1 - 31/01/2025 - Madrugada - just testing

Dependencias:

npm instal --save-dev nodemon
npm i express
npm i cors
npm i sequelize
npm i mysql2
npm i jsonwebtoken
npm i nodemailer
npm i bcrypt
npm i mongoose
npm i dotenv (PENDIENTE)


MUSICIAN:
 - Atributos:
    //DATOS NECESARIOS PARA CREAR LA CUENTA
    * username <>
    * email <>
    * pass <>
    * accepted_terms_at
    * accepted_privacy_at
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
 - Foreign Keys (associations in sequelize)
    * Instrumentos
    * Estilos
    * Región

##1er SPRINT

- Crear esqueleto del backend
   * Estructuración de carpetas y archivos inciales
   * Creación de server.js -> node, middlewares globales, conexión a BDs

- Crear estructura mySQL
   * Creación de fichero de conexión a MySQL
   * Creación de modelo "Musician"
   * Creación de modelo "Style"
   * Creación de modelo "Instrument"
   * Creación de modelo intermedio "Musician_Style"
   * Creación de modelo intermedio "Musician_Instrument"
   * Creación de asociaciones entre tablas
   * Creación de "seeds" para tablas estáticas (solo para desarrollo)

- Crear estructura MongoDB
   * Creación de fichero de conexión a MongoDB
   * Creación de schemas y modelos "terms" y "privacy" (Legal)
   * Creación de "seeds" para tablas estáticas (solo para desarrollo)

- Crear endpoint "/signup"
   * Request - Post - email, username, pass
   * Validación de email, username y pass (Middleware 1)
   * Verificar si ya existe email y/o username (Middleware 2)
   * Protección de contraseña con bcrypt (Middleware 3)
   * Generación de token con jwt
   * Generación de enlace al endpoint de confirmación (con token en params)
   * Email de confirmación con nodemailer
   
- Crear endpoint "/signup-confirm"
   * Verificar token (obtenido de params)
   * Recopilar email, username y pass (obtenidos del token)
   * Crear usuario en la bd de mySQL (con sequelize)
   * Redirigir a la sección de login del front (con query string?) - Pendiente

- Crear endpoint LOPD
   * Busca el documento "privacy" en la colección "legals"
   * Devuelve html con clases al front

- Crear endpoint Condiciones
   * Busca el documento "terms" en la colección "legals"
   * Devuelve html con clases al front