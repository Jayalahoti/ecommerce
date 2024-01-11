
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Product from './components/product';
import Cart from './components/cart';
import Login from './components/login';
import Signup from './components/signup';
import Shipping from './components/shipping';
import Payment from './components/payment';
import Preview from './components/preview';
import Order from './components/order';
import Userprofile from './components/userprofile';
import History from './components/history';
import Allproducts from './components/allproducts';
//import Card from './components/sliderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from './redux/cart/cartActions';
import Admin from './components/admin';
import AddProduct from './components/addProduct';
import ManageUsers from './components/manageusers';
import ManageOrders from './components/allorders';
import Edituser from './components/edituser';
import EditProduct from './components/editProduct';

function App() {
  const user = useSelector((state) => state.userReducer);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

    useEffect(() => {
      if (token) {
        dispatch(fetchCart());
      }
    }, [dispatch])


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path='/product' element={<Product/>}></Route> */}
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/preview' element={<Preview />}></Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path='/userprofile' element={<Userprofile />}></Route>
          <Route path='/history' element={<History />}></Route>
          <Route path='/allproducts' element={<Allproducts />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/shipping' element={<Shipping />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/addproduct' element={<AddProduct />}></Route>
          <Route path='/allusers' element={<ManageUsers />}></Route>
          <Route path='/allorders' element={<ManageOrders />}></Route>
          <Route path='/edituser/:id' element={<Edituser />}></Route>
          <Route path='/editproduct/:id' element={<EditProduct />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
