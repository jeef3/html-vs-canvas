'use strict';

class CanvasTest {
  constructor(parent, size) {
    this.el = document.createElement('canvas');
    this.el.className = 'test-container';

    this.size(size);

    this.stage = new createjs.Stage(this.el);
    this.stage.scaleX = window.devicePixelRatio;
    this.stage.scaleY = window.devicePixelRatio;

    parent.appendChild(this.el);
  }

  size(size) {
    this.el.width = size.width * window.devicePixelRatio;
    this.el.height = size.height * window.devicePixelRatio;
    this.el.style.width = size.width + 'px';
    this.el.style.height = size.height + 'px';
  }

  addObject(object) {
    var shape = object.canvasNode = new createjs.Shape();
    shape.x = object.pos.x;
    shape.y = object.pos.y;

    shape.graphics
      .beginFill('#cc5555')
      .drawCircle(0, 0, (object.size) / 2);

    this.stage.addChild(shape);
  }

  updateObject(object) {
    object.canvasNode.x = object.pos.x;
    object.canvasNode.y = object.pos.y;
  }

  update() {
    this.stage.update();
  }
}

export default CanvasTest;
