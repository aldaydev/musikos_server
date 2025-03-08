# musikos_server
### Sprint 5 - 08/03/2025 - Noche - testing with jest


## 5o SPRINT (BACKEND)

### RESUMEN DE OBJETIVOS:

Mi intención en este sprint es tener las funcionalidades mínimas que se piden en el trabajo, para asegurar así cumplir todos los puntos.

1. Realizadas pruebas unitarias con Jest con dos funciones (encryptPassword y validatePassword)

## 4o SPRINT (BACKEND)

### RESUMEN DE OBJETIVOS:

En este sprint mi objetivo principal en el back era crear todos los endpoints para la modificación de datos por partes del usuario en su perfil y cuenta. He implementado solo algunas ya que, debido a la falta de timepo, creo que es mejor priorizar en completar los requisitos que se piden para el trabajo.

1. Enpoint y controlador para "musicians/restricted-data" -> Nos proporciona toda la información del usuario. Para acceder, se debe verificar el token de las cookies ya que devolverá TODA la información del usuario.
2. Enpoint y controlador para "musicians/:username" -> Nos proporciona información pública del usuario (pensado para que el usuario pùeda ver una página más completa de cada múscio, pero probablemente no me de tiempo)
3. Enpoint, controlador y servicios para "musicians/update" -> Nos permite actualizar diferentes datos del usuario. He configurado username, contraseña e email.
4. Pruebas para actualizar imagen -> He intentado implementar la funcionalidad de cambiar la imagen del usuario pero, al estar gastando mucho tiempo en ello, he preferido dejarlo a un lado.
5. Pruebas y configuración inicial de jsDoc para que, llegado el momento, simplemente tenga que poner los comentarios.

## 3er SPRINT (BACKEND)

### RESUMEN DE OBJETIVOS:

He creado los endpoints correspondientes a la búsqueda de músicos. Por una parte tenemos la búsqueda inicial (todos los músicos con paginación) y la búsqueda filtrada. Esto supone varios controladores y acciones en los servicios (busquedas en las bbdd).

1. Creación del router generic.routes.js
   * Alberga las rutas para obtener listado de estilos, instrumentos...
   * Se asocia con generic.controller.js
   * Se asocia con generic.services.js
   * En resumen, todas las acciones para obtener información estática de la BD.
2. Endpoint y controlador '/musicians'
   * Permite obtener un listado completo de músicos.
   * Queda pendiente aplicar paginación. Si da tiempo lo haré.
3. Endpoint y controlador '/musician/search'
   * Permite, a través de query params, filtrar una búsqueda
   * Igualmente queda pendiente paginación si da tiempo
4. Servicios correspondientes (acciones en la bd)
5. Queda pendiente swagger y limpiar código para futuros sprints.

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
   - npmi multer
   - npm i jsdoc
   - npm i jest

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


REQUISITOS DEL TRABAJO:

- Uso de al menos un contexto en React y un custom hook -------- (DONE)
- Elegir entre los dos tipos: Inventario o Aplicación de Librería, Películas, Música o similar. -------- (DONE)
- Uso de JWT. -------- (DONE)
- Debe usar MongoDB, con un mínimo de 2 colecciones, para una parte de los datos y MySQL, con un mínimo de dos tablas, para otra.
- Debe haber un uso correcto de Git y GitHub. -------- (DONE)
- Código comentado. -------- (/DONE)
- Codificación en inglés (variables, contantes, naming...), no necesario para comentarios, pero se deja libre elección en esto. -------- (DONE)
- Se debe usar para documentar: 
   - Swagger -------- (/DONE)
   - JSDoc -------- (/DONE)
   - diagramas de diseño (ER y mínimo un diagrama de Casos de Uso por rol y uno de Secuencia). 
- Uso de JEST (para al menos dos funciones) -------- (/DONE)
- Cypress para una de las vistas -------- (/DONE)
- Selenium para una de las vistas
- Realización de una prueba de carga al login con JMeter (mínimo 50 usuarios haciendo login a la vez)
- Realización de un pdf con la documentación del proyecto, diagramas y descripción breve, extensión mínima 5 páginas.
- Realización de despliegue.
- Entrega en uno o dos enlaces a los repositorios de código y uno o dos enlaces de despliegue.
