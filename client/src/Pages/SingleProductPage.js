import { Layout } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const SingleProductPage = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:1000/api/v1/product/get-product/${params.slug}`);
      setProduct(data);
      similarProduct(data._id, data.category?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:1000/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className='product'>
        <div className='container'>
          {product ? (
            <div className='name'>
              <img src={`http://localhost:1000/api/v1/product/product-photo/${product._id}`} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category?.name || 'N/A'}</p>
              {/* Render other properties as needed */}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {relatedProduct?.map((p) => (
  <div className="card" style={{ width: "200px" }} key={p._id}>
    <img
      src={`http://localhost:1000/api/v1/product/product-photo/${p._id}`}
      alt={p.name}
      className="card-img-top"
      style={{ height: "200px", width: "200px" }}
    />
    <div className="card-body">
      <h5 className="card-title">{p.name}</h5>
      <p className="card-text">{p.description}</p>
      <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>
        More detail
      </button>
      <button className="btn btn-primary">Add to cart</button>
    </div>
  </div>
))}

    </Layout>
  );
};

export default SingleProductPage;
