import { getAllProducts } from './api.js';
import { API_URL } from './config.js';

const getSingleProduct = async () => {
  const res = await fetch('https://dummyjson.com/products/search?q=shoes');
  const data = await res.json();
  console.log(data);
};

getSingleProduct();
