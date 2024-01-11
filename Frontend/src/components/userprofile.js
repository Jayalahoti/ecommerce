//Edit & update new name & password for user

import React, {  useState } from 'react'
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import { useSelector } from 'react-redux';

const Userprofile = () => {

    const [loading, setLoading] = useState(false);
    
    const user = useSelector(state => state.userReducer);
    const email = user.user.email;

    // const email = user.user.email;

    const token = localStorage.getItem("token");
    console.log(token);

    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const userprofile = (e) => {
        e.preventDefault();
        setLoading(true);
        const reqData = { fullname: fullname, email, password, confirm };
        axios.post(`${API_BASE_URL}/userprofile`, reqData, CONFIG_OBJ)
            .then((result) => {
                if (password === confirm) {
                    if (result.status === 201) {
                        setLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'User data updated!'
                        })
                    }
                    setFullname("");
                    setPassword("");
                    setConfirm("")
                    navigate("/");
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
                    title: 'Email ID not registered!'
                })
            })
    }

    return (
        <div>
            <Navbar /><br></br>
            <h1 className='text-center'>User Profile</h1> <br></br>
            <form onSubmit={(e) => userprofile(e)}>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Name</label>
                    <input type="text" className="form-control user-form" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">Email</label>
                    <input type="email" className="form-control user-form" value={email} disabled readOnly />
                </div>
                <div className="mb-3 form-inputs user-login">
                    <label className="form-label text-muted">New Password</label>
                    <input type="password" className="form-control user-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-input user-login">
                    <label className="form-label text-muted">Confirm Password</label>
                    <input type="password" className="form-control user-form" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary form-inputs checkout-btn">Submit</button>
                </div>
            </form> <br></br>
            <br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div >
    )
}

export default Userprofile;