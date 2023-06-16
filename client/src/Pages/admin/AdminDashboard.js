import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import Adminmenu from '../../Components/Menus/Adminmenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <div className='row'>
      <div className='col-3'>
      <Adminmenu />
      </div>
      <div className='col-3'>
      <h1>{auth.user.name}</h1>
      </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard