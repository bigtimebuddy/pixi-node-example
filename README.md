# @pixi/node Example

This is a simple hello world example of using `@pixi/node`. This package is a lot like `pixi.js`, but excludes 
the DOM-specific behaviors, including interaction, accessibility.

## GitHub Actions

`@pixi/node` can be run on GitHub Actions. There's a complete example here in [nodejs.yml](./.github/workflows/nodejs.yml). There are two essential ingredients:

* Installing the canvas dependencies as described in [node-canvas](https://github.com/Automattic/node-canvas)
* Running with [XVFB](https://github.com/GabrielBB/xvfb-action)

For example:

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Install Canvas Dependencies
      run: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    # <-- checkout, install node, etc here
    - name: Execute
      uses: GabrielBB/xvfb-action@v1.0
      with:
        # Or whatever your excutable call is
        run: node .
```

_Node: See [GitHub Actions documentation](https://docs.github.com/actions) for more information._
