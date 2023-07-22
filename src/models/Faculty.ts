import { Model, DataTypes } from "sequelize";
import connection from "../config/database";

class Faculty extends Model {}

Faculty.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logoUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: connection, 
        modelName: "Faculty",
        timestamps: false
    }
);

export default Faculty;