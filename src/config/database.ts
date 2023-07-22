import { DataSource } from "typeorm";

// Database connection settings
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "eventuxdb",
    synchronize: true,
    migrationsTableName: "migrations",
    entities: [
        "src/models/User",
        "src/models/Faculty"
    ]
});

export default AppDataSource;