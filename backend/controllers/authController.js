import { comparePassword, passwordHashing } from "../helper/authHelper.js"
import orderModal from "../modals/orderModal.js";
import userModal from "../modals/userModal.js"
import JWT from "jsonwebtoken"
export const registerController = async (req, res) => {
  let success;
  try {
    const { name, email, address, phone, password,answer } = req.body
    const existingUser = await userModal.findOne({ email })
    if (existingUser) {
      console.log("User already exists")
      success = false;
      res.send("User already exists")
      return
    }
    const hashedPassword = await passwordHashing(password)
    const user = await new userModal({ name, email, password: hashedPassword, address, phone,answer }).save()
    success = true
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send("Error occurred while registering user")
  }
}
export const loginController = async (req, res) => {
  let success;
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).send("Invalid email and/or password")
      success = false
      return
    }

    const user = await userModal.findOne({ email })

    if (!user) {
      res.status(400).send("User not found")
      success = false
      return
    }

    const match = await comparePassword(password, user.password)

    if (!match) {
      res.status(400).send("Invalid password")
      success = false
      return
    }

    const token = JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    res.send({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      },
      token,
    })
    success = true
  } catch (err) {
    console.log(err)
    res.status(500).send("Error occurred while logging in")
    success = false
  }

  if (!success) {
    return;
  }
}
export const forgetPasswordController = async(req,res) =>{
  try{
    const {email,answer,newPassword} =req.body
    if(!email){
      return res.status(400).send({message:"email is required"})
    }
    if(!answer){
      return res.status(400).send({message:"email is required"})
    }
    if(!newPassword){
      return res.status(400).send({message:"email is required"})
    }
    const user = await userModal.findOne({email,answer})
    if(!user){
      return res.status(400).send({message:"wrong email"})
    }
    const hashed = await passwordHashing(newPassword)
    await userModal.findByIdAndUpdate(user._id,{password:hashed})
    res.send({message: "Password updated successfully"})
  }catch(err){
    console.log(err)
    res.status(500).send({message: "Error occurred while updating password"})
  }
}


export const textCon = async(req,res)=>{
  res.send("hallo world")
}

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModal.findById(req.user._id);
  
 
    const hashedPassword = password ? await passwordHashing(password) : undefined;

    const updatedUser = await userModal.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdersController = async(req,res) =>{
try{
  const orders = await orderModal.find({buyer:req.user._id}).populate("products","-photo").populate("buyer" , "name")
  res.json(orders)

}catch(err){
  console.log(err)
}
}