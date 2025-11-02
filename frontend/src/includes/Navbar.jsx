import React, { useState } from 'react'
import { BiLogOut, BiLogOutCircle, BiMenu, BiSearch, BiSolidPaperPlane } from "react-icons/bi";
import { useUser } from '../components/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const {user, removeUser} = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout function!")
    removeUser();
    navigate("/")
  }

  return (
    <>
    
    <nav className="navbar navbar-expand-md bg-body-light border-bottom">
  <div className="container-fluid">
  <a href="/" className="navbar-brand mb-2 d-flex align-items-center gap-2 ">
        <h2 className='mt-3 mt-md-3 mt-sm-1 brand-name'>Reesair</h2>
      </a>
      <button
        className="navbar-toggler mb-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-collapse"
        aria-controls="navbar-collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
    <div className="collapse navbar-collapse border-bottom" id='navbar-collapse'>

        <div className="navbar-nav ms-auto search-bar">
        <form className="d-flex" onSubmit={"#"}>
            <input
              className="form-control mx-3 my-3 text-center search-inp"
              type="search"
              placeholder="Search destination"
              aria-label="Search"
              id="place_name"
            />
            <button className="btn search-btn my-3 ms-auto d-flex justify-content-center" type="submit">
             <p className='d-flex'> <i><BiSearch/></i>
            Search</p>
            </button>
          </form>
      </div>
      <div className="drop-menu navbar-nav ms-auto">
        {user._id && (
        <a href="/add" className="nav-link">Reesair your place</a>
        )||
        <a href="/login" className="nav-link">Reesair your place</a>
        }
      {user._id && (
      <a href="/signup" className="nav-link"><b>Signup</b></a>
      )}
      <a href="/login" className="nav-link"><b>Login</b></a>
      {user._id && (
      <a onClick={()=>{handleLogout()}} className="nav-link">Logout</a>
      )}
      </div>
    </div>
  </div>
</nav>


    </>
  )
}

export default Navbar;