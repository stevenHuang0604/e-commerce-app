import { API_URL } from './config.js';
import { AJAX } from './helper.js';

export const state = {
  product: {},
  search: {
    query: '',
    results: [],
  },
  bookmarks: [],
};

export const loadSearchResults = async (query) => {
  try {
    const data = await AJAX(`${API_URL}/search?q=${query}`);
    console.log(data);

    state.search.query = query;
    state.search.results = data.products;
  } catch (err) {
    throw err;
  }
};

export const loadProductById = async (id) => {
  try {
    const product = await AJAX(`${API_URL}/${id}`);
    state.product = product;
  } catch (err) {
    throw err;
  }
};

export const getSearchResults = () => {
  return state.search.results;
};

export const getProduct = () => {
  return state.product;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = (product) => {
  // Add bookmark
  state.bookmarks.push(product);

  // Mark current product as bookmark
  if (product.id === state.product.id) state.product.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = (id) => {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current product as NOT bookmark
  if (id === state.product.id) state.product.bookmarked = false;
  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const getQuery = () => {
  return state.search.query;
};

export const getHomeQueryUrl = () => {
  // window.location.replace(window.location.origin);
  history.pushState({ path: window.location.origin }, '', window.location.origin);
};

// export const setQueryUrl = (query) => {
//   const searchURL = new URL(`${window.location.href}search`);
//   let searchParams = new URLSearchParams({ query: query });
//   searchURL.search = searchParams;

//   history.pushState({ path: searchURL.href }, '', searchURL.href);
// };

// export const getUrl = () => {
//   console.log(window.location);
// };
