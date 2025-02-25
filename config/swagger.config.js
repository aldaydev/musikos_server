import swaggerJsDoc from "swagger-jsdoc";
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

//Get the absolute path of the current file
const __filename = fileURLToPath(import.meta.url);
//Absolute path of the directory where the current file is
const __dirname = path.dirname(__filename);

//Loading YAML files
const legalsSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/legals.yaml'));
const musiciansSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/musicians.yaml'));
const authSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/auth.yaml'));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Musikos - API Documentation",
      version: "1.0.0",
      description: "Musikos API Documentation with Swagger",
      contact: {
        name: "Rafa Alday",
        email: 'aldaydev@gmail.com'
      },
    },
    tags: [
      { name: 'Legal', description: 'Operations related to terms of use and privacy policy' },
      { name: 'Musicians', description: 'Operations related to the "musicians" model' },
      { name: 'Auth', description: 'Operations related to authentication actions' },
      // ... more tags
    ],
    servers: [
      {
        url: "http://127.0.0.1:3001",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Error interno en el servidor. Inténtalo más tarde",
            },
            status: {
              type: "integer",
              example: 500,
            }
          },
        },
      },
      responses: {
        internalServerError: {
          description: "Internal Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              }
            }
          }
        },
        badRequest: {
          description: "Bad Request Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                message: "Solicitud incorrecta. Verifica los datos enviados.",
                status: 400
              }
            },
          },
        }
        //More global responses...
      }
    },
  },
  apis: ["../docs/swagger/*.yaml"],
};

const swaggerDocs = swaggerJsDoc({
  ...swaggerOptions,
  definition: {
    ...swaggerOptions.definition,
    paths: {
      ...legalsSwagger.paths,
      ...musiciansSwagger.paths,
      ...authSwagger.paths,
    },
  },
});

export default swaggerDocs;