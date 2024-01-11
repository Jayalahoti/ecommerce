//signup for new user

import React, { useState } from 'react'
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import axios from 'axios';

const Signup = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const signup = (e) => {
        e.preventDefault();
        setLoading(true);
        const reqData = { fullname: fullname, email, password, confirm };
        axios.post(`${API_BASE_URL}/signup`, reqData)
            .then((result) => {
                if (password === confirm) {
                    if (result.status === 201) {
                        setLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Registeration Successful!'
                        })
                    }
                    setFullname("");
                    setEmail("");
                    setPassword("");
                    setConfirm("")
                    navigate("/shipping");
                } else {
                    if (result.status === 201) {
                        setLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Please re-enter correct password!'
                        })
                    }
                }

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Email ID already registered!'
                })
            })
    }

    return (
        <div>
            <Navbar /><br></br>
            <h1 className='text-center'>Signup</h1> <br></br>
            <form onSubmit={(e) => signup(e)}>
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
                    <label className="form-label text-muted">Email</label>
                    <input type="email" className="form-control user-form" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Password</label>
                    <input type="password" className="form-control user-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-input user-login">
                    <label className="form-label text-muted">Confirm Password</label>
                    <input type="password" className="form-control user-form" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary form-inputs checkout-btn">Signup</button>
                </div>
            </form> <br></br>
            <div className='text-center'>
                Already have an account? <Link to='/login'>Login</Link>
            </div><br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div >
    )
}

export default Signup;