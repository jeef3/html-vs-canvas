'use strict';

(function () {
  var canvas = document.getElementById('canvas');
  var html = document.getElementById('html');

  var objects = [];
  var objectCount = 10;

  var width = 400;
  var height = 400;

  var stage = new createjs.Stage(canvas);
  var addToCanvas = function (o) {
    var shape = new createjs.Shape();
    shape.graphics
      .beginFill('#cc5555')
      .drawCircle(o.pos.x, o.pos.y, (o.size) / 2);

    o.canvasNode = shape;

    stage.addChild(shape);
  };

  var addToHtml = function (o) {
    var el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.top = o.pos.y + 'px';
    el.style.left = o.pos.x + 'px';
    el.style.width = o.size + 'px';
    el.style.height = o.size + 'px';
    el.style.borderRadius = '50%';
    el.style.background = '#cc5555';

    o.htmlNode = el;

    html.appendChild(el);
  };

  // Build objects
  var i;
  for (i = 0; i < objectCount; i++) {
    objects.push({
      name: 'o-' + i,
      pos: {
        x: Math.round(Math.random() * width),
        y: Math.round(Math.random() * height)
      },
      direction: Math.round(Math.random() * 360),
      speed: 100,
      size: Math.round(Math.random() * 30) + 10
    });
  }

  var move = function (obj) {
    var newPos = {
      x: Math.sin(obj.direction) * obj.speed,
      y: Math.cos(obj.direction) * obj.speed
    };

    if (newPos.x < 0) {
      newPos.x = Math.abs(newPos.x);
    }

    if (newPos.x > width) {
      newPos.x = width - (newPos.x - width);
    }

    if (newPos.y < 0) {
      newPos.y = Math.abs(newPos.y);
    }

    if (newPos.y > height) {
      newPos.y = height - (newPos.y - height);
    }

    obj.pos = newPos;
  };

  // Place objects in scene
  objects.forEach(function (o) {
    addToCanvas(o);
    addToHtml(o);
  });
  stage.update();

  // Start animation
})();
