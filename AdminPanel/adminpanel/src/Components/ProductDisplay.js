import React, { useState, useEffect } from 'react'; //importing libraries React and hooks
import "./ProductDisplay.css";

const ProductDisplay = () => {
  //we created useState Hook to save fetched products
  const [products, setProducts] = useState([]);

  //useEffect hook to fetch and display products
  useEffect(() => {

    const fetchProducts = async () => {
      try { //for error handling
        //fetch data from backend using api 
        const response = await fetch('http://localhost:5000/api/products');

        if (response.ok) {
          const data = await response.json(); //if response is ok, convert that response in JSON format from string format
          setProducts(data);  //useState function
        } else {
          console.error('Error fetching products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
return (
    <div className='productArea'>
      <h2>Product List</h2>
      <div className='productDisplay'>
        {/* //we use map function to iterate through all products stored in "products" variable and then show them in UI with help of HTML and CSS */}
        {products.map((product) => (
          <div key={product._id}><div className='productCard'>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.imageUrl} alt={product.name} /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;