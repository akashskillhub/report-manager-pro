import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return <>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">Report Manger Pro+</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to="/" class="nav-link active">Home</Link>
                        <Link to="/login" class="nav-link" >Login</Link>
                        <Link to="/register" class="nav-link" >Register</Link>
                        <Link to="/admin" class="nav-link" >Admin</Link>
                        <Link to="/pathology" class="nav-link" >Pathology</Link>
                        <Link to="/doctor" class="nav-link" >Doctor</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar