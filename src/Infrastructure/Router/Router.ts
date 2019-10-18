import express, {Request, Response, Express} from 'express';
import {UserController} from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';
import bodyParser = require('body-parser');
import PostController from '../Controllers/PostController';

class Router {

    private express :Express;

    constructor(express:Express){
        this.express = express;
    }

    public up(){
        this.userRouts()
    }

    private userRouts(){
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());

        this.express.post('/login', AuthController.login);

        this.express.post('/user', UserController.store);
        this.express.get('/user/:id', UserController.show);
        this.express.post('/user/:id', UserController.update);

        this.express.get('/posts', PostController.all);
    }
}

export default Router;
