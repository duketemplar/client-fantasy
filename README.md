# crs-pop-up-app

This is a simple example how to use: 
* Webpack
* React
* [React Route](https://rackt.github.io/react-router/)
* [Redux](http://rackt.github.io/redux/index.html)
* Karma tests
* [Next API mock server](api-server/)

Documentation of the example see [src/accounts/README.md](src/accounts/README.md)

Useful NPM tasks (see package.json);

* `npm start` start both a webpack-dev server and the next api mock server
* `npm test` run unit tests
* `npm run lint`
* `npm run e2e-test` nightwatch e2e tests, see [e2e-tests/tests]
* `npm run e2e-test:install` downloads selenium server need to run e2e test 


In DEBUG environment (npm start) there will be a [redux debug panel](https://github.com/gaearon/redux-devtools).
This panel can be enabled/disabled by CTRL+H.

## Folder structure

*Rule*: A file in a subfolder must never import a file in a parent folder.

*Exception*:  Only files directly under a subfolder of src can be required from anywhere, but only if there is a need for reuse.

*Example*: Reusuable redux actions can be imported from `/src/actions`

This means that we sometimes needs to move up a file in the folder structure in order to reuse it.
Folders under the src folder can be considered as candidates for being self contained npm modules (if we later need to shared between different git repos).
Never move a file up in the folder structure because you believe that it may become reusable later on (see [YAGNI](http://martinfowler.com/bliki/Yagni.html)). 

### [`src`](src/)
  
Global setup of the application

Files:
* [src/index.jsx] The entry point of the app
* [src/store.js] Setup of the redux store  
* [src/root.jsx] Setup of the react routes. Imports routes from components.

Some of the subfolders

* [src/accounts] An example of a component. It often has the same name as the route.
* [src/i18n] A module containing translations
* [src/init] Initialization of the app for development


### Components (`src/<component>`)

Contains everything related to a react component. As an example of such a folder see [src/accounts/].
The name of this folder is usually the same as the URL route specified in the [src/root.jsx]

Folders:

* [src/<component>/actions/](src/account/actions/) Redux actions
* [src/<component>/components/](src/account/actions/) React sub components
* [src/<component>/reducers/](src/account/reducers/) Redux reducers, imported from the store.js file.

### Sub Components (`src/<component>/<sub-component>`)

Sub components should have the same structure as components (`actions`, `components` and `reducers` sub folder).
See example: [src/accounts/details/components]


### `src/actions`

Global redux actions. This project does not include an example of this.


### [`test`](test/)

Contains the test helper. Can be imported just as 

```
import TestHelper from 'nordnet-test-helper'
```

Unit tests are found in subfolders named `__tests__` of the src folder.


