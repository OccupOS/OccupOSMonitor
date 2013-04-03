#OccupOSMonitor

Still haveily WIP and sorting some things out. But you can get started already and play with the app around if you want.

##Getting Started (for Dev's)

Install [Yeoman and its dependencies](http://yeoman.io/)

Install dependencies as well as packages (i.e. javascript libraries such as jQuery, etc.):

```
$ npm install && bower install
```

For now you also need to add ember-data.js manually, as well as the latest bootstrap.css (from the 3.0 Dev branch) into the components folder.

Important: This currently just works with ember 1.0.0 rc1 and ember API revision 11. Bootstrap you literally need the latest 3.0 build from after 03/04/2013

Fire up the server (it will compile the templates and build the whole ember-app as first task):

```
$ grunt server
```
