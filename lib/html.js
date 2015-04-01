'use strict';

class HtmlTest {
  constructor(parent, size) {
    this.el = document.createElement('div');
    this.el.className = 'test-container';

    this.size(size);

    parent.appendChild(this.el);
  }

  size(size) {
    this.el.style.width = size.width + 'px';
    this.el.style.height = size.height + 'px';
  }

  addObject(object) {
    var el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.top = object.pos.y + 'px';
    el.style.left = object.pos.x + 'px';
    el.style.width = object.size + 'px';
    el.style.height = object.size + 'px';
    el.style.borderRadius = '50%';
    el.style.background = '#cc5555';

    object.htmlNode = el;

    this.el.appendChild(el);
  }

  updateObject(object) {
    object.htmlNode.style.left = object.pos.x + 'px';
    object.htmlNode.style.top = object.pos.y + 'px';
  }

  update() {}
}

export default HtmlTest;
