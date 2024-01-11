//this page allows adding of new product

import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import './login.css'

function AddProduct() {
    const [product, setProduct] = useState({
        product: '',
        description: '',
        price: 120,
        imageURL: null,
        category: '',
        brand: '',
        stock: 1
    });

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('product', product.product);
        formData.append('price', product.price);
        formData.append('imageURL', product.imageURL);
        formData.append('description', product.description);
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        formData.append('stock', product.stock);
        try {
            const res = await axios.post(`${API_BASE_URL}/addproduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data.product);
            setLoading(false);
            alert('Product Added');
        } catch (error) {
            console.log(error);
        }
    }

    return (<div>
        <Navbar />
        <div className='container'>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link active" to='/addproduct'>Add Product</Link>
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
        <h1>Add New Product</h1> <br></br>
        <form className='user-form text-center' onSubmit={submitHandler}>
            {loading ? <div className='col-md-12 mt-3 text-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : ''}

            <input type='text user-login' className='form-control mt-3' placeholder='Name of the Product'
                value={product.product} onChange={(e) => setProduct({ ...product, product: e.target.value })} />

            <input type='text' className='form-control mt-3' placeholder='Category'
                value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />

            <input type='text' className='form-control mt-3' placeholder='Brand'
                value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })} />

            <input type='text' className='form-control mt-3' placeholder='Price of product'
                value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />

            <input type='text' className='form-control mt-3' placeholder='Stock no.'
                value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} />

            <textarea className="form-control mt-3" id="exampleFormControlTextarea1" placeholder='Enter product Description'
                rows="3" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>

            <input type='file' className='form-control mt-3'
                onChange={(e) => { setProduct({ ...product, imageURL: e.target.files[0] }) }} />

            <button className='btn btn-primary cart-btn mt-3' type='submit'>Add Product</button>
        </form><br></br>
        <div className='text-center'>All Rights Reserved</div>
    </div>);
}

export default AddProduct;