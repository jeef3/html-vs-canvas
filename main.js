'use strict';

(function () {
  var canvas = document.getElementById('canvas');
  var html = document.getElementById('html');

  var objects = [];
  var objectCount = 500;

  document.getElementById('count').innerHTML = objectCount;
  var frameRateEl = document.getElementById('frame-rate');

  var width = 400;
  var height = 400;

  var stage = new createjs.Stage(canvas);
  var addToCanvas = function (o) {
    var shape = o.canvasNode =new createjs.Shape();
    shape.x = o.pos.x;
    shape.y = o.pos.y;

    shape.graphics
      .beginFill('#cc5555')
      .drawCircle(0, 0, (o.size) / 2);

    stage.addChild(shape);
  };

  var updateCanvas = function (o) {
    o.canvasNode.x = o.pos.x;
    o.canvasNode.y = o.pos.y;
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

  var updateHtml = function (o) {
    o.htmlNode.style.left = o.pos.x + 'px';
    o.htmlNode.style.top = o.pos.y + 'px';
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
      speed: Math.random() / 10,
      size: Math.round(Math.random() * 30) + 10
    });
  }

  var nextPos = function (obj, delta) {
    var distance = obj.speed * delta;
    var angle = obj.direction * (Math.PI / 180);
    var newPos = {
      x: obj.pos.x + (Math.sin(angle) * distance),
      y: obj.pos.y + (Math.cos(angle) * distance)
    };

    if (newPos.x < 0) {
      newPos.x = Math.abs(newPos.x);
      obj.direction = obj.direction - ((obj.direction - 180) * 2);
    }

    if (newPos.x > width) {
      newPos.x = width - (newPos.x - width);
      obj.direction = obj.direction - ((obj.direction - 180) * 2);
    }

    if (newPos.y < 0) {
      newPos.y = Math.abs(newPos.y);
      obj.direction = 180 - (obj.direction);
    }

    if (newPos.y > height) {
      newPos.y = height - (newPos.y - height);
      obj.direction = 180 - (obj.direction);
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
  var move = function (delta) {
    objects.forEach(function (o) {
      nextPos(o, delta);
      updateCanvas(o);
      updateHtml(o);
    });
    stage.update();
  };

  var fpss = [];
  var averages = [];
  var fps = function (ms) {
    fpss.push(ms);

    if (fpss.length > 10) {
      fpss.shift();
    }

    var sum = fpss.reduce(function (a, b) { return a + b; });
    var average = Math.round(sum / fpss.length);

    averages.push(average);

    if (averages.length > 100) {
      averages.shift();
    }

    return average;
  };

  var last;
  var step = function (ts) {
    if (!last) { last = ts; }
    var delta = ts - last;

    last = ts;

    move(delta);

    frameRateEl.innerHTML = fps((1 / delta) * 1000) + 'fps';

    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
})();
