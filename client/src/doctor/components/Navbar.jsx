import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
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
      </div>
    </div>
  </nav>
}

export default Navbar