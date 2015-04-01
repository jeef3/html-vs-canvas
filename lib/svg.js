'ust strict';

class SvgTest {
  constructor(parent, size) {
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.el.setAttribute('class', 'test-container');

    this.size(size);

    parent.appendChild(this.el);
  }

  size(size) {
    this.el.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
    this.el.setAttribute('width', size.width);
    this.el.setAttribute('height', size.height);
  }

  addObject(object) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.setAttribute('cx', object.pos.x);
    el.setAttribute('cy', object.pos.y);
    el.setAttribute('r', object.size);
    el.setAttribute('fill', '#cc5555');

    object.svgNode = el;

    this.el.appendChild(el);
  }

  updateObject(object) {
    object.svgNode.setAttribute('cx', object.pos.x);
    object.svgNode.setAttribute('cy', object.pos.y);
  }

  update() {}
}

export default SvgTest;
