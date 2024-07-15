import * as model from './model.js';

import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import productView from './views/productView.js';

// const getSingleProduct = async () => {
//   const res = await fetch('https://dummyjson.com/products');

//   const data = await res.json();
//   console.log(data);
// };

// getSingleProduct();

const controlSearchResults = async () => {
  try {
    resultView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load serach results
    await model.loadSearchResults(query);

    // Render results
    resultView.render(model.getSearchResults());
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  searchView.addHandlerSearch(controlSearchResults);
  productView.addHandlerRender(controlProducts);
};

init();
