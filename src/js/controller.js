import * as model from './model.js';

import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import productView from './views/productView.js';
import bookmarksView from './views/bookmarksView.js';

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

  // Get query
  const query = model.getQuery();

  // Set URL qeury params
  // model.setQueryUrl(query);

  // Render results
  resultView.render(model.getSearchResults());
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = () => {
  // Add/Remove bookmark
  if (!model.state.product.bookmarked) model.addBookmark(model.state.product);
  else model.deleteBookmark(model.state.product.id);

  // Render product view
  productView.update(model.state.product);
  console.log(model.state);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = () => {
  // Search query then render results as preview
  searchView.addHandlerSearch(controlSearchResults);

  // Render modal
  productView.addHandlerRender(controlProducts);

  // Close modal
  productView.addHandlerClose(controlClose);
  productView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
};

init();
