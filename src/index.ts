import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Router} from "express";
import {Routes} from "./routes";
import * as logger from "morgan";
import * as path from "path";
import {User} from "./entity/User";
import { createExpressServer, useExpressServer } from "routing-controllers";
import { UserControladorVista } from "./controller/UserControladorVista";

createConnection().then(async connection => {

    // create express app
    let app = express();
    
    // setup express app here
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    
    //configure pug
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");
  
    useExpressServer(app,{
        classTransformer:true,
        controllers:[UserControladorVista]
    });


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result)  : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27,
    //     usuario:"usuario1"
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24,
    //     usuario:"usuario2"
    // }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
