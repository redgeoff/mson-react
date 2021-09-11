# <img src="https://raw.githubusercontent.com/redgeoff/mson/main/mson.png" alt="MSON" width="30" height="30" /> MSON-React
[![Circle CI](https://circleci.com/gh/redgeoff/mson-react.svg?style=svg&circle-token=784da4ce47a1008cd384a42ecd6d4756ac62db3d833b07cdda)](https://circleci.com/gh/redgeoff/mson-react)

UI Rendering Layer for React and Material-UI

## Getting Started

### Getting Started App

The best way to get started with MSON is to play with the [Getting Started App](https://github.com/redgeoff/mson-getting-started). In just a few lines of MSON, you'll generate an app that can list, edit, filter and sort a list of contacts. And, for extra fun, you can use Firebase to make it real-time capable.

### Autogenerate forms in React and Material-UI with MSON

Implementing great forms can be a real time-waster. With just a few lines of JSON, you can [use MSON to generate forms](https://redgeoff.com/posts/mson-react-material-ui-form/) that perform real-time validation and have a consistent layout.

### Adding MSON-React to Your Existing React Project

  - `yarn add mson-react` or `npm install mson-react`
  - Add the following to the head section of your index.html:
    ```html
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    ```
    Note: MSON-React uses font icons as the user can specify any Icon during runtime and the alternative of bundling all the icons as SVG icons would make your JS bundle **huge**

### MSON Demo

You may find it useful to fire up the [MSON demo](https://redgeoff.github.io/mson-react) locally:

  - $ `git clone https://github.com/redgeoff/mson-react && cd mson-react && yarn install`
  - $ `yarn start`
  - Visit http://localhost:3000 in a web browser

You can also run the demo with a local version of MSON, if you want to experiment with local changes to MSON:

  - $ `git clone https://github.com/redgeoff/mson && cd mson && yarn install && yarn compile && yarn link && cd ..`
  - $ `git clone https://github.com/redgeoff/mson-react && cd mson-react && yarn install && yarn link mson`
  - $ `yarn start`
  - Visit http://localhost:3000 in a web browser

## More info

See [MSON](https://github.com/redgeoff/mson) for details
