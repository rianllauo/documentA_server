import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
   "product",
   {
      uuid: {
         type: DataTypes.STRING,
         defaultValue: DataTypes.UUIDV4,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      nama: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
            len: [3, 100],
         },
      },
      alamat: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
            len: [3, 100],
         },
      },
      telpon: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true,
            len: [3, 100],
         },
      },
      harga1: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      harga2: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      total: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      //   userId: {
      //      type: DataTypes.INTEGER,
      //      allowNull: false,
      //      validate: {
      //         notEmpty: true,
      //      },
      //   },
   },
   {
      freezeTableName: true,
   }
);

// Users.hasMany(Products);
// Products.belongsTo(Users, { foreignKey: "userId" });

export default Products;
