import { Layout, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const { Option } = Select

const Updateproduct = () => {
        const params = useParams()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")
    const [id, setId] = useState("")
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1000/api/v1/product/get-product/${params.slug}`);
            setName(data.name);
            setDescription(data.description)
            setPrice(data.price)
            setQuantity(data.quantity)
            setCategory(data.category)
            setId(data._id)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProduct()
    }, [])
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:1000/api/v1/category/get-catgories");
            console.log(data); // log the data to check if it is being correctly received
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllCategory()
    }, [])
    const handelCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)

            const { data } = await axios.put(`http://localhost:1000/api/v1/product/update-product/${id}`, productData, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU2N2NlNTZhOGNhZmEzYmUwZjc1YjAiLCJpYXQiOjE2ODM2NTQzNTMsImV4cCI6MTY4NDI1OTE1M30.e9w8XPb2d6S4MZ1FHPuzb0iAM7Z8nz93hZX_v7tWDC8"
                }
            })

        } catch (err) {
            console.log(err)
        }

    }
    const handelDelete = async(e) =>{
        try{

            const {data} = await axios.delete(`http://localhost:1000/api/v1/product/delete-product/${id}`)

        }catch(err){
            console.log(err)
        }
    }
    return (
        <Layout>
            <Select
                bordered={false}
                placeholder="Please Select Category"
                size="large"
                onChange={(value) => {
                    setCategory(value); // append selected values to existing categories state
                }}
                value={category}
            >
                {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>
                ))}
            </Select>

            <div className='photo'>
                <label>
                    {photo ? photo.name : "upload Image"}
                    <input type='file'
                        name='photo'
                        accept='image/*'
                        onChange={(e) => setPhoto(e.target.files[0])} />
                </label>
            </div>
            {photo ? (
                <div className='image'>
                    <img src={URL.createObjectURL(photo)}
                        alt='product_image'
                        height={"200px"}
                        className='img img-responsive' />
                </div>
            ) : (
                <div className='image'>
                    <img src={`http://localhost:1000/api/v1/product/product-photo/${id}`}
                        alt='product_image'
                        height={"200px"}
                        className='img img-responsive' />
                </div>
            )}
            <div className='text'>
                <input
                    type='text'
                    value={name}
                    placeholder='write the name'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='text'>
                <input
                    type='text'
                    value={description}
                    placeholder='write the desc'
                    className='form-control'
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='text'>
                <input
                    type='number'
                    value={quantity}
                    placeholder='write the quantity'
                    className='form-control'
                    onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className='text'>
                <input
                    type='number'
                    value={price}
                    placeholder='write the price'
                    className='form-control'
                    onChange={(e) => setPrice(e.target.value)} />
            </div>
            <Select
                bordered={false}
                placeholder="select shipping"
                size='large'
                showSearch
                className='form-select'
                onChange={(value) => {
                    setShipping(value)
                }}
                value={shipping ? "yes" : "no"}
            >
                <Option value="0">No</Option>
                <Option value="1">YEs</Option>
            </Select>
            <button className='btn btn-primary' onClick={handelCreate}> Update Product</button>
            <button className='btn btn-danger' onClick={handelDelete}> Delete Product</button>
        </Layout>
    )
}

export default Updateproduct