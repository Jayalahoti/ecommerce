//Preview of cart items & total

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './login.css';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import './cart.css'

const Preview = () => {

    const cart = useSelector((state) => state.CartReducer);
    const user = useSelector((state) => state.userReducer);
    const { cartItems } = cart;

    const name = localStorage.getItem("name");

    var totalAmount = 0;
    var totalItems = 0;
    var len = cartItems.length;
    while (len > 0) {
        --len
        totalItems = cartItems[len].count + totalItems;
        totalAmount = cartItems[len].count * cartItems[len].productId.price + totalAmount;
    }

    const amount = totalAmount+18;
    const items = totalItems;

    const shippingId = localStorage.getItem("shippingId");

    const [address, setAddress] = useState("");

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const addOrderDetails = async () => {
        try {
            const req = { addressId: shippingId, totalAmount: amount, totalItems: items, cartItems };
            const res = await axios.post(`${API_BASE_URL}/orderdetails`, req, CONFIG_OBJ);
            if (res.status === 201) {
                console.log(res.data.order);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAddress = async () => {
        const res = await axios.get(`${API_BASE_URL}/address/${shippingId}`, CONFIG_OBJ);
        if (res.status === 200) {
            setAddress(res.data.address);
        } else {
            console.log("Some error occured!");
        }
    }

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div>
            <Navbar /><br></br>
            <h1 className='ms-3'>Preview Order</h1><br></br>
            <div className='row'>
                <div className='col-md-8'>
                    <div className="card mb-3 mx-3">
                        <div className="card-body">
                            <h5 className="card-title">Shipping</h5>
                            <tr>
                                <td className='fw-bold'>Name:</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td className='fw-bold'>Address:</td>
                                <td>    {address.address}, {address.city}, {address.postalcode}, {address.country}</td>
                            </tr><br />
                            <Link to='/shipping' className="card-link">Edit</Link>
                        </div>
                    </div>
                    <div className='card mb-3 mx-3'>
                        <div className="card-body">
                            <h5 className="card-title">Payment</h5>
                            <tr>
                                <td className='fw-bold'>Method:</td>
                                <td>PayPal</td>
                            </tr><br />
                            <Link to='/payment' className="card-link">Edit</Link>
                        </div>
                    </div>
                    <div className='card mb-3 mx-3'>
                        <h5 className="card-title ms-3 mt-3">Items</h5>
                        <div className="card-body d-flex">
                            <div className='cart-item my-auto'>
                                {cartItems.map((item) => {
                                    return (
                                        <div className='d-flex space-between cart-card'>
                                            <img className='cart-img d-flex my-auto'
                                                src={`${API_BASE_URL}/uploads/${item.productId.imageURL}`}
                                                alt={item.productId.product} />
                                            <a className='my-auto' href='#'>{item.productId.product}</a>
                                            <div className='cart-item my-auto d-flex'>
                                                <p className='mt-3'>{item.count}</p>
                                            </div>
                                            <p className='cart-item my-auto'>${item.productId.price * item.count}</p>
                                        </div>
                                    )
                                })}

                            </div>

                            <br />
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="card mx-3">

                        <ul className="list-group list-group-flush">
                            <h5 className="card-title ms-2 mt-3">Order Summary</h5>
                            <li className="list-group-item mx-3">
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <td>Items:</td>
                                        <td className='text-right' style={{ width: '37%' }}>${totalAmount}</td>
                                    </tr>
                                </table>
                            </li>
                            <li className="list-group-item mx-3">
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <td>Shipping:</td>
                                        <td>$0.00</td>
                                    </tr>
                                </table>
                            </li>
                            <li className="list-group-item mx-3">
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <td>Tax:</td>
                                        <td style={{ width: '37%' }}>$18.00</td>
                                    </tr>
                                </table>
                            </li>
                            <li className="list-group-item mx-3">
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <td className='fw-bold'>Order Total:</td>
                                        <td className='fw-bold' style={{ width: '37%' }}>${18 + totalAmount}</td>
                                    </tr>
                                </table>
                            </li>
                            <li className="list-group-item mx-auto mb-3">
                                <Link to='/order'><button className='checkout-btn btn btn-primary mx-auto' type='submit' onClick={()=> addOrderDetails()}>Place Order</button></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div>
    )
}
export default Preview;