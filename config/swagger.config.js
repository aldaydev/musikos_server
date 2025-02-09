import swaggerJsDoc from "swagger-jsdoc";
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const legalsSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/legals.yaml'));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Training Pro - API Documentación",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
      contact: {
        name: "Rafa Alday",
        email: 'aldaydev@gmail.com'
      },
    },
    tags: [
      { name: 'Legal', description: 'Operaciones relacionadas con terminos de uso y política de privacidad' },
      // ... otros tags
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
            type: {
              type: "string",
              example: "interno",
            },
            message: {
              type: "string",
              example: "Error inesperado en el servidor",
            },
          },
        },
      },
      responses: {
        UnexpectedError: {
          description: "Error inesperado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
              example: {
                type: "interno",
                message: "Error inesperado en el servidor"
              }
            },
          },
        },
        InternalServerError: {
          description: "Error inesperado en el servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              },
            },
          },
        },
        // Puedes seguir agregando más respuestas globales
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
    },
  },
});

export default swaggerDocs;