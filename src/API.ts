import { Authenticator } from './auth/Authenticator';

import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from 'tsoa';

import morgan from "morgan";
import { RegisterRoutes } from "../build/routes";
import { EntityRepository } from './repository/EntityRepository';
import { MongoDbConnection } from './db/MongoDbConnection';


dotenv.config();

export const app = express();

export default class API {

    public static entityRepository : EntityRepository = new EntityRepository();

    static init() 
    {
        this.setMiddlewares();
        this.setGlobals();
        
        RegisterRoutes(app); // tsoa router linking...
        app.use(this.errorHandler);

        new MongoDbConnection(); // connect to mongo db
    }

    private static setGlobals() {
        app.set("port", process.env.PORT || 7000);
    }

    private static setMiddlewares() {
        
        // dependencies middlewares
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(bodyParser.json());
        app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => res.send(swaggerUi.generateHTML(await import("../build/swagger.json"))));
        app.use(morgan('dev'));
        
        // app middlewares
        app.use(Authenticator.isAuthenticated);
        // app.use(Authorizator.checkAccess);
    }

    static run() {
        app.listen(app.get("port"), () =>
            console.log(`Example app listening at http://localhost:${app.get("port")}`)
        );
    }

    static errorHandler(
        err : unknown, 
        request : express.Request, 
        response : express.Response, 
        next : express.NextFunction
    ): ExResponse | void {
        if (err instanceof ValidateError) {
            console.warn(`Caught Validation Error for ${request.path}:`, err.fields);
            return response.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
            });
        }
        if (err instanceof Error) {
            return response.status(500).json({
            message: "Internal Server Error",
            });
        }
        
        next();
    }
}