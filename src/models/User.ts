import { Model, DataTypes, ModelStatic } from "sequelize";
import sequelize from "../config/database";
import { Faculty } from "./Faculty";

export const User = sequelize.define(
    "User",
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
        profileImgUrl: {
            type: DataTypes.STRING
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { timestamps: false }
);