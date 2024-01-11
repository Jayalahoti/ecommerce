//shows allorders

import React, { useEffect, useState } from 'react'
import Navbar from './navbar';
import './login.css';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';

export const ManageOrders = () => {

    const [allorders, setAllorders] = useState([]);

    const AllOrders = async () => {
        const res = await axios.get(`${API_BASE_URL}/allorders`);
        if (res.status === 200) {
            setAllorders(res.data.allorders);
            ;;
        } else {
            console.log("Some error occured!");
        }
    }

    useEffect(() => {
        AllOrders();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='container'>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" to='/addproduct'>Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/allproducts">Manage Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to='/allusers'>Manage Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to='/allorders'>Manage Orders</Link>
                    </li>
                </ul>
            </div><br></br>
            <h3>All Orders </h3><br />
            <table className="table my-3 mx-3">
                <thead className='mx-3'>
                    <tr className='mx-3'>
                        <th scope="col" style={{ width: '20%' }}>Order ID</th>
                        <th scope="col" style={{ width: '20%' }}>User ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Delivered</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allorders && allorders.map(ord => {
                        return (<tr className=' my-3 mx-3'>
                            <th scope="row">{ord._id}</th>
                            <th scope="row">{ord.user}</th>
                            <td>{new Date(ord.createdAt).toLocaleString()}</td>
                            <td>${ord.totalAmount}</td>
                            <td>No</td>
                            <td>No</td>
                            <td>Details</td>
                        </tr>)

                    })}

                </tbody>
            </table> <br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div >
    )
}

export default ManageOrders;