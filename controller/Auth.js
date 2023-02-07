import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
   const user = await Users.findOne({
      where: { name: req.body.name },
   });
   if (!user) return res.status(404).json({ msg: "User not found" });

   const match = await argon2.verify(user.password, req.body.password);
   if (!match) return res.status(400).json({ msg: "wrong password" });
   req.session.userId = user.uuid;
   const uuid = user.uuid;
   const name = user.name;
   res.status(200).json({ uuid, name });
};

export const Me = async (req, res) => {
   if (!req.session.userId) {
      return res.status(401).json({ msg: "You must be logged in" });
   }

   const user = await Users.findOne({
      where: { uuid: req.session.userId },
      attributes: ["uuid", "name"],
   });
   if (!user) return res.status(404).json({ msg: "User not found" });
   res.status(200).json(user);
};

export const LogOut = async (req, res) => {
   req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "tidak dapat logout" });
      res.status(200).json({ msg: "berhasil logout" });
   });
};
