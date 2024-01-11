import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './login.css';
import { useDispatch } from 'react-redux';
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from '../config';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        const reqData = { email, password };
        axios.post(`${API_BASE_URL}/login`, reqData)
            .then((result) => {
                if (result.status === 200) {
                    setLoading(false);
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("email", result.data.result.user.email);
                    localStorage.setItem("name", result.data.result.user.fullname);
                    localStorage.setItem("isAdmin", result.data.result.user.isAdmin);
                    Swal.fire({
                        icon: 'success',
                        title: 'User LoggedIn!'
                    })
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/cart');
                    console.log(reqData);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: "User doesn't exist! Sign up to continue"
                })
            })
    }

    return (
        <div>
            <Navbar /><br></br>
            <h1 className='text-center'>Login</h1> <br></br>
            <form onSubmit={(e)=>login(e)}>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Email</label>
                    <input type="email" className="form-control user-form" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Password</label>
                    <input type="password" className="form-control user-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary form-inputs checkout-btn">Login</button>
                </div>
            </form> <br></br>
            <div className='text-center'>
                New Customer? <Link to='/signup'>Sign Up</Link>
            </div><br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div>
    )
}

export default Login;