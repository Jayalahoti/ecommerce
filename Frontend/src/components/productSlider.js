//Slider Page

import React from 'react'
import Card from './sliderCard';
import AllProductsContextProvider, { useAllProductsContext } from '../context/AllproductsContext';


const ProductSlider = () => {

    const { allproducts } = useAllProductsContext();
    console.log(allproducts);

    const getRandomProducts = () => {
        return allproducts.sort(() => 0.5 - Math.random()).slice(0, 4)
    }

    return (
        <AllProductsContextProvider>
            <div>
                <h3>Featured Products</h3><br />
                <br />
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className='row'>
                                {allproducts && getRandomProducts().map(product => {
                                    console.log(product._id);
                                    return (
                                        <div className='col d-none d-md-block'><Card productData={product} /></div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div><br />
            </div>
        </AllProductsContextProvider>
    )
}

export default ProductSlider;