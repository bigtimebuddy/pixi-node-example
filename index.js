const { Application, Sprite, Assets } = require('@pixi/node');
const { writeFileSync } = require('fs');
const path = require('path');

(async () => {
    await Assets.init();
    const app = new Application();
    
    // load a sprite
    const bunnyTexture = await Assets.load(path.join(__dirname, 'assets/bunny.png'));
    const bunny = Sprite.from(bunnyTexture);
    
    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
    
    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
    
    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);
    
    // Listen for frame updates
    app.ticker.add(() => {
            // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
    
    // extract and save the stage
    app.renderer.render(app.stage);
    const base64Image = app.renderer.plugins.extract
        .canvas(app.stage)
        .toDataURL('image/png');
    
    const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
    const output = `./test.png`;
    
    writeFileSync(output, base64Data, 'base64');

})();