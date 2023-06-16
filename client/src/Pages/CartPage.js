import Layout from '../Components/Layouts/Layout'
import React, { useEffect, useState } from 'react'
import { useCart } from '../Context/Cart'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClienToken] = useState("")
    const [instanse, setInstance] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const removeCardItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (err) {
            console.log(err)
        }
    }

    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) => {
                total = total + item.price;
            })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (err) {
            console.log(err)
        }
    }
    const getToken = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/product/braintree/token")
            setClienToken(data?.clientToken)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])


    const handelPayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instanse.requestPaymentMethod()
            const { data } = await axios.post("http://localhost:1000/api/v1/product/braintree/payment", {
                nonce, cart
            },{
                headers: {
                    "auth-token": auth?.token,
                  },
            })
            setLoading(false)
            localStorage.removeItem("cart")
            setCart([])
            navigate("/dashboard/user/order")

        } catch (err) {

        }
    }

    return (
        <Layout>
            {`Hello ${auth?.token && auth?.user?.name}`}
            {cart?.length > 0 ? `you have${cart.length} item in cart${auth?.token ? "" : "please login to checkout"}` : "your cart is empty"}
            {cart?.map((p) => {
                return (
                    <div class="card" style={{ width: "200px" }}>
                        <img height={"200px"} width={"200px"} src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name} />
                        <div class="card-body">
                            <h5 class="card-title">{p.name}</h5>
                            <p class="card-text">{p.description}</p>
                            <p class="card-text">{p.price}</p>
                            <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More detail</button>
                            <button className='btn btn-danger' onClick={() => removeCardItem(p._id)}>Remove</button>
                        </div>
                    </div>
                )
            })}
            <div className='total'>total : {totalPrice()}</div>
            {auth?.user?.address ? (
                <>
                    <div>current address</div>
                    <div>{auth?.user?.address}</div>
                    <button className='btn btn-primary' onClick={() => navigate("/dashboard/user/profile")}>Update Button</button>
                </>
            ) : <div>
                {
                    auth?.token ? (
                        <button className='btn btn-primary' onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                    ) : (
                        <button className='btn btn-danger' onClick={() => navigate("/login")}>Please logn</button>
                    )
                }
            </div>
            }
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instanse) => setInstance(instanse)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handelPayment}
                     
                    >
                      Make Paymemt
                    </button>
                  </>
                )}
              </div>
        </Layout>
    )
}

export default CartPage