import { API_BASE_URL } from '../../config';
import * as actionTypes from './cartConstants'
import axios from 'axios';

const CONFIG_OBJ = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}

export const addToCart = (id, qty) => async dispatch => {
    const product = await axios.get(`${API_BASE_URL}/product/${id}`)
    const req = { productId: id, count: qty }
    const res = await axios.post(`${API_BASE_URL}/addtocart/${id}`, req, CONFIG_OBJ);
    if (res.status === 201) {
        console.log(res.data.cart);
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
                product: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                countInStock: product.stock,
                qty,
            },
        })
    };
    axios.post(`${API_BASE_URL}/addtocart/${id}`, req, CONFIG_OBJ)
};

export const removeFromCart = ({ pId, _id }) => dispatch => {
    const res = axios.delete(`${API_BASE_URL}/deleteitem/${_id}`, CONFIG_OBJ)
    if (res.status === 200) {
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: pId,
        })
    }
}

export const fetchCart = () => async dispatch => {
    try {
        const res = await axios.get(`${API_BASE_URL}/cart`, CONFIG_OBJ);
        if (res.status === 200) {
            const cart = res.data.carts;
            //console.log(res.data.carts);
            dispatch({
                type: actionTypes.FETCH_MY_CART,
                payload: {
                    cart: cart
                },
            })
        }
    } catch (error) {
        alert("Some error occured");
        console.log(error);
    }
}


