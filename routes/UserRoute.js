import express from "express";
import {
   getUser,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
} from "../controller/Users.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, getUser);
router.get("/user/:id", verifyUser, getUserById);
router.post("/register", createUser);
router.patch("/user/:id", verifyUser, updateUser);
router.delete("/user/:id", verifyUser, deleteUser);

export default router;
