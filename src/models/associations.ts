import { Faculty } from "./Faculty";
import { User } from "./User";

Faculty.hasMany( User, {
    foreignKey: {
        name: "facultyId",
    }
});

User.belongsTo( Faculty, {
    foreignKey: {
        name: "facultyId",
    }
});