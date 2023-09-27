import React, { useState } from 'react';
import axios from 'axios';

function AddProduct(){
const [productData, setProductData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  //to handle any change when we write details in the form.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  //how to submit form data using API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST method request to the backend API to add the product
      const response = await axios.post('http://localhost:5000/api/products',productData);
// if (response.ok) {
    console.log(response);
        alert('Product added successfully');
        // Optionally, clear the form inputs after successful submission
        setProductData({ name: '', description: '', imageUrl: '' });
      // } else {
      //   alert('Error adding product else');
      // }
    } catch (error) {
      console.error('Error adding product:', error);
      // alert('Error adding product catch');
    }
  };
  return(
    <>
    <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
        />
<input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={productData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </>
  )
}

export default AddProduct;