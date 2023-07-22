import { Faculty } from "./Faculty";
import { User } from "./User";
import { Event } from "./Event";

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

User.hasMany( Event, {
    foreignKey: {
        name: "userId",
    }
});

Event.belongsTo( User, {
    foreignKey: {
        name: "userId",
    }
})

