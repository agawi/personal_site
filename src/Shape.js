'use strict';


/**
 * Gives some functionality to manipulate the instance sprite's dimensions
 * 
 * @param {object} sprite   Sprite to be used for this shape 
 */
function Shape (sprite) {
  this.getSprite = function () {
    return sprite;
  }
}

/**
   * rotates the shape by an angle
   * 
   * @param {number} angle  Radian angle to rotate the sprite by
   */
Shape.prototype.rotate = function (angle) {
  this.getSprite().rotation += angle;
};

/**
   * scales the shape by a number
   * 
   * @param {number} by   Number to scale the shape by 
   */
Shape.prototype.scale  = function (by) {
  this.getSprite().width *= by;
  this.getSprite().height *= by;
};

/**
   * Changes the sprite dimensions
   * 
   * @param {object} dim  New dimensions for the sprite
   */
Shape.prototype.setDimensions  = function (dim) {
  this.getSprite().width = dim.width; this.getSprite().height = dim.height;
};

/**
   * Changes the sprite position
   * 
   * @param {object} pos  New position for the sprite
   */
Shape.prototype.setPosition = function (pos) {
  this.getSprite().x = pos.x; this.getSprite().y = pos.y;
};

export default Shape;