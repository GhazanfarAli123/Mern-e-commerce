import React, { useState } from 'react'
import Layout from '../../Components/Layouts/Layout'
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    let history = useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:1000/api/v1/auth/register`, { name, email, password, phone, address,answer })
                history("/login")
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    return (
        <Layout>
            <form onSubmit={handelSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">what is your fav fruit</label>
                    <input type="text" class="form-control" id="address" name='address' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </Layout>
    )
}

export default Register