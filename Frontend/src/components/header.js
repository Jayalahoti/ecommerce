import React from 'react';

// Font awesome imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        // Navbar Header
        <div className="navbar-custom">
            <nav className="navbar navbar-custom navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid navbar-custom">
                    
                    <a className="navbar-brand logo" href="#">
                        FashionMart
                    </a>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex navbar-brand" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary navbtn" type="submit">Search</button>
                    </form>
                    <ul className="nav navbar-brand justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link active links" aria-current="page" href="#"><button className="btn btn-outline-primary navbtn">Login</button></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link links" href="#"> <FontAwesomeIcon className="cart" icon={faCartShopping} /> </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* nav tab */}
            <ul className="nav nav-tab justify-content-center">
                {/* various links */}
                <li className="nav-item">

                    <a className="nav-link tablink active" aria-current="page" href="home.html">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tablink" href="allproducts.html">All Products</a>
                </li>
                {/* women dropdown */}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle tablink" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                        Women</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="women.html">All Products</a></li>
                        <li><a className="dropdown-item" href="dresses.html">Dresses</a></li>
                        <li><a className="dropdown-item" href="skirts.html">Skirts</a></li>
                        <li><a className="dropdown-item" href="pants.html">Pants</a></li>
                    </ul>
                </li>
                {/* men dropdown */}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle tablink" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Men</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="men.html">All Products</a></li>
                        <li><a className="dropdown-item" href="jackets.html">Jackets</a></li>
                        <li><a className="dropdown-item" href="shirts.html">Shirts</a></li>
                        <li><a className="dropdown-item" href="trousers.html">Trousers</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link tablink" href="kids.html">Kids</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link tablink" href="contact.html">Contact</a>
                </li>
            </ul>
        </div>
    )
}

export default Header;