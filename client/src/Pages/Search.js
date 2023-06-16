import React from 'react'
import Layout from '../Components/Layouts/Layout'
import { useSearch } from '../Context/Search'

const Search = () => {
    const [values,setValues] = useSearch()
  return (
    <Layout>
        <div className='contianer'>
        {values?.results.length < 1 ? "no product found": <>{values?.results.map((p) =>{
           return( 
            <div class="card"style={{width:"200px"}}>
            <img height={"200px"} width={"200px"} src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
            <div class="card-body">
              <h5 class="card-title">{p.name}</h5>
              <p class="card-text">{p.description}</p>
             <button className='btn btn-primary'>More detail</button>
             <button className='btn btn-primary'>Add to cart</button>
            </div>
          </div>
           )
        })}
        </> 
        }
       
        
        </div>
    </Layout>
  )
}

export default Search