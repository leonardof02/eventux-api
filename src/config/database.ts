import { Sequelize } from "sequelize";

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;

const DBConnection = new Sequelize({
    host,
    database: "eventuxdb",
    dialect: "postgres",
    username: "postgres",
    password: "",
    logging: false,
    port: 5432,
})

export default DBConnection;
