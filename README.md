# <img src="https://raw.githubusercontent.com/redgeoff/mson/master/mson.png" alt="MSON" width="30" height="30" /> MSON-React
[![Circle CI](https://circleci.com/gh/redgeoff/mson-react.svg?style=svg&circle-token=784da4ce47a1008cd384a42ecd6d4756ac62db3d833b07cdda)](https://circleci.com/gh/redgeoff/mson-react) [![Greenkeeper badge](https://badges.greenkeeper.io/redgeoff/mson-react.svg)](https://greenkeeper.io/)

UI Rendering Layer for React and Material-UI

## Getting Started

### Getting Started App

The best way to get started with MSON is to play with the [Getting Started App](https://github.com/redgeoff/mson-getting-started). In just a few lines of MSON, you'll generate an app that can list, edit, filter and sort a list of contacts. And, for extra fun, you can use Firebase to make it real-time capable.

### Adding MSON-React to Your Existing React Project

  - `yarn add @date-io/date-fns @material-ui/core date-fns @material-ui/pickers mson mson-react typeface-roboto`
    - Note: this is needed as MSON and MSON-React are libraries that work in conjunction with React, Material UI and Date-IO. As such, these dependencies are peer dependencies.
  - Add the following to the head section of your index.html:
    ```html
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    ```
    Note: MSON-React uses font icons as the user can specify any Icon during runtime and the alternative of bundling all the icons as SVG icons would make your JS bundle **huge**

## More info

See [MSON](https://github.com/redgeoff/mson) for details
