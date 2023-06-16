import React, { useState } from 'react'
import Layout from '../../Components/Layouts/Layout'
import axios from "axios"
import { useNavigate , useLocation } from "react-router-dom";
import { useAuth } from '../../Context/auth';


const Login = () => {
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth , setAuth] =useAuth()
    const navigate = useNavigate();
    const location = useLocation()
    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:1000/api/v1/auth/login`, { email, password})

            if(res.data.success){
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token

                })
                localStorage.setItem("auth",JSON.stringify(res.data))
                navigate(location.state || "/")
            }else{
                alert("log in failed")
            }

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
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
               <button className='btn btn-primary' onClick={(()=> navigate("/forget-password"))}>Forget Password</button>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </Layout>
    )
}

export default Login