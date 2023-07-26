// const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const YAML = require('yaml');

const file = fs.readFileSync('./api-docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

module.exports.swaggerDocs = swaggerDocument;
