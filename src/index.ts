import express, {Request, Response, Express} from 'express';
var app : Express = express();

app.get('/', function(req: Request, res: Response) {
    res.send('Hello world');
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});