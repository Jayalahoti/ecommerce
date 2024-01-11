//select paymnet link

import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './login.css';

const Payment = () => {


    return (
        <div>
            <Navbar /><br></br>
            <table className='table '>
                <thead className='process'>
                    <tr className='process'>
                        <th className='process-table' scope="col">Login</th>
                        <th className='process-table' scope="col">Shipping</th>
                        <th className='process-table' scope="col">Payment</th>
                        <th className='process-table' scope="col">Place order</th>
                    </tr>
                </thead>
            </table>
            <h1 className='text-center'>Payment Method</h1> <br></br>
            <form>
                <div className="form-check payment">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                    <label className="form-check-label text-dark" for="flexRadioDefault1">
                        PayPal
                    </label>
                </div><br />
                <div className="form-check payment">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" disabled />
                    <label className="form-check-label text-dark" for="flexRadioDefault2">
                        Cash On Delivery
                    </label>
                </div><br />
                <div className='d-grid'> 
                    <Link to='/preview' className='text-center'><button type="submit" className="btn btn-primary form-inputs checkout-btn">Continue</button></Link>
                </div>
            </form> <br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div>
    )
}

export default Payment;