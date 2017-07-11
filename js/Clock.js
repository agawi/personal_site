'use strict';

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

