import React from 'react';
import './home.css';
import Navbar from './navbar';
import AllProductsContextProvider from '../context/AllproductsContext';
import ProductSlider from './productSlider';

const Home = () => {
  return (
    <div>
      <Navbar />

      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://fabrics.charu.org.in/wp-content/uploads/2020/09/0.jpg" className="d-block w-75 brands-img" alt="Global desi" />
            <div className="carousel-caption brand-name">
              <h5>Global Desi</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://www2.hm.com/hm-logo.png" className="d-block w-75 brands-img" alt="H & M" />
            <div className="carousel-caption brand-name">
              <h5>H&M</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://shopforaureliafront.gumlet.io/images/aurelia-logo.jpg" className="d-block w-75 brands-img" alt="Aurelia" />
            <div className="carousel-caption brand-name">
              <h5>Aurelia</h5>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <hr /><br></br>

      <AllProductsContextProvider>
        <ProductSlider />
      </AllProductsContextProvider>

      <br></br>
      <div className='text-center'>All Rights Reserved</div>
    </div>
  )
}

export default Home;