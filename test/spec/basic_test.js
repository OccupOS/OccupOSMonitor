'use strict';
//var Router, App, AppView, templates, router, container, originalTemplates;
var router, container;
//var container;
var get = Ember.get;//, set = Ember.set;

function bootApplication() {
    router = container.lookup('router:main');
    Ember.run(OccupOS, 'advanceReadiness');
}

module('Basic Routing', {
    setup: function () {
        /*jshint camelcase: false*/
        container = OccupOS.__container__;
        /*jshint camelcase: true*/
       /*OccupOS.Router.reopen({
           location: 'none'
       });

       Router = OccupOS.Router;

       OccupOS.LoadingRoute = Ember.Route.extend({
       });

       container = App.__container__;   */
    }/*,// somehow not working
    teardown: function () {
        Ember.run(OccupOS, 'destroy');
        Ember.run(function () {
            OccupOS.destroy();
            OccupOS = null;
        });
    }*/
});

test('loading of startpage (indexroute)', function () {
    var currentPath = '',
        wantedPath = 'index';
    OccupOS.ApplicationController.reopen({
        currentPathDidChange: Ember.observer(function () {
            currentPath = get(this, 'currentPath');
        }, 'currentPath')
    });

    bootApplication();

    Ember.run(function () {
        router.handleURL('/');
    });
    equal(currentPath, wantedPath, 'Wanted path: ' + wantedPath + ', current path: ' + currentPath);
    //equal(Ember.$('h3:contains(Hours)', '#qunit-fixture').length, 1, "The index template was rendered");
});