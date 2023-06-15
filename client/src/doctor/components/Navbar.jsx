import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../redux/actions/publicActions';
const Navbar = () => {
  const { login } = useSelector(state => state.public)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return <nav class="navbar navbar-expand-lg bg-info">
    <div class="container">
      <Link to="/doctor" class="navbar-brand" >Docor</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <Link to="/doctor" class="nav-link active">Dashboard</Link>
          <Link to="/doctor/add-test" class="nav-link">Addtest</Link>
          <Link to="/doctor/settings" class="nav-link">Setting</Link>
        </div>
        <div className='ms-auto'>
          <div class="dropdown ">
            <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
              <img src={login.avatar} width={25} alt={login.name} />
              <span className='mx-3'>{login.name}</span>
            </button>
            <ul class="dropdown-menu">
              <li>

                <button class="dropdown-item" onClick={handleLogout} >Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar