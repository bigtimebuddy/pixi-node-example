import fs from 'fs';
import path from 'path';

/**
 * We need to patch PixiJS dependencies to use .mjs extension
 * for modules instead of .js. Node.js is confused by this and
 * there's no way to force or override .js = commonjs.
 */
const __dirname = path.dirname(import.meta.url).replace("file://", "");
const rootPath = path.join(__dirname, 'node_modules', '@pixi');
const files = await fs.promises.readdir(rootPath);

for (const dir of files) {
    const dirPath = path.join(rootPath, dir);
    // Replace imports with .mjs
    const pkgPath = path.join(dirPath, 'package.json');
    const pkg = await fs.promises.readFile(pkgPath, 'utf8');
    const pkgJson = JSON.parse(pkg);
    const { module } = pkgJson;
    pkgJson.module = module.replace('.js', '.mjs');
    if (pkgJson.exports) {
        const file = pkgJson.exports['.'].import.default;
        pkgJson.exports['.'].import.default = file.replace('.js', '.mjs');
    }
    await fs.promises.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));
    await fs.promises.copyFile(
        path.join(dirPath, module),
        path.join(dirPath, module.replace('.js', '.mjs'))
    );
}

/**
 * Assets does not have exports, we'll add it. Needs to get fixed in PixiJS.
 */
const assetsPath = path.join(rootPath, 'assets', 'package.json');
const assetsPkg = await fs.promises.readFile(assetsPath, 'utf8');
const assetsPkgJson = JSON.parse(assetsPkg);
assetsPkgJson.exports = {
    ".": {
      "import": {
        "types": "./index.d.ts",
        "default": "./dist/esm/assets.mjs"
      },
      "require": {
        "types": "./index.d.ts",
        "default": "./dist/cjs/assets.js"
      }
    }
};
await fs.promises.writeFile(assetsPath, JSON.stringify(assetsPkgJson, null, 2));

/**
 * There's an issue with importing interop esmodules in ismobilejs.
 * This dependency needs to get fixed in PixiJS. Patching it here.
 */
const settingsPath = path.join(rootPath, 'settings/dist/esm/settings.mjs');
const buffer = await fs.promises.readFile(settingsPath, 'utf8');
await fs.promises.writeFile(
    settingsPath,
    buffer.replace('isMobileCall(','isMobileCall.default('), 
    'utf8'
);
