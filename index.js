const { Application, Sprite, Assets } = require('@pixi/node');
const fs = require('fs');
const path = require('path');

(async () => {

    // Create a new app but disable Ticker
    const app = new Application({ autoStart: false });
    
    // Load a sprite using new Assets API
    const bunnyTexture = await Assets.load(path.join(__dirname, 'assets/bunny.png'));
    const bunny = Sprite.from(bunnyTexture);
    
    // Add the Sprite and manually render it
    app.stage.addChild(bunny);
    app.render();

    // Extract and save the stage
    const data = app.renderer.plugins.extract.base64()
        .replace(/^data:image\/png;base64,/, '');
    
    // Write the output to a file
    await fs.promises.writeFile(`./test.png`, data, 'base64');

})();