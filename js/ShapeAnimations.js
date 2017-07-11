'use strict';

/**
 * This class confers animation functionalities to shape objects 
 * like fadin and pop animations
 * 
 * @param {object} shape Shape object to manipulate the sprite's dimensions
 */
function ShapeAnimations (shape) {
  // The shape object can only be accessed through a getter function 
  this.getShape = function () {
    return shape;
  };
}

/** 
 * This function HAS to be called after the sprite's dimensions
 * Have been set and before any animations
 * For them to work properly 
 * 
 */
ShapeAnimations.prototype.resetShapeDimensions = function () {
  this.originalDimensions = {
    x: this.getShape().getSprite().x,
    y: this.getShape().getSprite().y,
    width: this.getShape().getSprite().width,
    height: this.getShape().getSprite().height
  };
}

/**
 * "pops" the shape
 * Works in conjunction with the loop method
 * which has to be called with a callback passed to it.
 * The callback function takes care of the animation
 * updates.
 * 
 * It uses the sine function for the "bouncing" effect
 * 
 * @param {number} time    Duration (ms) of the animation
 * @param {number} delay   Time (ms) before the animation is fired 
 */
ShapeAnimations.prototype.pop = function pop (time, delay) {
  // Set the variables to be used in the closure
  let interval;
  let currentX = 0;
  
  const OSCILLATIONS = 1;
  const PI2 = Math.PI * 2;
  const SECONDS = time / 1000;

  // Call the loop method and pass it the callback
  this.loop(function (fps) {
    // Calculate at each frame the best interval for smooth animation
    // using the fps variable passed to this callback function
    interval = (OSCILLATIONS * PI2) / (SECONDS * fps);
    
    // change the shape width and height using sine function 
    // with the currentX variable
    this.getShape().setDimensions({
      width: this.originalDimensions.width * ((Math.sin(currentX) / 3) + 1),
      height: this.originalDimensions.height * ((Math.sin(currentX) / 3) + 1)
    });

    //currentX is incremented by the interval
    currentX += interval;
  }.bind(this), time, this.restoreDimensions.bind(this), delay);
};

/**
 * Used to restore the shape's original width and height 
 * quickly at the end of animations 
 */
ShapeAnimations.prototype.restoreDimensions = function () {
  const shape = this.getShape();
  shape.setDimensions({
    width: this.originalDimensions.width,
    height: this.originalDimensions.height
  })
}

/**
 * Fades the shape in view.
 *  
 * Works in conjunction with the loop method
 * which has to be called with a callback passed to it.
 * The callback function takes care of the animation
 * updates. 
 * 
 * @param {number} time    Duration (ms) of the animation
 * @param {number} delay   Time (ms) before the animation is fired
 */
ShapeAnimations.prototype.fadein = function (time, delay) {
  
  let interval;
  let currentX = 0;

  // half an oscillation coupled with the cosine function
  // makes the shape looks like it "shrinks" to normal size
  const OSCILLATIONS = 0.5;
  const PI2 = Math.PI * 2;
  const SECONDS = time / 1000;

  const FINAL_ALPHA = 1;
  let currentAlpha = 0;

  // The callback function to pass to the loop method
  const fadein = function (fps) {
    interval = (OSCILLATIONS * PI2) / (SECONDS * fps);

    // change the shape's width and height using the cosine function
    this.getShape().setDimensions({
      width: this.originalDimensions.width * ((Math.cos(currentX)) + 2),
      height: this.originalDimensions.height * ((Math.cos(currentX)) + 2)
    });

    // Modifies the alpha of the sprite directly
    this.getShape().getSprite().alpha = currentAlpha;
    currentAlpha += FINAL_ALPHA / (SECONDS * fps);
    currentX += interval;
  };

  // restore function
  // Makes sure that the shape looks the way it 
  // is supposed to despite any bug or performance glitch
  const restore = function () {
    this.restoreDimensions();
    this.getShape().getSprite().alpha = FINAL_ALPHA;
  };

  // TODO export this behavior out to the loop function
  // if there is a delay, the loop will be fired after that delay
  if (delay) {
    setTimeout(function () {
      this.loop(fadein.bind(this), time, restore.bind(this));
    }.bind(this), delay);
  } else {
    this.loop(fadein.bind(this), time, restore.bind(this));
  }
}

// TODO incorporate the delay functionality in the loop function
// instead of the animation methods
/**
 * 
 * Used by all the animation methods, 
 * Passes calculated fps to the callback 
 * 
 * @param {function} callback   Called at every iteration 
 * @param {number} time         Duration (ms) of the animation
 * @param {number} delay        Time (ms) before the animation starts
 * @param {function} close      Is called before the loop ends
 */
ShapeAnimations.prototype.loop = function (callback, time, close, delay) {
  let loopId; 
  let end = Date.now() + time;
  const fps = UTILS.createFPSCalculator();
  function stop() {
    loopId = undefined;
  }
  function internalLoop() {
    callback(fps(), stop); 
    if((Date.now() >= end) || !loopId) {
      if(close) close();
      cancelAnimationFrame(loopId);
      loopId = undefined;
    } else {
      loopId = requestAnimationFrame(internalLoop.bind(this));
    }  
  }
  loopId = requestAnimationFrame(internalLoop.bind(this))
}