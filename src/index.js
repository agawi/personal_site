'use strict';

// TODO find out why pixi is not imported correctly
// import PIXI from 'pixi.js';
import Clock from './Clock.js';
import Tick from './Tick.js';
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
  Clock.init({
    radius: maxRadius,
    center: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  });
  
  // set the globale texture of the ticks
  Tick.setGlobalTexture('img/clock-tick.png');
  // create the clock ticks
  Clock.createTicks(app, Tick);

  // set animations to fire 
  for(let i = 0; i < Clock.ticks.length; i++) {
    // this will be replaced by handling the actual time and
    // firing the pop animation for each tick based on real time clock
    setTimeout(function(){
      Clock.ticks[i].animations.pop(450);
    }, (60 * 30) + (i * 1000));

    // this will probably stay as clock fadein animation
    Clock.ticks[i].animations.fadein(150, i * 30);
  }

  // Listen for animate update
  app.ticker.add(function(delta) {
    
    
  });
}






