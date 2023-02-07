import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProduct = async (req, res) => {
   try {
      let response;

      response = await Products.findAll();

      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};

export const getProductById = async (req, res) => {
   try {
      const product = await Products.findOne({
         where: {
            id: req.params.id,
         },
      });
      if (!product) return res.status(404).json({ msg: "Product not found" });

      let response;
      if (req.role === "admin") {
         response = await Products.findOne({
            where: {
               id: product.id,
            },
            include: [
               {
                  model: Users,
               },
            ],
         });
      } else {
         response = await Products.findOne({
            where: {
               [Op.and]: [{ id: product.id }, { userId: req.userId }],
            },
            include: [
               {
                  model: Users,
               },
            ],
         });
      }
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};

export const createProduct = async (req, res) => {
   const { nama, alamat, telpon, harga1, harga2, total } = req.body;
   try {
      await Products.create({
         nama: nama,
         alamat: alamat,
         telpon: telpon,
         harga1: harga1,
         harga2: harga2,
         total: total,
      });
      res.status(201).json({ msg: "Product created successfully" });
   } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {
   const product = await Products.findOne({
      where: { id: req.params.id },
   });
   if (!product) return res.status(404).json({ msg: "User not found" });

   try {
      await Products.destroy({
         where: {
            id: product.id,
         },
      });
      res.status(201).json({ msg: "user deleted" });
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
};
