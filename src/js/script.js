import { getAllProducts } from './api.js';

const getSingleProduct = async () => {
  const res = await fetch('https://dummyjson.com/products/search?q=hat');
  const data = await res.json();
  console.log(data);
};

getSingleProduct();
