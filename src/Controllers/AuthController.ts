import {Response, Request} from 'express';
import User from '../Entity/User';
import * as crypto from 'crypto';
import { Hash } from 'crypto';

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username }})

    const hash: Hash = crypto.createHash('sha256');
    const hashedPassword: string = hash.update(password).digest('hex');

    const result = crypto.timingSafeEqual(Buffer.from(user.password), Buffer.from(hashedPassword))

    if(result){
      return res.status(200).send({ok: true});
    }
    return res.status(500).send({ok: false});
  }
}
