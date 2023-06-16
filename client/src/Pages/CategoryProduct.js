import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layouts/Layout'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
const CategoryProduct = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
  
    useEffect(() => {
      if (params?.slug) getProductByCategory();
    }, [params?.slug]);
  
    const getProductByCategory = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1000/api/v1/product/product-category/${params.slug}`);
        setProducts(data);
        if (data.length > 0) {
          setCategoryName(data[0].category.name);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Layout>
        {categoryName && <h1>{categoryName}</h1>}
        {products?.map((p) =>{
           return( 
            <div class="card"style={{width:"200px"}}>
            <img height={"200px"} width={"200px"} src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
            <div class="card-body">
              <h5 class="card-title">{p.name}</h5>
              <p class="card-text">{p.description}</p>
             <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More detail</button>
             <button className='btn btn-primary'>Add to cart</button>
            </div>
          </div>
           )
        })}
      </Layout>
    );
  };
  
  export default CategoryProduct;
  