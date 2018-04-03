import { Router, Request, Response, NextFunction } from 'express';

import { verifyUser, signin } from '../../modules/auth';

export default class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.post('/login', verifyUser(), this.login);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    signin(req, res, next);
  }
}
