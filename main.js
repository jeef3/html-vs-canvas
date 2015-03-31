'use strict';

(function () {
  var canvas = document.getElementById('canvas');
  var html = document.getElementById('html');

  var HTML_ONLY = 1;
  var CANVAS_ONLY = 2;
  var BOTH = 3;

  var mode = BOTH;
  var MOVING = true;
  var width = 400;
  var height = 400;
  var objectCount = 100;

  // Retina the Canvas
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  html.style.width = width + 'px';
  html.style.height = height + 'px';

  if (mode === HTML_ONLY) {
    canvas.style.display = 'none';
  }

  if (mode === CANVAS_ONLY) {
    html.style.display = 'none';
  }

  var modeString = mode === BOTH ? 'both' :
    (mode === HTML_ONLY ? 'html' : 'canvas');
  document.getElementById('mode').innerHTML = modeString;

  var objects = [];

  document.getElementById('count').innerHTML = objectCount;
  var frameRateEl = document.getElementById('frame-rate');

  var stage = new createjs.Stage(canvas);
  stage.scaleX = window.devicePixelRatio;
  stage.scaleY = window.devicePixelRatio;

  var addToCanvas = function (o) {
    var shape = o.canvasNode = new createjs.Shape();
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
    if (mode === BOTH || mode === CANVAS_ONLY) {
      addToCanvas(o);
    }

    if (mode === BOTH || mode === HTML_ONLY) {
      addToHtml(o);
    }
  });
  stage.update();

  // Start animation
  var move = function (delta) {
    objects.forEach(function (o) {
      nextPos(o, delta);

      if (mode === BOTH || mode === CANVAS_ONLY) {
        updateCanvas(o);
      }

      if (mode === BOTH || mode === HTML_ONLY) {
        updateHtml(o);
      }
    });

    if (mode === BOTH || mode === CANVAS_ONLY) {
      stage.update();
    }
  };

  var fpss = [];
  var fps = function (ms) {
    fpss.push(ms);

    if (fpss.length > 10) {
      fpss.shift();
    }

    var sum = fpss.reduce(function (a, b) { return a + b; });
    var average = Math.round(sum / fpss.length);

    return average;
  };

  var last;
  var step = function (ts) {
    if (!last) { last = ts; }
    var delta = ts - last;

    last = ts;

    if (MOVING) {
      move(delta);
    }

    frameRateEl.innerHTML = fps((1 / delta) * 1000) + 'fps';

    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
})();
