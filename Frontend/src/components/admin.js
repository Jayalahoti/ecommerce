//admin page

import React from 'react'
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import AllProductsContextProvider from '../context/AllproductsContext';
import Allproducts from './allproducts';

const Admin = () => {

  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <div>
      <Navbar />

      {isAdmin ? <div className='container'>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to='/addproduct'>Add Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/allproducts">Manage Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/allusers'>Manage Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/allorders'>Manage Orders</Link>
          </li>
        </ul>
      </div> : ""} <br></br>

      <h1 className='text-center'>Welcome to Admin Dashboard! </h1><br />
      {!isAdmin ? <h3>Please <Link to='/login'>Login</Link> to continue further</h3> :
        <>
          
        </>}
    </div>
  )
}

export default Admin;