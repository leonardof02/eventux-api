import { DataSource } from "typeorm";

// Database connection settings
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "eventuxdb"
});

export default AppDataSource;