import * as model from './model.js';

import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import productView from './views/productView.js';
import bookmarksView from './views/bookmarksView.js';
import filterView from './views/filterView.js';
import homeView from './views/homeView.js';

const controlProducts = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //  Load product
    await model.loadProductById(id);

    // Render product
    productView.render(model.getProduct());
  } catch (err) {
    console.error(err);
  }
};

const controlSearchResults = async () => {
  try {
    resultView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) {
      resultView.renderError();
      return;
    }

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultView.render(model.getSearchResults());
  } catch (err) {
    console.log(err);
  }
};

const controlClose = () => {
  // Back to original page
  model.getHomeQueryUrl();

  // Render results
  resultView.render(model.getSearchResults());
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = () => {
  // Add/Remove bookmark
  if (!model.state.product?.bookmarked) {
    model.addBookmark(model.state.product);
  } else {
    model.deleteBookmark(model.state.product.id);
  }

  // Render product view
  productView.update(model.state.product);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlFitler = (filterType) => {
  // Render results
  resultView.render(model.getFilterResults(filterType));
};

const controlHomePage = () => {
  model.clearState();

  resultView.render(model.getSearchResults());
};

const init = () => {
  // Search query then render results as preview
  searchView.addHandlerSearch(controlSearchResults);

  // Render modal
  productView.addHandlerRender(controlProducts);

  // Close modal
  productView.addHandlerClose(controlClose);

  // Add product to bookmark
  productView.addHandlerAddBookmark(controlAddBookmark);

  // Render bookmark
  bookmarksView.addHandlerRender(controlBookmarks);

  // Filter preview
  filterView.addHandlerRender(controlFitler);

  // Return to home page
  homeView.addHandlerRenderHomePage(controlHomePage);

  // Change modal show image
  productView.addHandlerChangeImage();
};

window.addEventListener('DOMContentLoaded', () => {
  model.getHomeQueryUrl();

  init();
});
