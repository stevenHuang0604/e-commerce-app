import View from './View.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No products in bookmarks! Please add some items.';

  addHandlerRender(handler) {
    handler();
  }

  _generateMarkup() {
    const markup = this._data
      .map((d) => {
        return `
      <li class="bookmarks__item">
        <a class="bookmarks__item-link" href="#${d.id}"}>
          <figure class="bookmarks__item-fig">
            <img
              src="${d.thumbnail}"
              alt="${d.title}"
            />
          </figure>
          <p class="bookmarks__item-title">${d.title}</p>
        </a>
      </li>
    `;
      })
      .join('');

    return markup;
  }
}

export default new BookmarksView();
