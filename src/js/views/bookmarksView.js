import View from './View.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  addHandlerRender(handler) {
    handler();
  }

  _generateMarkup() {
    const markup = this._data
      .map((d) => {
        return `
      <li class="bookmarks__item">
        <figure class="bookmarks__item-fig">
          <img
             src="${d.thumbnail}"
             alt="${d.title}"
          />
        </figure>
        <p class="bookmarks__item-title">${d.title}</p>
      </li>
    `;
      })
      .join('');

    return markup;
  }
}

export default new BookmarksView();
