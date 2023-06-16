import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const useCategory = () => {
    const [categories , setCategories] = useState([])

    const getCategories = async() =>{
        try{
            const {data} = await axios.get(`http://localhost:1000/api/v1/category/get-catgories`)
            setCategories(data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getCategories()
    },[])
    return categories
}
