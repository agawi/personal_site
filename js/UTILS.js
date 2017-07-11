UTILS = {

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