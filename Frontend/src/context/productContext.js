//Context for each product

import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  // Initialize state
  const [product, setProduct] = useState("");

  const getProduct = async () => {
    const res = await axios.get(`${API_BASE_URL}/products/:id`);
    if (res.status === 200) {
        setProduct(res.data.product);
        console.log(res.data.product);
    } else {
        console.log("Some Error occured");
    }
}

  // Fetch data
  useEffect(() => {
    getProduct();
    }, []);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;

export const useProductContext=()=>{
    return useContext(ProductContext);
}