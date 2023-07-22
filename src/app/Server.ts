import express, { Application } from "express"
import dotenv from "dotenv";
import cors from "cors";

import UserRouter from "../routes/UserRouter";

export default class Server {
    private app: Application;
    private port: string = "3000";

    public constructor() {
        this.app = express();
        this.config();
    }

    // Config server
    public config() {
        dotenv.config();
        this.port = process.env.PORT || "3000";

        this.middlewares();
        this.routes();
    }

    // Run middlewares
    public middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static( "public" ) );
    }

    // Add routes
    public routes() {
        this.app.use( "/users", UserRouter );
    }

    // Run server
    public async run() {
        try {
            this.app.listen( this.port, () => {
                console.log(`🏃 Server running at port :${this.port}` );
            })
        }
        catch( error: any ) {
            console.log(error);
        }
    }
}