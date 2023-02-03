import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProduct = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Products.findAll({
                attributes: ["uuid", "name", "price", "userId"],
                include: [
                    {
                        attributes: ["uuid", "name", "email", "role"],
                        model: Users,
                    },
                ],
            });
        } else {
            response = await Products.findAll({
                where: {
                    userId: req.userId,
                },
                attributes: ["uuid", "name", "price", "userId"],
                include: [
                    {
                        attributes: ["uuid", "name", "email", "role"],
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

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id,
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
    const { name, price } = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId,
        });
        res.status(201).json({ msg: "Product created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
