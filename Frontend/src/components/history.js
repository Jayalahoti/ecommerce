import React, { useEffect, useState } from 'react'
import Navbar from './navbar';
import './login.css';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const History = () => {

    const [orders, setOrders] = useState([]);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const userOrders = async () => {
        const res = await axios.get(`${API_BASE_URL}/order`, CONFIG_OBJ);
        if (res.status === 200) {
            setOrders(res.data.order);
            console.log(res.data.order);
            ;;
        } else {
            console.log("Some error occured!");
        }
    }

    useEffect(() => {
        userOrders();
    }, [])

    return (
        <div>
            <Navbar /><br></br>
            <h1 className='text-center'>Order History</h1> <br></br>
            <table className="table my-3 mx-3">
                <thead className='mx-3'>
                    <tr className='mx-3'>
                        <th scope="col" style={{ width: '40%' }}>ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Delivered</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(ord => {
                        return (<tr className=' my-3 mx-3'>
                            <th scope="row">{ord._id}</th>
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

export default History;