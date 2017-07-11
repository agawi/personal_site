'use strict'

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
   * Initialization of the shape, 
   * creates a sprite from global texture
   * composes with ShapeAnimations to 
   * allow animations for the shape
   * 
   * @param {object} app  The sprite is added to the PIXI application
   * @returns 
   */
  init (app) {
    this.initSprite();
    app.stage.addChild(this.sprite);
    this.animations = new ShapeAnimations(this);
    this.sprite.alpha = 0;
    return this;
  },

  /**
   * rotates the shape by an angle
   * 
   * @param {number} angle  Radian angle to rotate the sprite by
   */
  rotate (angle) {
    this.sprite.rotation += angle;
  },

  /**
   * scales the shape by a number
   * 
   * @param {number} by   Number to scale the shape by 
   */
  scale (by) {
    this.sprite.width *= by;
    this.sprite.height *= by;
  },

  /**
   * Changes the sprite dimensions
   * 
   * @param {object} dim  New dimensions for the sprite
   */
  setDimensions (dim) {
    this.sprite.width = dim.width; this.sprite.height = dim.height;
  },

  /**
   * Changes the sprite position
   * 
   * @param {object} pos  New position for the sprite
   */
  setPosition (pos) {
    this.sprite.x = pos.x; this.sprite.y = pos.y;
  },
  
  /**
   * initializes a new PIXI Sprite using the global texture 
   * 
   */
  initSprite () {
    this.sprite = new PIXI.Sprite.from(this.getGlobalTexture()); 
    this.sprite.anchor.set(0.5);  // set the anchor to the center of the sprite by default
  }
}