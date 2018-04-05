import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

import config from '../../../config';

export default class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.post('/login', this.login);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).send('You need a username and password');
      }

      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
      });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        config.secrets.JWT_SECRET,
        {
          expiresIn: config.expireTime
        }
      );
      return res.json({ token });
    })(req, res);
  }
}
