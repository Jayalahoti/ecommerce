import { combineReducers } from 'redux';
import { userReducer } from './user/userReducer';
import { CartReducer } from './cart/cartReducer'

export const combineReducer = combineReducers({ userReducer: userReducer, CartReducer: CartReducer });