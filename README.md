node-project
============
Utility script for creating skeleton node projects.

## Usage

It is recommended that you copy the `node-template` script alongside the `node-template-files` directory into `~/bin` and ensure that `~/bin` is exists in your `PATH`. You can also just run the utility straight from this repo. In either case, the script must live next to the folder.  

Assuming the script is in a folder that exists in your `PATH`, you need only run the following:

```bash
$ node-template <project-path> <project-type>
```

...where `<project-path>` is the path to the root folder of your project and `<project-type>` is a valid project type (see below). When complete, your poject will be set up and ready for you at your `<project-path>`.

**Valid Project Types**:

- `basic`

Project structure for a very basic node app. Includes config management, logging, application entrypoint, test infrastructure, various npm run scripts, and commonly used packages.  

- `rest-api`

Project structure for a Hapi- and Sequelize-based API server. Includes everything the basic app includes as well as an API server with route registration and an example endpoint, smoke tests for the example endpoint, and database management.  

All project types include READMEs with information on the project and are configured with the [babel](http://eslint.org/) transpiler for es6, and [eslint](http://eslint.org/) configured for the [Airbnb style guide](https://github.com/airbnb/javascript). Tests configured with [mocha](https://mochajs.org) and [chai](http://chaijs.com/).
