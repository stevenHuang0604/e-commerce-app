import View from './View.js';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link  ${this._data.id === id ? `preview__link--active` : ''}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img
                  src="${this._data.thumbnail}"
                  alt="${this._data.title}"
                />
              </figure>
              <div class="preview__data">
                <p class="preview__rating">${this._data.rating} ✨</p>
                <h4 class="preview__title">${this._data.title}</h4>
                <div class="preview__price">
                  <div class="preview__price-sell">$${(
                    (this._data.price * (100 - this._data.discountPercentage)) /
                    100
                  ).toFixed(2)}</div>
                  <div class="preview__price-discount">${this._data.discountPercentage}% off</div>
                  <div class="preview__price-origin">$${this._data.price}</div>
                </div>
                <div class="preview__tags">
                ${this._data.tags
                  .map((tag) => {
                    return `<span class="preview__tags-tag">${tag}</span>`;
                  })
                  .join('')}               
                </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new PreviewView();
