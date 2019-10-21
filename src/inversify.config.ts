import { Container } from "inversify";
import TYPES from "./types";
import {IHashService} from "./Infrastructure/Services/IHashService";
import {HashService} from "./Infrastructure/Services/HashService";
import {AuthController} from "./Infrastructure/Controllers/AuthController";
import CurrentUserService from "./Infrastructure/Services/CurrentUserService";
import {AuthenticateMiddleware} from "./Infrastructure/Middlewares/AuthenticateMiddleware";
import {ErrorHandler} from "./Infrastructure/utils/ErrorHandler";

var container = new Container();

// Controllers
container.bind<AuthController>(AuthController).toSelf();

// Services
container.bind<IHashService>(TYPES.IHashService).to(HashService);
container.bind<CurrentUserService>(CurrentUserService).toSelf();
container.bind<AuthenticateMiddleware>(AuthenticateMiddleware).toSelf();
container.bind<ErrorHandler>(ErrorHandler).toSelf();

export default container;