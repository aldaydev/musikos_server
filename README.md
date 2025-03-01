# musikos_server
### Sprint 3 - 01/03/2025 - Madrugada - get regions endpoint

## 2o SPRINT (BACKEND)

### RESUMEN DE OBJETIVOS:

He trabajado toda la parte referente al signin, así como la recuperación de la contraseña. He creado el sistema de tokens que tendrá la app (con un accesToken y un resrehToken). He reorganizado los endpoints para que tanto signup como signin se accedan con "/auth" y tengan su router y controlador como "auth".

1. Endpoint, controlador y middlewares para "/auth/signin".
   (Acceder a cuenta)
2. Endpoint, controlador y middlewares para "/auth/verify-access-token". 
   (Verificar el accesstoken al iniciar la app o solicitar rutas protegidas)
3. Endpoint, controlador y middlewares para "/new-access-token".
   (Generar un nuevo accesToken a través del refreshToken)
4. Endpoint y controlador para  "/clear-cookies". 
   (Cerrar sesión)
5. Endpoint, controlador y middlewares para "/password-recover-email".
   (Enviar email para recuperar y cambiar contraseña)
6. Endpoint y controlador para "/confirm-password-recover".
   (Generar recoverPassToken al pulsar el enlace del email)
7. Endpoint, controlador y middlewares para "/password-recover".
   (Cambiar la contraseña)
8. Actualización de swagger con los nuevos endpoints.
9. Pruebas de seguridad y manejo de errores


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


------------ NOTAS ------------

Pruebas de seguridad y manejo de errores:

1. Proceso de signUp:
- Si el usuario no introduce correctamente los datos
- Si el email o username ya pertenecen a una cuenta
- Si un usuario se registra y expira el enlace de confirmación
- Si un usuario pulsa el enlace de confirmación una vez ya confirmado
- Si el usuario pulsa el enlace de confirmación y ya está logeado en una pestaña
- Si un usuario se registra exitosamente
- Si los datos requeridos en req.body, req.params o req.query no existen o son incorrectos
- Si hay cualquier problema interno

2. Proceso de reenvio de email de confirmación:
- Si el usuario solicita un nuevo enlace de confirmación
- Si el usuario ya estaba confirmado (muy poco probable)(tendría que poner a mano los query)
- Si el usuario ya lo ha solicitado y aún no ha expirado
- Si el reenvio y lconsfirmación exitosos
- Si los datos requeridos en req.body, req.params o req.query no existen o son incorrectos
- Si hay cualquier problema interno

3. Proceso de signin:
- Si los datos introducidos no pertenecen a ningún usuario
- Si los datos requeridos en req.body no existen o son incorrectos
- Si el usuario accede exitosamente
- Si hay cualquier problema interno

4. Proceso de recuperación de contraseña:
- Si el email o username no coincide con el de ningún usuario
- Si el usuario intenta solicitar recuperación teniendo un email aún no expirado
- Si la contraseña introducida no tiene el formato correcto
- Si se renueva la contraseña exitosamente
- Si los datos requeridos en req.body, req.params o req.query no existen o son incorrectos
- Si hay cualquier problema interno

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

