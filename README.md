#OccupOSMonitor [![Build Status](https://api.travis-ci.org/OccupOS/OccupOSMonitor.png)](https://travis-ci.org/OccupOS/OccupOSMonitor)

Still haveily WIP and sorting some things out. But you can get started already and play with the app around if you want.

##Getting Started (for Dev's)

###Basic Setup

Install [Yeoman and its dependencies](http://yeoman.io/)

Install dependencies/build-tools (e.g. grunt):

```
$ npm install
$ grunt bower
```

In case something with the packages doesn't work (bower could have a proble, or the grunt-bower task, or even one of the javascript-libraries)
you can download a working 1.0.0 version of OccupOSMonitor here: http://sdrv.ms/10h6Phi
Once you finished downloading this, just carry one with the next step.

Fire up the server:

```
$ grunt server
```
This will automatically download js-dependencies via bower, compile the templates and build the whole Ember-app.

To run all existing unit-tests use (you need to run grunt bower beforehand, if you haven't run grunt server):

```
$ grunt test
```
This will use qunit + sinon.js as a basis and phantomjs to run them on the commandline.

###Getting it to play nicely with OccupOSAPI

If you run everything locally, you need to download and setup the OccupOSAPI, which is using .NET/ServiceStack as a basis. Everything should simply work as-is, even on Mono.
