import express, { Application } from "express";
import cors from "cors";

import UserRouter from "../routes/UserRouter";
import FacultyRouter from "../routes/FacultyRouter";
import connection from "../config/database";
import dotenv from "dotenv";

import "../models/associations";
import EventRouter from "../routes/EventRouter";
import AuthRouter from "../routes/AuthRouter";

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
        this.app.use("/faculties", FacultyRouter);
        this.app.use("/events", EventRouter);

        this.app.use("/auth", AuthRouter);
    }

    public async connectDB() {
        try {
            await connection.authenticate({});
            await connection.sync({alter: true});
            console.log(`🔁 All tables are sync!`);
            console.log(`✅ ${connection.getDatabaseName() } connected!`);
        } catch (error: any) {
            console.log(error);
        }
    }

    // Run server
    public async run() {
        await this.connectDB();
        this.app.listen(this.port, () => {
            console.log(`🏃 Server running at http://localhost:${ this.port }`);
        });
    }
}
