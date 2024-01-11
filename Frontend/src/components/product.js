//each prodcut page

import React, { useEffect, useState } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './product.css';
import Navbar from './navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartActions';
import Rating from './rating';

const Product = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const qty = 1;
    const [product, setProduct] = useState('');
    const [addedtoCart, setAddedtoCart] = useState(false);

    const params = useParams();

    const token = localStorage.getItem("token");

    const getProduct = async () => {
        const res = await axios.get(`${API_BASE_URL}/product/${params.id}`);
        if (res.status === 200) {
            setProduct(res.data.product);
        } else {
            console.log("Some Error occured");
        }
    };

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const getReview = (e) => {
        e.preventDefault();
        const req = { rating, comment };
        const res = axios.post(`${API_BASE_URL}/review/${params.id}`, req, CONFIG_OBJ);
        if (res.status === 201) {
            alert("review submitted!");
            setRating(0);
            setComment('');
        }
    }

    const addtocartHandler = () => {
        if (!token) {
            alert("please Login to continue!");
        } else {
            dispatch(addToCart(params.id, qty));
            setAddedtoCart(true);
        }
    }

    // const addtocart = () => {
    //     cart.addtocart(product, count);
    // }

    // const CONFIG_OBJ = {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer " + localStorage.getItem("token")
    //     }
    // }

    // const addtocart = async () => {
    //     try {
    //         if (!token) {
    //             alert("Please Login to continue further!")
    //         } else {
    //             const req = { productId: params.id, count}
    //             const res = await axios.post(`${API_BASE_URL}/addtocart/${params.id}`, req, CONFIG_OBJ);
    //             if (res.status === 201) {
    //                 console.log(res.data.cart);
    //                 setAddedtoCart(true);
    //                 alert("Item added to cart");
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // Fetch data
    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
            <Navbar /><br></br>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img className='product-img' src={`${API_BASE_URL}/uploads/${product.imageURL}`} alt={product.product} />
                    </div>
                    <div className='col-md-3 product-details'>
                        <h2>{product.product}</h2>
                        <hr></hr>
                        <p><FontAwesomeIcon icon={faStar} /> 10 reviews</p>
                        <hr></hr>
                        <h6>Price: ${product.price}</h6>
                        <hr></hr>
                        <h6>Description:</h6>
                        <h6>{product.description}</h6>
                    </div>
                    <div className='col-md-3 seller'>
                        <div className="card" style={{ width: "16rem" }}>
                            <ul className="list-group list-group-flush mx-3">
                                <li className="list-group-item">
                                    <h6>Seller</h6>
                                    <h4><u>{product.brand}</u></h4>
                                    <div className='ProductCard__Rateing'>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />
                                    </div>
                                </li>
                                <li className="list-group-item d-flex">
                                    <h6>Price:</h6>
                                    <h6 className='ms-6'>${product.price}</h6>
                                </li>
                                <li className="list-group-item d-flex">
                                    <h6>Status: </h6>
                                    <h6>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</h6>
                                </li>
                                {addedtoCart ? <li className="list-group-item text-center">
                                    <Link to='/cart' params={product}><button className='product-btn btn btn-primary' type='submit'>Go to Cart</button></Link>
                                </li> : <li className="list-group-item text-center">
                                    <button className='product-btn btn btn-primary' type='submit' onClick={() => addtocartHandler()}>Add to Cart</button>
                                </li>}

                            </ul>
                        </div>
                    </div>
                </div><br></br>
                <div className='row'>
                    <h2>Reviews</h2>
                    <div className='review-block'>
                        There is no review
                    </div>
                </div><br></br>
                <div className='row'>
                    <h2>Write a customer review</h2>
                    <h6>Rating</h6>
                    <form onSubmit={() => getReview()}>
                        <select className="form-select" aria-label="Default select example" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option selected>5</option>
                            <option value="1">4</option>
                            <option value="2">3</option>
                            <option value="3">2</option>
                            <option value="4">1</option>
                        </select> <br></br>
                        <form class="form-floating">
                            <input type="text" class="form-control" id="floatingInputValue" value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                            <label for="floatingInputValue">Comments</label>
                        </form> <br></br>
                        <button className='product-btn btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
            </div><br></br>
            <div className='text-center'>All Rights Reserved</div>
        </>
    )
}

export default Product;