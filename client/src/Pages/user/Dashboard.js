import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import Usermenu from '../../Components/Menus/Usermenu'
import { useAuth } from '../../Context/auth'

const Dashboard = () => {
  const [auth] = useAuth()

  return (
    <Layout>
   <div className='row'>
    <div className='col-3'>
    <Usermenu />
    </div>
    <h1>{auth.user.name}</h1>

   </div>
    </Layout>
    )
}

export default Dashboard