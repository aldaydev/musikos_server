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
        name: "Davinia",
        email: 'tfm.davinia.unir@gmail.com'
      },
    },
    tags: [
      { name: 'Legal', description: 'Operaciones relacionadas con legal' },
      // ... otros tags
    ],
    servers: [
      {
        url: "http://127.0.0.1:3001",
      },
    ],
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