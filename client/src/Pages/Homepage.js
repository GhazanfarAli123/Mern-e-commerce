import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layouts/Layout'
import { Checkbox, Radio } from "antd"
import axios from 'axios'
import { Prices } from '../Components/Prices'
import { useNavigate } from 'react-router'
import { useCart } from '../Context/Cart'

const Homepage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:1000/api/v1/category/get-catgories");
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:1000/api/v1/product/product-count")
      setTotal(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllCategory()
    getTotal();

  }, [])


  const getProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:1000/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  useEffect(() => {
    loadMore()
  }, [page])

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:1000/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data])
    } catch (err) {
      console.log(err)
    }
  }

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:1000/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);

    } catch (error) {
      console.log(error);
    }
  };

  const handelfilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    console.log('all:', all);
    setChecked(all);
  };



  return (
    <Layout title="homepage">
      <div className='row'>
        <div className='col-3' style={{ display: "flex" }}>
          {categories.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handelfilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
          <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Prices.map(p => (
              <Radio value={p.array}>{p.name}</Radio>
            ))}
          </Radio.Group>

        </div>
        <button className="btn btn-danger" onClick={(() => window.location.reload())}>reset</button>
        <div className='col-9'>
          <div className='container'>
            {products?.map((p) => {
              return (
                <div class="card" style={{ width: "200px" }}>
                  <img height={"200px"} width={"200px"} src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name} />
                  <div class="card-body">
                    <h5 class="card-title">{p.name}</h5>
                    <p class="card-text">{p.description}</p>
                    <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More detail</button>
                    <button className='btn btn-primary' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])) }}>Add to cart</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {products && products.length < total.total && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button className='btn btn-primary'
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}>
              {loading ? "loading..." : "Load More"}
            </button>
          </div>
        )}
        <div>{total.total}</div>
      </div>

    </Layout>
  )

}

export default Homepage