import React from 'react';
// Font awesome imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Navbar = () => {

    const user = useSelector((state)=>state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    const signout = () => {
        localStorage.clear();
        dispatch({ type: "LOGIN_ERROR" });
        Swal.fire({
            icon: 'success',
            title: 'User Logged out!'
        })
        navigate("/");
    }

    return (
        <div className="header-cont navbar-custom">
            <nav className="navbar navbar-custom bg-body-tertiary">
                <div className="container-fluid navbar-custom">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand logo" to='/'>
                        FashionMart
                    </Link>
                    <form className="d-flex navbar-brand" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary navbtn" type="submit">Search</button>
                    </form>
                    <ul className="nav justify-content-end">
                        <li className="nav-item dropdown">
                            {name ? <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{name}</a> : <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">User</a>}
                            <ul className="dropdown-menu">
                                {token ? <> <li><Link className="dropdown-item" to='/userprofile'>User Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/history">Order History</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => signout()}>Sign out</a></li></> : <li><Link className="dropdown-item" to="/login">Login</Link></li>}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Seller</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Separated link</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <li className="nav-item">
                                <Link className="nav-link active" to='/admin'>Admin</Link>
                            </li>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link links" to="/cart"> <FontAwesomeIcon className="cart" icon={faCartShopping} /> </Link>
                        </li>
                    </ul>
                    <div className="offcanvas offcanvas-start" tabindex="-2" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Categories</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="allproducts">All Products</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">Dresses</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Skirts</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pants</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;