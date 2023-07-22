import { DataTypes } from "sequelize"
import sequelize from "../config/database";

export const Event = sequelize.define("Event", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    imgUrl: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
    },
    attachedFileUrl: {
        type: DataTypes.STRING,
    }
});