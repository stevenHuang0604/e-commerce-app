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

export const getSearchResults = () => {
  return state.search.results;
};
