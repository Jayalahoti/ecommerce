//edit product form

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import Navbar from './navbar';

const EditProduct = () => {

    const params = useParams();

    const [prod, setProd] = useState("");

    const navigate = useNavigate();

    const getProduct = async () => {
        const res = await axios.get(`${API_BASE_URL}/product/${params.id}`);
        if (res.status === 200) {
            setProd(res.data.product);
        } else {
            console.log("Some Error occured");
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const [product, setProduct] = useState(prod.product);
    const [description, setDescription] = useState(prod.description);
    const [price, setPrice] = useState(prod.price);
    const [stock, setStock] = useState(prod.stock);
    const [loading, setLoading] = useState(false);

    const editproduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const req = { product, description, price, stock };
        const res = await axios.put(`${API_BASE_URL}/editproduct/${params.id}`, req);
        if (res.status === 200) {
            alert('Product Updated!');
            setLoading(false);
            setProduct("");
            setPrice(0);
            setStock(0);
            setDescription("");
            navigate('/allproducts');
        } else {
            console.log("Some error occured!");
        }
    }

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
                        <Link className="nav-link" to='/allusers'>Manage Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/allorders'>Manage Orders</Link>
                    </li>
                </ul>
            </div><br></br>
            <h1>Edit Product</h1><br/>
            <form className='user-form text-center' onSubmit={(e) => editproduct(e)}>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}

                <input type='text user-login' className='form-control mt-3' placeholder={prod.product}
                    value={product} onChange={(e) => setProduct(e.target.value)} />

                <input type='text' className='form-control mt-3' 
                    value={prod.category} disabled />

                <input type='text' className='form-control mt-3'
                    value={prod.brand} disabled />

                <input type='text' className='form-control mt-3' placeholder={prod.price}
                    value={price} onChange={(e) => setPrice(e.target.value)} />

                <input type='text' className='form-control mt-3' placeholder={prod.stock}
                    value={stock} onChange={(e) => setStock(e.target.value)} />

                <textarea className="form-control mt-3" id="exampleFormControlTextarea1" placeholder={prod.description}
                    rows="3" value={prod.description} onChange={(e) => setDescription(e.target.value)}></textarea>

                <button className='btn btn-primary cart-btn mt-3' type='submit'>Save Product</button>
            </form><br></br>
            <div className='text-center'>All Rights Reserved</div>
        </div>
    )
}

export default EditProduct;
