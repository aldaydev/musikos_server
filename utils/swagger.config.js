import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Band Bros - API Documentation",
            version: "1.0.0",
            description: "'Band Bros' Web App API Documentation",
            contact: {
                name: "Rafa Alday",
                email: "aldaydev@gmail.com",
                url: "https://github.com/aldaydev",
            }
        },
        servers: [
            { url: "http://localhost:3001", description: "Servidor local" }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            },
            responses: {
                UnauthorizedError: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            example: { error: "Invalid or expired token" },
                        },
                    },
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "Juan Pérez" },
                        email: { type: "string", example: "juan@example.com" },
                    },
                },
            },
        }
    },
    apis: [path.join(__dirname, "../routes/routes.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
