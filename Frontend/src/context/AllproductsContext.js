import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AllProductsContext = createContext();

function AllProductsContextProvider({ children }) {
  // Initialize state
  const [allproducts, setAllproducts] = useState([]);

  const getAllproducts = async () => {
    const res = await axios.get(`${API_BASE_URL}/allproducts`);
    console.log("entered all products context");
    if (res.status === 200) {
        setAllproducts(res.data.Allproducts);
        console.log(res.data.Allproducts);
    } else {
        console.log("Some Error occured");
    }
}

  // Fetch data
  useEffect(() => {
    getAllproducts();
  }, []);

  return (
    <AllProductsContext.Provider value={{ allproducts, setAllproducts }}>
      {children}
    </AllProductsContext.Provider>
  );
}

export default AllProductsContextProvider;

export const useAllProductsContext=()=>{
    return useContext(AllProductsContext);
}