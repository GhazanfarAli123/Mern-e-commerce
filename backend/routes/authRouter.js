import express from "express"
import {forgetPasswordController, getOrdersController, loginController, registerController,textCon , updateProfileController} from '../controllers/authController.js'
import {isAdmin, requireSignIn} from "../middleware/authMiddleware.js"



const router = express.Router()

router.post("/register" ,registerController)

router.post("/login" ,loginController)

router.post("/test",requireSignIn, isAdmin ,textCon)

router.post("/forget-password" ,forgetPasswordController)

router.get("/user-auth" , requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get("admin-auth" , requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.put("/profile" ,requireSignIn,updateProfileController)

router.get("/orders" ,requireSignIn,getOrdersController)


export default router