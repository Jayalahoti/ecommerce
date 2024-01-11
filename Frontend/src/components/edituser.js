//edit admin access of user

import React, { useEffect, useState } from 'react'
import ManageUsers from './manageusers';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Edituser = () => {

    const params = useParams();
    console.log(params.id);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const getUser = async () => {
        const res = await axios.get(`${API_BASE_URL}/userprofile/${params.id}`)
        if (res.status === 200) {
            setUser(res.data.user);
        }
    }

    const editUser = async (e) => {
        e.preventDefault();
        if (user._id == params.id) {
            alert("User Handle in use");
        } else {
            const req = { isAdmin };
            const res = await axios.put(`${API_BASE_URL}/updateuser/${params.id}`, req);
            if (res.status === 200) {
                setIsAdmin(false);
                navigate('/allusers');
            }
        }

    }
    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <ManageUsers /><br />
            <form onSubmit={() => editUser()} className='mx-3'>
                <label class="form-label">Do you want to make {user.fullname} Admin?</label>
                <input type="text" class="form-control" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)} />
                <div id="passwordHelpBlock" class="form-text">
                    If Yes, type "true", else type "false".
                </div>
                <button type="submit" className="btn btn-primary form-inputs checkout-btn">Submit</button>
            </form>
        </div>
    )
}

export default Edituser