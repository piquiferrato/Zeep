import express, {Request, Response, Express} from 'express';
import bodyParser = require('body-parser');
import {UserController} from '../Controllers/UserController';
import { AuthController } from '../Controllers/AuthController';

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

        this.express.post('/user', UserController.store);
        this.express.get('/user/:id', UserController.show);

        this.express.get('/login', AuthController.login)
    }



}

export default Router;