'use strict';

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
    this.shape = new Shape(this.sprite);
    this.animations = new ShapeAnimations(this.shape);
    
    
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