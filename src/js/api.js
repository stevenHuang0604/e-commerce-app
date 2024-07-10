const getAllProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=200');

  const data = await res.json();
  return data;
};

const getProductById = async (id) => {
  return data;
};

export { getAllProducts, getProductById };
