import { Router } from 'express';

import authController from './auth/auth.controller';

const api = Router().use('/auth', authController);

const routes = Router().use('/api', api);

export default routes;
