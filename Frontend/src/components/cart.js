//cart page (all products in cart for a signedin user)

import React, { useEffect, useState } from 'react';
import './cart.css'
import Navbar from './navbar';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cart/cartActions';
import CartCard from './cartCard';

const Cart = () => {

    var total = 0;
    var totalAmount = 0;
    
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.CartReducer);
    

    const quantityHandler = (id, qty) => {
        dispatch(addToCart(id, qty))
    }
    

    const [cartItems, setCartItems] = useState([]);

    const removeFromCartHandler = (item) => {
        dispatch(removeFromCart({ pId: item.productId._id, _id: item._id }));
        getCart();
        alert("Item deleted!")
    };

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const getCart = async () => {
        const res = await axios.get(`${API_BASE_URL}/cart`, CONFIG_OBJ);
        if (res.status === 200) {
            setCartItems(res.data.carts);
            console.log(res.data.carts);
        } else {
            alert("Some error occured!");
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    return (
        <>
            <Navbar /><br></br>
            <div className='mx-3'>
                <h1 className='cart-heading'>Shopping Cart</h1><br></br>
                {cartItems.length == 0 ? (
                    <h6>Your Cart is empty <Link to='/'>Go Back</Link></h6>
                ) : (<div className='container'>
                    <div className='row'>
                        {/* <div className='row'> */}
                        {cartItems.map((item) => {
                            total = item.count + total;
                            totalAmount = item.productId.price*item.count + totalAmount;
                            console.log(total);
                            return (
                                <div className='col-md-9 d-block d-flex mb-3'>
                                    <CartCard
                                        key={item.productId}
                                        item={item}
                                        removeFromCartHandler={() => removeFromCartHandler(item)}
                                        quantityHandler={quantityHandler}
                                    />
                                    
                                </div>
                            )
                        })}

                        <div className='col-md-3'>
                            <div className="card" style={{ width: "20rem" }}>
                                <ul className="list-group list-group-flush mx-3">
                                    <li className="list-group-item"><h5>Subtotal ({total} Items): ${totalAmount}</h5></li>
                                    <li className="list-group-item mx-auto">
                                        <Link to='/shipping'><button className='checkout-btn btn btn-primary mx-auto' type='submit'>Proceed to Checkout</button></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>)}

            </div><br></br>
            <div className='text-center'>All Rights Reserved</div>
        </>
    )
}

export default Cart;