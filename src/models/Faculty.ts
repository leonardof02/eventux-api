import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { User } from "./User";

export const Faculty = sequelize.define(
    "Faculty", 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logoUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
);