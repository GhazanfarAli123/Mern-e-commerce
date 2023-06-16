import React, { useEffect, useState } from 'react'
import Layout from "../../Components/Layouts/Layout"
import axios from "axios"
import Categoryform from '../../Components/forms/Categoryform'
import { Modal } from 'antd'


const AddCategory = () => {
  const [category, setCategory] = useState([])
  const [name,setName] = useState("")
  const [visible,setVisibal] = useState(false)
  const [selected , setSelected] = useState("")
  const [updateName , setUpdateName] = useState("")

  const handelSubmit = async(e) =>{
    try{

      const {data} = await axios.post("http://localhost:1000/api/v1/category/create-category",{name},{
        headers:{
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU2N2NlNTZhOGNhZmEzYmUwZjc1YjAiLCJpYXQiOjE2ODM2NTQzNTMsImV4cCI6MTY4NDI1OTE1M30.e9w8XPb2d6S4MZ1FHPuzb0iAM7Z8nz93hZX_v7tWDC8"
        }
      })
    console.log(`category ${data.name} is created`)
      getAllCategory()
    }catch(e){
      console.log(e)
    }
  }

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:1000/api/v1/category/get-catgories")
      setCategory(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  const updateSubmit = async(e) =>{
    try {
      const { data } = await axios.put(`http://localhost:1000/api/v1/category/update-category/${selected._id}`,{name:updateName},{
        headers:{
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU2N2NlNTZhOGNhZmEzYmUwZjc1YjAiLCJpYXQiOjE2ODM2NTQzNTMsImV4cCI6MTY4NDI1OTE1M30.e9w8XPb2d6S4MZ1FHPuzb0iAM7Z8nz93hZX_v7tWDC8"
        }
      })
      setSelected(null)
      setUpdateName("")
      setVisibal(false)
      console.log(updateName+"is updated")
    } catch (err) {
      console.log(err)
    }

  }

  const handelDelete = async(pId) =>{
    try {
      const { data } = await axios.delete(`http://localhost:1000/api/v1/category/delete-category/${pId}`,{
        headers:{
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU2N2NlNTZhOGNhZmEzYmUwZjc1YjAiLCJpYXQiOjE2ODM2NTQzNTMsImV4cCI6MTY4NDI1OTE1M30.e9w8XPb2d6S4MZ1FHPuzb0iAM7Z8nz93hZX_v7tWDC8"
        }
      })
      setSelected(null)
      getAllCategory()
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <Layout>
      <Categoryform handelSubmit={handelSubmit} value={name} setValue={setName} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c) => (
            <>
            <tr key={c._id}>
              <td>{c.name}</td>
              <td><button className='btn btn-primary' onClick={() => {setVisibal(true);setUpdateName(c.name);setSelected(c)}}>Edit</button>
              <button className='btn btn-primary' onClick={()=> handelDelete(c._id)}>Delete</button>
              </td>
            </tr>
            </> 
          ))}
        </tbody>
      </table>
      <Modal onCancel={() =>setVisibal(false)} footer={null} visible={visible}>
        <Categoryform  value={updateName} setValue={setUpdateName} handelSubmit={updateSubmit}/>
      </Modal>
    </Layout>
  )
}

export default AddCategory
