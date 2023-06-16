import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../../index.css'
import { useAuth } from '../../Context/auth'
import SearchInput from '../forms/Search'
import { useCategory } from '../Hooks/useCategory'
import { useCart } from '../../Context/Cart'
const Header = () => {
  const [cart] = useCart()
  const [auth,setAuth] = useAuth()
  const categories = useCategory()
  const handelLogOut =() =>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem("auth")
  }

  return (
   <>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <div class="navbar-brand">Navbar</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink class="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        {!auth.user ? 
        <>
        <li class="nav-item">
          <NavLink class="nav-link" aria-current="page" to="/register">Register</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" aria-current="page" to="/login" href="#">Login</NavLink>
        </li>
        </>:
        <>
        <li class="nav-item">
          <NavLink class="nav-link" onClick={handelLogOut} aria-current="page" to="/login" href="#">logout</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" aria-current="page" to={`/dashboard/${auth?.user?.role === "1"?"admin":"user"}`} href="#">dashboard</NavLink>
        </li>
        </>
      }
        <li class="nav-item">
          <NavLink class="nav-link" aria-current="page" to="/cart">Cart{cart? cart.length : 0}</NavLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link to="/catgeories"><li><a class="dropdown-item">All Categories</a></li></Link>
            {categories?.map((c) =>(
            <Link to={`/catgeory/${c.slug}`}><li><a class="dropdown-item">{c.name}</a></li></Link>

            ))}
            
          </ul>
        </li>
       
      <SearchInput />
        
       
        
      </ul>
      
    </div>
  </div>
</nav>
   </>
  )
}

export default Header