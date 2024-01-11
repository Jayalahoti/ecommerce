//each product in cart

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './cart.css'
import { addToCart } from '../redux/cart/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';

const CartCard = ({ item, removeFromCartHandler, quantityHandler}) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.CartReducer);
    console.log(cart);

    const handelQuantityIncrement = (e) => {
        if (item.count < item.productId.stock) {
            item.count++;
            console.log(item.count);
        } else {
            alert("Product not available in stock")
        }
        quantityHandler(item._id, item.count);
        
        return item.count
    };

    const handelQuantityDecrement = (e) => {
        try {
            if (item.count > 1) {
                --item.count;
                console.log(item.count);
                dispatch(addToCart(item._id, item.count))
            }
            console.log("Entered decerement");
            quantityHandler(item._id, item.count);
            return item.count
        } catch (error) {
            console.log(error);
        }
        
    };
    
    return (
        <div>
            <div className="card">
                <div className="card-body cart-card d-flex">
                    <div className='cart-item my-auto d-flex'>
                        <img className='cart-img d-flex my-auto' src={`${API_BASE_URL}/uploads/${item.productId.imageURL}`} alt={item.productId.product} />
                        <a className='my-auto' href='#'>{item.productId.product}</a>
                    </div>
                    <div className='cart-item my-auto d-sm-flex'>
                        <button className='btn' type='button'><FontAwesomeIcon icon={faCircleMinus} onClick={(e)=>handelQuantityDecrement(e)} /></button>
                        <p className='mt-3'>{item.count}</p>
                        <button className='btn' type='button'><FontAwesomeIcon icon={faCirclePlus} onClick={(e)=>handelQuantityIncrement(e)} /></button>
                    </div>
                    <p className='cart-item my-auto'>${item.productId.price}</p>
                    <div className='cart-item my-auto'>
                        <button className='btn btn-danger' type='submit' onClick={() => removeFromCartHandler(item)}><FontAwesomeIcon ty icon={faTrash} /></button>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default CartCard;