'use strict';

import HtmlTest from './lib/html';
import CanvasTest from './lib/canvas';

var body = document.getElementsByTagName('body')[0];
var size = {
  width: 400,
  height: 400
};

var tests = [
  new HtmlTest(body, size),
  new CanvasTest(body, size)
];

var MOVING = true;
var width = 400;
var height = 400;
var objectCount = 100;

document.getElementById('mode').innerHTML = 'TODO';

var objects = [];

document.getElementById('count').innerHTML = objectCount;
var frameRateEl = document.getElementById('frame-rate');

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
objects.forEach(o => tests.forEach(t => t.addObject(o)));
tests.forEach(t => t.update());

// Start animation
var move = function (delta) {
  objects.forEach(o => {
    nextPos(o, delta);

    tests.forEach(t => t.updateObject(o));
  });

  tests.forEach(t => t.update());
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
