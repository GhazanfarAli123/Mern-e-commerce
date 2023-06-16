import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Allproducts = () => {
    const [products,setProducts] = useState([])
    
    const getProducts = async() =>{
        try{
            const {data} = await axios.get("http://localhost:1000/api/v1/product/get-products");
            setProducts(data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        getProducts()
    },[])

  return (
    <Layout>
    <div className='container'>
        
    {products.map((p) =>{
       return( 
        <div class="card"style={{width:"200px"}}>
        <img height={"200px"} width={"200px"} src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">{p.name}</h5>
          <p class="card-text">{p.description}</p>
          <Link to={`/dashboard/admin/product/${p.slug}`} className='btn btn-primary'>See Product</Link>
        </div>
      </div>
       )
    })}
    </div>
    </Layout>
  )
}

export default Allproducts