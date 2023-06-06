import React from 'react'
import { Link } from "react-router-dom"
const Navbar = () => {
    return <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <Link to="/pathology" className="navbar-brand">Pathology</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/pathology" className="nav-link active">Home</Link>
                        <Link to="/pathology/submit-report" className="nav-link">Submit Report</Link>
                        <Link to="/pathology/settings" className="nav-link">Settings</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar