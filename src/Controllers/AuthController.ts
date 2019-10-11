import {Response, Request} from 'express';

export class AuthController {
  static login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log({username, password});
    res.send(200);
  }
}
