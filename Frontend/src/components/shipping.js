//add shipping address

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './login.css';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useSelector } from 'react-redux';

const Shipping = () => {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.CartReducer);
    const {cartItems} = cart;
    console.log(cartItems);

    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const addAddress = (e) => {
        setLoading(true)
        e.preventDefault();
        const req = { fullname: fullname, address: address, postalcode: postalcode, country: country, city: city };
        axios.post(`${API_BASE_URL}/address`, req, CONFIG_OBJ)
            .then((res) => {
                if (res.status === 201) {
                    setLoading(false);
                    setFullname("");
                    setAddress("");
                    setCity("");
                    setPostalcode("");
                    setCountry("");
                    navigate('/payment');
                    const shippingId = res.data.address._id;
                    localStorage.setItem("shippingId", shippingId);
                }
            })
            .catch((err) => {
                alert("Please enter all fields!")
                console.log(err);
            })
    };

    return (
        <div>
            <Navbar /><br></br>
            <h1 className='text-center'>Shipping Address</h1> <br></br>
            <form onSubmit={(e) => addAddress(e)}>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Full Name</label>
                    <input type="text" className="form-control user-form" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Address</label>
                    <input type="address" className="form-control user-form" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">City</label>
                    <input type="text" className="form-control user-form" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="mb-3 form-input user-login">
                    <label className="form-label text-muted">Postal Code</label>
                    <input type="text" className="form-control user-form" value={postalcode} onChange={(e) => setPostalcode(e.target.value)} />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Country</label>
                    <input type="text" className="form-control user-form" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary form-inputs checkout-btn">Continue</button>
                </div>
            </form> <br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div>
    )
}

export default Shipping;