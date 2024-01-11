import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import Navbar from './navbar';


function ManageUsers() {

    const [users, setUsers] = useState([]);
    const email = localStorage.getItem("email");

    const getData = async () => {
        try {
            const resp = await axios.get(`${API_BASE_URL}/allusers`);
            setUsers(resp.data.Allusers);
            console.log(resp.data.Allusers);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteuser = (user) => {
        try {
            if (user.email === email) {
                alert('User handle is loggedIn!');
            } else {
                const res = axios.delete(`${API_BASE_URL}/deleteuser/${user._id}`);
                getData();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

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
                        <Link className="nav-link" to='/allorders'>Manage Orders</Link>
                    </li>
                </ul>
            </div><br></br>
            <h3>Users List</h3><br />
            <div className='table-responsive mx-3'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Is Admin?</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    {user.isAdmin ? <td>Yes</td> : <td>No</td>}
                                    <td>
                                        <Link to={`/edituser/${user._id}`}><button className="btn btn-primary cart-btn">Edit</button></Link>
                                        <button className="btn btn-danger cart-btn" onClick={() => deleteuser(user)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;