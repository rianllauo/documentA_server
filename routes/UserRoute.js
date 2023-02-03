import express from "express";
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controller/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUser);
router.get("/user/:id", verifyUser, getUserById);
router.post("/user", createUser);
router.patch("/user/:id", verifyUser, updateUser);
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
