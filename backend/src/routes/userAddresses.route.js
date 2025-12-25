import express from "express";
import { createUserAddress, updateUserAddress, deleteUserAddress, readUserAddresses, readAllUserAddresses } from "../controllers/userAddresses.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, readAllUserAddresses);
router.get("/me", auth, readUserAddresses);
router.post("/create", auth, createUserAddress);
router.put("/update/:id", auth, updateUserAddress);
router.delete("/delete/:id", auth, deleteUserAddress);    

export default router;