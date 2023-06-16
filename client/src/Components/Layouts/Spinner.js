import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = () => {

    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue)
        },1000)
        count === 0 && navigate("/login",{
            state:location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location])

  return (
    <>
    <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    </>
  )
}

export default Spinner