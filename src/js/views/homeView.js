import View from './View.js';

class HomeView extends View {
  _parentElement = document.querySelector('.header__heading');

  addHandlerRenderHomePage(handler) {
    this._parentElement.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new HomeView();
