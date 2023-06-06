import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return <>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <Link to={"/"}  class="navbar-brand" >Admin pannel</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <Link to={"/"} class="nav-link active" >Dashboard</Link>
          <Link to={"/doctor"} class="nav-link" >AddDoctor</Link>
          <Link to={"/pathology"} class="nav-link" >AddPathology</Link>
          <Link to={"/settings"} class="nav-link" >Settings</Link>
        </div>
      </div>
    </div>
  </nav>
  </>
}

export default Navbar