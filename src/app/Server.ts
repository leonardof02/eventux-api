import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import UserRouter from "../routes/UserRouter";
import FacultyRouter from "../routes/FacultyRouter";
import AppDataSource from "../config/database";

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
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    // Add routes
    public routes() {
        this.app.use("/users", UserRouter);
        this.app.use("/facultys", FacultyRouter);
    }

    // Run server
    public async run() {
        try {
            await AppDataSource.initialize();
            console.log(`🗄️  Database ${ AppDataSource.options.type } running!`);
            console.log(`✅ ${ AppDataSource.options.database } connected!`);
            this.app.listen( this.port, () => {
                console.log(`🏃 Server running at port:${this.port}` );
            })
        }
        catch( error: any ) {
            console.log(error);
        }
    }
}
