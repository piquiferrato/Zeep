import {Express,Request,Response} from 'express';
import {UserController} from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';
import bodyParser = require('body-parser');
import PostController from '../Controllers/PostController';
import {inject} from "inversify";
import {AuthenticateMiddleware} from "../Middlewares/AuthenticateMiddleware";
import { NextFunction } from 'connect';
import container from '../../inversify.config';
import { ErrorHandler } from '../utils/ErrorHandler';

class Router {

    private express :Express;
    private authController: AuthController;
    private authMiddleware: AuthenticateMiddleware;
    private userController : UserController;
    private postController : PostController;

    constructor(
        express:Express,
        @inject(AuthController) authController: AuthController,
        @inject(AuthenticateMiddleware) authMiddleware: AuthenticateMiddleware,
        @inject(UserController) userController : UserController,
        @inject(PostController) postController : PostController
    ) {
        this.express = express;
        this.authController = authController;
        this.authMiddleware = authMiddleware;
        this.userController = userController;
        this.postController = postController;
    }

    public up(){
        this.userRoutes()

    }

    private userRoutes(){
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());

        this.express.use((err : Error, req : Request, res : Response, next : NextFunction)=>{
            const errorHandler : ErrorHandler = container.get(ErrorHandler);

        this.express.post('/login', this.authController.login);
        this.express.post('/register', this.authController.register);

        this.express.get('/user/:id', this.userController.show);
        this.express.post('/user/:id', this.userController.update);
        this.express.use('/posts', this.authMiddleware.redirectIfNotAuthenticate);
        this.express.get('/posts', PostController.all);
    }
}

export default Router;
