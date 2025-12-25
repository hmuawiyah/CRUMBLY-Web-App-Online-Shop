import express from "express";
import { createProduct, readProductByIds, deleteProduct, readAllProduct, readProduct, updateProduct } from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/", readAllProduct );
router.get("/:id", readProduct );
router.post("/by-ids", auth, readProductByIds );
router.post("/create", auth, createProduct );
router.put("/update/:id", auth, updateProduct );
router.delete("/delete/:id", auth, authorizeRole("ADMIN"), deleteProduct );

export default router;