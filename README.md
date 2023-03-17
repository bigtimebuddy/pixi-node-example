# @pixi/node Example

This is a simple hello world example of using `@pixi/node`. This package is a lot like `pixi.js`, but excludes 
the DOM-specific behaviors, including interaction, accessibility.

## GitHub Actions

`@pixi/node` can be run on GitHub Actions. There's a complete example here in [nodejs.yml](./.github/workflows/nodejs.yml). There are two essential ingredients:

* Installing the canvas dependencies as described in [node-canvas](https://github.com/Automattic/node-canvas)
* Running with [xvfb](https://linuxhint.com/install-xvfb-ubuntu/)

For example:

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Install Canvas Dependencies
      run: sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev xvfb
    # <-- checkout, install node, etc here
    - name: Execute
      run: xvfb-run --auto-servernum node .
```

_Node: See [GitHub Actions documentation](https://docs.github.com/actions) for more information._
