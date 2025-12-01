const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for Task Management System",
    },
    servers: [
      {
        url: "http://localhost:5000", // change for prod
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // fixed absolute path
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
