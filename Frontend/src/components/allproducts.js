//all products page for user & admin

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

const Allproducts = () => {

  const [allproducts, setAllproducts] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin");

  const getAllproducts = async () => {
    console.log("entered getallproducts");
    const res = await axios.get(`${API_BASE_URL}/allproducts`);
    if (res.status === 200) {
      setAllproducts(res.data.Allproducts);
      console.log(res.data.Allproducts);
    } else {
      console.log("Some Error occured");
    }
  }

  // Fetch data
  useEffect(() => {
    getAllproducts();
  }, []);

  const deleteproduct = (item) => {
    try {
      const res = axios.get(`${API_BASE_URL}/deleteproduct/${item._id}`);
      if (res.status === 400) {
        alert("product cannot be deleted");
      } if (res.status === 200) {
        alert("Item Deleted!")
        getAllproducts();
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (

    <div>
      <Navbar />
      {isAdmin ? <div className='container'>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to='/addproduct'>Add Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/allproducts">Manage Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/allusers'>Manage Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/allorders'>Manage Orders</Link>
          </li>
        </ul>
      </div> : ""} <br></br>
      <h3>All Products</h3> <br />
      <div className='row'>
        {allproducts && allproducts.map(item => (
          <div className="card mx-3 my-3" style={{ width: "18rem" }}>
            <Link to={`/product/${item._id}/`}><img src={`${API_BASE_URL}/uploads/${item.imageURL}`}
              className="card-img-top" alt={item.product} /></Link>
            <div className="card-body">
              <h5 className="card-title">{item.product}</h5>
              <h5>${item.price}</h5>
              <p className="card-text">
                {item.description}
              </p>
              {isAdmin ?
                <div className='d-flex'>
                  <Link className="btn btn-primary cart-btn" to={`/editproduct/${item._id}/`}>Edit</Link>
                  <button className="btn btn-danger cart-btn" onClick={() => deleteproduct(item)}>Delete</button>
                </div> : <Link className="btn btn-primary cart-btn" to={`/product/${item._id}/`}>View Product</Link>}
            </div>
          </div>
        )
        )}
      </div><br></br>
      <div className='text-center'>All Rights Reserved</div>
    </div>

  )
}

export default Allproducts;