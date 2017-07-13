/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
/******/ })
/************************************************************************/
/******/ ({

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
 * The clock object handles the clock displayed
 * on the first page
 */
const Clock = {

  /**
   * Initializes the clock
   * 
   * @param {object} config 
   */
  init (config) {
    this.radius = config.radius;
    this.center = config.center;
  },


  /**
   * Creates and initializes the clock ticks
   * 
   * @param {object} app   PIXI application 
   * @param {Object} Tick  Shape to use for the ticks of the clock
   */
  createTicks(app, Tick) {
    this.ticks = [];

    const TICK_ANGLE = (Math.PI * 2) / 60; 
    let currentTickAngle = 0 - (Math.PI / 2); // sets the first tick to be the 12 o'clock tick
    
    
    let tickScale;  
    // Iterate trhough loop 60 times
    for(let i = 0; i < 60; i++) {
      // change the tick scale based on the place of the tick on the clock
      tickScale = (i % 15) === 0 ? 2 : (i % 5 === 0 ? 1.5 : 1);

      // push new Tick 
      this.ticks.push(Object.create(Tick).init(app));
      this.ticks[i].shape.setDimensions({width: 20, height: 40});
      this.ticks[i].shape.rotate(currentTickAngle + Math.PI / 2);
      this.ticks[i].shape.setPosition({
        x: (Math.cos(currentTickAngle) * this.radius) + this.center.x,
        y: (Math.sin(currentTickAngle) * this.radius) + this.center.y,
      });
      // scale the tick by the tickScale
      this.ticks[i].shape.scale(tickScale);
      // Important /!\ for animations to work
      // gives the animations object the dimensions of their 
      // respective sprites
      this.ticks[i].animations.resetShapeDimensions();
      // Update angle for next tick 
      currentTickAngle += TICK_ANGLE;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Clock);

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape_js__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShapeAnimations_js__ = __webpack_require__(194);

//import PIXI from 'pixi.js';


// TODO transfer a lot of functionality of Tick to Shape 
// For better composition and reusability
const Tick = {

  /**
   * Creates a texture for all the Tick PIXI Sprites
   * 
   * @param {stirng} path   Path to the image for the texture
   */
  setGlobalTexture (path) {
    const globalTexture = new PIXI.Texture.fromImage(path);

    this.getGlobalTexture = function () {
      return globalTexture;
    }
  },

  /**
   * Initialization of the Tick, 
   * creates a sprite from global texture
   * composes with ShapeAnimations to 
   * allow animations for the shape
   * 
   * @param {object} app  The sprite is added to the PIXI application
   * @returns 
   */
  init (app) {
    this.initSprite(app);
    
    // composition with the Shape class
    this.shape = new __WEBPACK_IMPORTED_MODULE_0__Shape_js__["a" /* default */](this.sprite);
    this.animations = new __WEBPACK_IMPORTED_MODULE_1__ShapeAnimations_js__["a" /* default */](this.shape);
    
    
    return this;
  },

  
  /**
   * initializes a new PIXI Sprite using the global texture 
   * 
   */
  initSprite (app) {
    this.sprite = new PIXI.Sprite.from(this.getGlobalTexture()); 
    this.sprite.anchor.set(0.5);  // set the anchor to the center of the sprite by default
    this.sprite.alpha = 0;        // set the alpha of the sprite to 0 by default
    app.stage.addChild(this.sprite);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Tick);

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



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

/* harmony default export */ __webpack_exports__["a"] = (Shape);

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UTILS_js__ = __webpack_require__(195);


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
  const fps = __WEBPACK_IMPORTED_MODULE_0__UTILS_js__["a" /* default */].createFPSCalculator();
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

/* harmony default export */ __webpack_exports__["a"] = (ShapeAnimations);

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const UTILS = {

  /**
   * Sets up variables to calculate the Frames per Second
   * 
   * @returns {Function}  Calculates the FPS 
   */
  createFPSCalculator() {
    let now;
    let previousTime = Date.now();
    let timeSinceLastFrame;
    let _fps;

    // Calculates the FPS based on the 
    // last time at which it was called
    return function fps () {
      now = Date.now();
      timeSinceLastFrame = now - previousTime;
      
      _fps = 1000 / timeSinceLastFrame; 
      previousTime = now;
      return _fps;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (UTILS);

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Clock_js__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tick_js__ = __webpack_require__(192);


// TODO find out why pixi is not imported correctly
// import PIXI from 'pixi.js';


// Main function
window.onload = function main() {
  console.log(PIXI);
  // Create PIXI application, add css classes, and append canvas to document.
  const app = new PIXI.Application(window.innerWidth, window.innerHeight, {transparent: true, antialias: true});
  app.view.classList.add('center')
  app.view.classList.add('clock-canvas')
  document.body.appendChild(app.view);

  // Calculate the radius of the clock.
  const maxRadius = (Math.min(window.innerWidth, window.innerHeight) * 0.8) / 2;
  //  Initialize the clock with radius and center 
  __WEBPACK_IMPORTED_MODULE_0__Clock_js__["a" /* default */].init({
    radius: maxRadius,
    center: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  });
  
  // set the globale texture of the ticks
  __WEBPACK_IMPORTED_MODULE_1__Tick_js__["a" /* default */].setGlobalTexture('img/clock-tick.png');
  // create the clock ticks
  __WEBPACK_IMPORTED_MODULE_0__Clock_js__["a" /* default */].createTicks(app, __WEBPACK_IMPORTED_MODULE_1__Tick_js__["a" /* default */]);

  // set animations to fire 
  for(let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__Clock_js__["a" /* default */].ticks.length; i++) {
    // this will be replaced by handling the actual time and
    // firing the pop animation for each tick based on real time clock
    setTimeout(function(){
      __WEBPACK_IMPORTED_MODULE_0__Clock_js__["a" /* default */].ticks[i].animations.pop(450);
    }, (60 * 30) + (i * 1000));

    // this will probably stay as clock fadein animation
    __WEBPACK_IMPORTED_MODULE_0__Clock_js__["a" /* default */].ticks[i].animations.fadein(150, i * 30);
  }

  // Listen for animate update
  app.ticker.add(function(delta) {
    
    
  });
}








/***/ })

/******/ });