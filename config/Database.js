import { Sequelize } from "sequelize";

const db = new Sequelize("my_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
