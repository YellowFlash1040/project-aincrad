import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from '../../swagger.json' assert { type: 'json' };

const docsRouter = express.Router();

docsRouter.use('/', swaggerUi.serve);
docsRouter.get('/', swaggerUi.setup(swaggerDocs));

export default docsRouter;
