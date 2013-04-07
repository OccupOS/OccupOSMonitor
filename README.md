#OccupOSMonitor [![Build Status](https://api.travis-ci.org/OccupOS/OccupOSMonitor.png)](https://travis-ci.org/OccupOS/OccupOSMonitor)

Still haveily WIP and sorting some things out. But you can get started already and play with the app around if you want.

##Getting Started (for Dev's)

###Basic Setup

Install [Yeoman and its dependencies](http://yeoman.io/)

Install dependencies/build-tools (e.g. grunt):

```
$ npm install
```

Fire up the server:

```
$ grunt server
```
This will automatically download js-dependencies via bower, compile the templates and build the whole Ember-app.

To run all existing unit-tests use:

```
$ grunt test
```
This will use qunit + sinon.js as a basis and phantomjs to run them on the commandline.

###Getting it to play nicely with OccupOSAPI

If you run everything locally, you need to download and setup the OccupOSAPI, which is using .NET as a basis. Everything should simply work as-is
