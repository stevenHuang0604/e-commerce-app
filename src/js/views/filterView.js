import View from './View.js';

class FitlerView extends View {
  _parentElement = document.querySelector('.filter');

  addHandlerRender(handler) {
    this._parentElement.addEventListener('click', (e) => {
      if (!e.target.id) return;
      handler(e.target.id);
    });
  }
}

export default new FitlerView();
