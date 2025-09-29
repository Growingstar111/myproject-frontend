import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
      
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a className="navbar-brand text-white" >Tech Heaven</a>
            <button className="navbar-toggler text-white p-0 w-125" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon w-100"><img src="../images/Menu_green-128.webp" alt="" width={"100%"} height={"100%"} /></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link to={"/"}className="nav-link text-white" >Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link text-white" >Features</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" >Pricing</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" >About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" >Contact</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link to={"/login"}className="nav-link text-white" >Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/register"}className="nav-link text-white" >Register</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    </>
  )
}

export default Header
