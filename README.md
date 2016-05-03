# [webapp-customer-registration](https://nordnet.webfront1.ci.nordnet.se/sc/webapp-customer-registration/init/#)
## First setup
* `npm install` get all the dependencies for your application.

## Quick commands to start developing
* `npm start` start both a webpack-dev server and the next api mock server and let you see the application locally
* `npm test` run unit tests
* see rest of commands with `npm run`

## Local setup of end to end tests
### If you have not set up your local e2e test environment do:
* `npm run e2e-test:install` to download the selenium server for the e2e tests.
* In order to run tests in Chrome, download [the appropriate driver](http://chromedriver.storage.googleapis.com/index.html?path=2.21/).
* All drivers should be placed in: [e2e-tests/server/]

### Run e2e tests
1. `npm run e2e-test:server` start the selenium server
* `npm start` to launch the application
* `npm run e2e-test` nightwatch e2e tests, see [e2e-tests/tests]

#### To get the ci configuration for the nightwatch test, clone the repo [jenkins-js-generator](https://scm.prod.nordnet.se/projects/PLATFORM/repos/jenkins-js-generator/browse)
* `groovy jenkins-js-generator/scripts/convertNightwatchToCi.groovy` in the nightwatch.json folder, will change that file!

## Development help
In DEBUG environment (npm start) there will be a [redux debug panel](https://github.com/gaearon/redux-devtools).
This panel can be enabled/disabled by CTRL+H.

## Coding guidelines
### Under development do:
* Until the the i18n is implemented use only english so it gets easier to see where translations are needed
* ID should be used for for elements that can be interacted with and is used for integration test.
* ID should be named as <component>-what-it-does-and-not-what-it-is-in-kebab-case

### Naming
* use camelCase for internal variables and snake_case for api props, e.i var apiData = { param_super: superValue }
* use [BEM](http://getbem.com/naming/) for css classes,

### Folder structure
*Rule*: A file in a subfolder must never import a file in a parent folder.

*Exception*:  Only files directly under a subfolder of src can be required from anywhere, but only if there is a need for reuse.

*Example*: Reusuable redux actions can be imported from `/src/actions`

This means that we sometimes needs to move up a file in the folder structure in order to reuse it.
Folders under the src folder can be considered as candidates for being self contained npm modules (if we later need to shared between different git repos).
Never move a file up in the folder structure because you believe that it may become reusable later on (see [YAGNI](http://martinfowler.com/bliki/Yagni.html)).


## Structure of modules
### [`src`](src/)

Global setup of the application

Files:
* [src/index.jsx] The entry point of the app
* [src/root.jsx] Setup of application component.

Some of the subfolders

* [src/i18n] A module containing translations


## Integration/Acceptance testing
see [RADME.md in e2d-test folder](e2e-tests/README.md)
