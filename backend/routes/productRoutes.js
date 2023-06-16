import express from "express"
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js"
import formidable from "express-formidable"
import { createProductController, deleteProductController, getProductController, getProductPhotoController, catgoryProductController, getProductsController, productCountController, productFiltersController, productListController, searchProductController, similarProductController, updateProductController, brainTreeTokenController, braintreePaymentController } from "../controllers/productContoller.js"

const router = express.Router()

router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)

router.get("/get-products",getProductsController)

router.get("/get-product/:slug",getProductController)

router.get("/product-photo/:pid",getProductPhotoController)

router.delete("/delete-product/:pid",deleteProductController)

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)

router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", similarProductController);

router.get("/product-category/:slug", catgoryProductController);

router.get("/braintree/token" , brainTreeTokenController)

router.post("/braintree/payment" , requireSignIn , braintreePaymentController)

export default router