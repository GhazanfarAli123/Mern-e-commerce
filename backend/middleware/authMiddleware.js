import Jwt from "jsonwebtoken";
import userModal from "../modals/userModal.js";

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = Jwt.verify(
            req.header('auth-token'),
            "jahsdbabsfbashfbkjhsdbfihsd")
        req.user = decode
        next()


    } catch (err) {
        console.log(err)
    }
}

export const isAdmin = async (req, res, next) => {
    try {

        const user = await userModal.findById(req.user._id)
        if (user.role !== "1") {
            res.send("not authorized")
        } else {
            next()
        }

    } catch (err) {
        console.log(err)
    }
}