import {Express} from 'express';
import {UserController} from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';
import bodyParser = require('body-parser');
import PostController from '../Controllers/PostController';
import {HashService} from "../Services/HashService";

class Router {

    private express :Express;

    constructor(express:Express){
        this.express = express;
    }

    public up(){
        this.userRoutes()

    }

    private userRoutes(){
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());

        const authController: AuthController = new AuthController(new HashService());

        this.express.post('/login', authController.login);
        this.express.post('/register', authController.register);

        this.express.get('/user/:id', UserController.show);
        this.express.post('/user/:id', UserController.update);

        this.express.get('/posts', PostController.all);
    }
}

export default Router;
