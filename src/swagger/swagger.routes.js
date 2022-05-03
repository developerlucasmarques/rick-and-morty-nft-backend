import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

export const swaggerRouter = express.Router();

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));
