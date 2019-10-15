import express, {Express} from 'express';
import Router from './Router/Router'
import "reflect-metadata";
import {createConnectionDB} from './DataBase/Configuration'
import * as dotenv from 'dotenv';

class App {

    private express :Express;
    private router: Router;

    constructor(){
        dotenv.config();
        this.express = express();
        createConnectionDB()
        this.router = new Router(this.express);
    }

    public run(){
        this.upServer();
        this.router.up();
    }

    private upServer(){
        const {PORT} = process.env
        this.express.listen(PORT, function(){
            console.log(`Server is run in port ${PORT}`);
        });
    }

}

const app = new App()
app.run()