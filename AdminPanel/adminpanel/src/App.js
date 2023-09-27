import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AddProduct from './Components/AddProduct';
import ProductDisplay from './Components/ProductDisplay';
import "./App.css";
//creating a usestate hook to store product data

function App(){
  

  return (
    <BrowserRouter>
    <div className='appBody'>
      <Header />
      <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
   
      <Footer />
    </div>
    </BrowserRouter>
  );
};

export default App;
