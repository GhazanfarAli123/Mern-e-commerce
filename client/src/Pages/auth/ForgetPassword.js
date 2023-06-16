import React, { useState } from 'react'
import Layout from '../../Components/Layouts/Layout'
import axios from "axios"
import { useNavigate , useLocation } from "react-router-dom";


const ForgetPassword = () => {
   
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate();
    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:1000/api/v1/auth/forget-password`, { email,answer ,newPassword})
            navigate("/login")

        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    return (
        <Layout>
            <form onSubmit={handelSubmit}>
               
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">what is your fav fruit</label>
                    <input type="text" class="form-control" id="email" name='email' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
              
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </Layout>
    )
}

export default ForgetPassword