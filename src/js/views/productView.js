import View from './View.js';

class ProductView extends View {
  _parentElement = document.querySelector('.overlay');

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  addHandlerClose(handler) {
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === 'childList') {
          const closeEl = this._parentElement.querySelector('.modal__close');

          if (closeEl) {
            closeEl.addEventListener('click', (e) => {
              this._clear();
              this._parentElement.classList.add('hidden');
              handler();
            });

            return;
          }
        }
      }
    });

    observer.observe(this._parentElement, { childList: true, subtree: true });

    // this._parentElement.querySelector('.overlay').addEventListener('click', (e) => {
    //   e.target.classList.add('hidden');
    // });
    // this._parentElement.querySelector('.modal__close').addEventListener('click', (e) => {
    //   e.target.classList.add('hidden');
    // });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.modal__btn--bookmarks');
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
    <div class="modal">
      <div class="modal__images">
        <figure class="modal__images-show">
          <img
            src="${this._data.images[0]}"
            alt="Test"
          />
        </figure>

        <ul class="modal__images-list">
          ${this._data.images
            .map((img) => {
              return `
            <li class="modal__images-item">
            <button>
              <figure class="modal__images-item--small">
                <img
                  src="${img}"
                  alt="Test"
                />
              </figure>
            </button>
          </li>
            `;
            })
            .join('')}          
        </ul>
      </div>
      <div class="modal__content">
        <p class="modal__rating">${this._data.rating} stars</p>
        <p class="modal__brand">${this._data.brand}</p>
        <h4 class="modal__title">${this._data.title}</h4>
        <p class="modal__description">
          ${this._data.description}
        </p>
        <div class="modal__stock">
          <h5 class="modal__stock-status">Status: ${this._data.availabilityStatus}</h5>
          <p class="modal__stock-qty">Available numbers: ${this._data.stock}</p>
        </div>
        <div class="modal__price">
          <div class="modal__price-sell">$${((this._data.price * (100 - this._data.discountPercentage)) / 100).toFixed(
            2,
          )}</div>
          <div class="modal__price-discount">${this._data.discountPercentage}% off</div>
          <div class="modal__price-origin">$${this._data.price}</div>
        </div>
        <div class="modal__tags">
        ${this._data.tags
          .map((tag) => {
            return `<span class="preview__tags-tag">${tag}</span>`;
          })
          .join('')} 
        </div>
        <button class="modal__btn modal__btn--bookmarks">
          <svg class="modal__icon">
            <use href="./src/img/icons.svg#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
          </svg>
          <span>Bookmarks</span>
        </button>
      </div>
      <button class="modal__close">X</button>
    </div>
    `;
  }
}

export default new ProductView();
