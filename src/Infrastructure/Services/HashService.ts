import * as crypto from 'crypto';
import {IHashService} from "./IHashService";
import {injectable} from "inversify";

@injectable()
export class HashService implements IHashService{
    public safeCompare(a: any, b: any) {
        return crypto.timingSafeEqual(new Buffer(a), new Buffer(b));
    }
    public make(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}