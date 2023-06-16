import React from 'react'
import { Link } from 'react-router-dom'

const Usermenu = () => {
    return (
        <>
            <ul class="list-group">
                <li class="list-group-item"><Link to="/dashboard/user/order">Orders</Link></li>
                <li class="list-group-item"><Link to="/dashboard/user/profile">Profile</Link></li>
                
            </ul>
        </>
    )
}

export default Usermenu