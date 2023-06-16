import React, { useEffect, useState } from 'react'
import Layout from "./../../Components/Layouts/Layout";
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import moment from "moment"

const Order = () => {

  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:1000/api/v1/auth/orders", {
        headers: {
          "auth-token": auth?.token,
        },
      })
      setOrders(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  return (
    <Layout>
      <div>
        {/* {JSON.stringify(orders,null,4)} */}
        {orders?.map((o, i) => (
          <React.Fragment key={i}>
            <div>{i + 1}</div>
            <div>{o?.status}</div>
            <div>{moment(o?.createAt).fromNow()}</div>
            <div>{o?.buyer?.name}</div>
            <div>{o?.products?.length}</div>
            {o?.products.map((p,i) => {
                return (
                    <div class="card" style={{ width: "200px" }}>
                        <img height={"200px"} width={"200px"} src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name} />
                        <div class="card-body">
                            <h5 class="card-title">{p.name}</h5>
                            <p class="card-text">{p.description}</p>
                            <p class="card-text">{p.price}</p>
                          
                        </div>
                    </div>
                )
            })}
          </React.Fragment>
        ))}
  
      </div>
    </Layout>
  )
}

export default Order