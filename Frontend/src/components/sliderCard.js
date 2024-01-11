import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';


// Each card in the slider imported from this separate card component

const Card = (props) => {

    return (
        // Enter data in each card using props
        <div className="card" style={{ width: '18rem' }}>
            <div>
                <div>
                    <Link to={`/product/${props.productData._id}/`}><img src={`${API_BASE_URL}/uploads/${props.productData.imageURL}`}
                        className="card-img-top d-flex" alt={props.productData.product} /></Link>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.productData.product}</h5>
                    <h5>${props.productData.price}</h5>
                    <p className="card-text">
                        {props.productData.description}
                    </p>
                    <Link to={`/product/${props.productData._id}/`} className="btn btn-primary cart-btn">
                        View Product
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Card;