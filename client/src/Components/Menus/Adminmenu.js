import React from 'react'
import { Link } from 'react-router-dom'

const Adminmenu = () => {
    return (
        <>
            <ul class="list-group">
                <li class="list-group-item"><Link to="/dashboard/admin/add-product">Add Products</Link></li>
                <li class="list-group-item"><Link to="/dashboard/admin/add-category">Add Category</Link></li>
                
            </ul>
        </>
    )
}

export default Adminmenu