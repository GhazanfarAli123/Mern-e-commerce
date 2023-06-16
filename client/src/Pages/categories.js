import React from 'react'
import Layout from '../Components/Layouts/Layout'
import { useCategory } from '../Components/Hooks/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
  const categories = useCategory()
    return (
    <Layout>
        {categories.map((c)=>(
            <Link to={`/category/${c.slug}`}><button className='btn btn-primary'>{c.name}</button></Link>
        ))}
    </Layout>
  )
}

export default Categories