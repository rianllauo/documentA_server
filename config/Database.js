import { Sequelize } from "sequelize";

const db = new Sequelize("task_angga", "root", "", {
   host: "localhost",
   dialect: "mysql",
});

export default db;
