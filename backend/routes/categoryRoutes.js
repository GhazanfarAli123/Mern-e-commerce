import express from "express"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController.js";

const router = express.Router()

router.post("/create-category",requireSignIn,isAdmin,createCategory)
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategory)
router.get("/get-catgories",getCategories)
router.get("/get-category/:slug",getCategory)
router.delete("/delete-category/:id",deleteCategory)

export default router;