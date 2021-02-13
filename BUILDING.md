# Building

## Creating a Release, Compiling the JS and Publishing to NPM

  - $ yarn add --dev mson # To update to latest version of MSON
  - Modify package.json and manually update the version of the mson package in peerDependencies
  - Commit changes to the main branch (via a PR)
  - Simply merge changes into the `release` branch using a __merge commit__ and let CircleCI and semantic-release take care of the rest!
