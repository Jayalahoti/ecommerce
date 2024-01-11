import { applyMiddleware, createStore } from "redux";
import { combineReducer } from "./combineReducer";
import { thunk } from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';

const cartItemsInLocalStorage = localStorage.getItem('cart');

const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage,
    },
}

export const store = createStore(
    combineReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(thunk))
)