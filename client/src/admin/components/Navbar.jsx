import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <>
    <nav class="navbar navbar-expand-lg bg-danger">
      <div class="container">
        <Link to="/admin" class="navbar-brand" >Admin pannel</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/admin" class="nav-link active" >Dashboard</Link>
            <Link to="/admin/add-doctor" class="nav-link" >AddDoctor</Link>
            <Link to="/admin/add-pathology" class="nav-link" >AddPathology</Link>
            <Link to="/admin/settings" class="nav-link" >Settings</Link>
          </div>
        </div>
      </div>
    </nav>
  </>
}

export default Navbar