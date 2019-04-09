# Building

## Creating a Release, Compiling the JS and Publishing to NPM

  - $ npm login
  - $ git config credential.helper store
  - $ yarn add --dev mson # To update to latest version of MSON
  - Modify package.json and manually update the version of the mson package in peerDependencies
  - Modify the version in package.json
  - $ git diff # check that only the version has changed
  - $ ./scripts/publish.sh
  - Find the [target milestone](https://github.com/redgeoff/mson-react/milestones) and use this link in the release notes.
  - Find the new tag at [releases](https://github.com/redgeoff/mson-react/releases), edit the tag and publish the release
  - Close the milestone
