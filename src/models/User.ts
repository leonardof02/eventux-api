import { Model, DataTypes } from "sequelize";
import connection from "../config/database";

class User extends Model {}

User.init(
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        facultyId: {
            type: DataTypes.BIGINT,
        },
        profileImgUrl: {
            type: DataTypes.STRING,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize: connection, 
        modelName: "User",
        timestamps: false
    }
);

export default User;