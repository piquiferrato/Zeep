import {Express} from 'express';
import {UserController} from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';
import bodyParser = require('body-parser');
import PostController from '../Controllers/PostController';
import {inject} from "inversify";
import {AuthenticateMiddleware} from "../Middlewares/AuthenticateMiddleware";

class Router {

    private express :Express;
    private authController: AuthController;
    private authMiddleware: AuthenticateMiddleware;

    constructor(
        express:Express,
        @inject(AuthController) authController: AuthController,
        @inject(AuthenticateMiddleware) authMiddleware: AuthenticateMiddleware
    ) {
        this.express = express;
        this.authController = authController;
        this.authMiddleware = authMiddleware;
    }

    public up(){
        this.userRoutes()

    }

    private userRoutes(){
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());

        this.express.post('/login', this.authController.login);
        this.express.post('/register', this.authController.register);

        this.express.get('/user/:id', UserController.show);
        this.express.post('/user/:id', UserController.update);

        this.express.get('/posts', PostController.all);
    }
}

export default Router;
