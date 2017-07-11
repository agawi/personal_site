'use strict'
function OldShape (config) {
  this.dim = config.dim;
  this.look = config.look;
  this.position = new PIXI.Point(this.dim.x, this.dim.y);
  this.graphics = new PIXI.Graphics();
  
  this.update();
}

OldShape.prototype.createTexture = function (applicationRenderer) {
  var graphics = new PIXI.Graphics();
  graphics.beginFill(this.look.color.fill);
  // 3 for linewidth, 0.5 line alpha
  graphics.lineStyle(this.look.lineWidth, this.look.color.line, this.look.lineAlpha);

  // Move to first point, then line to all the other point, 
  // Then back to the first point
  graphics.moveTo(this.dim.points[0].x, this.dim.points[0].y);
  for (var i = 1; i < this.dim.points.length; i++) {
    this.graphics.lineTo(this.dim.points[i].x, this.dim.points[i].y)
  }
  this.graphics.lineTo(this.dim.points[0].x, this.dim.points[0].y);

  // Rotate the Oldshape
  this.graphics.rotation = this.dim.angle;
  this.graphics.endFill();
  return applicationRender.generateTexture()
}

OldShape.prototype.draw = function draw () {
  
  
};

OldShape.prototype.update = function update () {
  this.graphics.position = this.position;
};

function Point (x, y) {
  this.x = x;
  this.oX = x;
  this.y = y;
  this.oY = y;
}

Point.prototype.revertToOriginal = function() {
  this.x = this.oX;
  this.y = this.oY;
}


const Shape = {
  init(points) {
    this.points = points;
    return this;
  },
  createTexture(app, options) {
    const graphics = new PIXI.Graphics();
    this.drawShape(graphics, options);
    return app.renderer.generateTexture(graphics);
  },
  drawShape(graphics, options) {
    graphics.beginFill(options.fillColor);
    graphics.lineStyle(options.lineWidth, options.lineColor, options.lineAlpha);
    // Move to first point, then line to all the other point, 
    // Then back to the first point

    graphics.moveTo(this.points[0].x, this.points[0].y);

    for (var i = 1; i < this.points.length; i++) {
      graphics.lineTo(this.points[i].x, this.points[i].y)
    }


    graphics.lineTo(this.points[0].x, this.points[0].y);
    graphics.endFill();
  }
}