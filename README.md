# musikos_server
### Sprint 2 - 26/02/2025 - Tarde - refactoring code and adding some future archives

## 1er SPRINT (BACKEND)

### RESUMEN DE OBJETIVOS:

He trabajado intensamente en todo el diseño inicial del backend, realizando solo una funcionalidad (signUp). Aunque me ha llevado tiempo, todo lo dispuesto en este sprint agilizará mucho el trabajo en los siguientes.

1. Diseño del backend (directorios, middlewares, conexiones...).
2. Diseño de la estructura de datos (sequelize y mongoose).
3. Funcionalidad de signUp sincronizada con frontend.
4. Configuración de nodemailer.
5. Diseño de la clase Email y sus métodos.
6. Diseño de la clase resError, sus métodos y el objeto resErrors.
7. Configuración de winston.
8. Diseño de la clase logError, sus métodos y el objeto logErrors.
9. Configuración de swagger.
10. Configuración de variables de entorno (dotenv).
11. Configuración de jwt y bcrypt.

Dependencias:

   - npm instal --save-dev nodemon
   - npm i express
   - npm i cors
   - npm i sequelize
   - npm i mysql2
   - npm i jsonwebtoken
   - npm i nodemailer
   - npm i bcrypt
   - npm i mongoose
   - npm i swagger-ui-express swagger-jsdoc
   - npm i dotenv
   - npm i winston
   - npm i path
   - npm i yamljs
   - npm i cookie-parser

------------ NOTAS ------------

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


VALIDACIÓN DEL USERNAME

1. Debe tener entre 3 y 30 caracteres
2. Solo puede contener minúsculas (a-z), números (0-9), guion (-) y guion bajo (_)
3. No puede empezar ni terminar con _ o - 
4. No puede tener dos guiones (--) o dos guiones bajos (__) seguidos

VALIDACIÓN PASS

1. Una letra minúscula (a-z)
2. Una letra mayúscula (A-Z)
3. Un número (0-9)
4. Un carácter especial (@$!-_%*?&)
5. Mínimo 8 caracteres de longitud

VALIDACIÓN EMAIL

1. Evita puntos consecutivos (..) en la parte local del email.
2. La parte local (antes del @) puede contener letras, números y caracteres especiales permitidos: ._%+-, y debe tener entre 1 y 64 caracteres.
3. El dominio debe ser alfanumérico y puede incluir . y -, pero no puede comenzar ni terminar con esos caracteres.
4. Debe tener un TLD (por ejemplo, .com, .org) de al menos 2 letras.
5. Debe tener un @ y un punto . entre el dominio y el TLD.
6. Asegura que no haya caracteres extra al final del string.



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

