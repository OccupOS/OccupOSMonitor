//ui_test.js//================================================================================
/*
// Application Code

window.App = Ember.Application.create();

// Our normal data store, which we be overridden when testing.
App.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.RESTAdapter.create()
});

App.Employee = DS.Model.extend({
    name: DS.attr("string"),
    salary: DS.attr("number"),
    managedBy: DS.belongsTo("App.Employee"),
    manages: DS.hasMany("App.Employee")
});

App.Router.map(function () {
    this.route("index", { path: "/" });
    this.route("employees", { path: "/employees" });
    this.route("employee", { path: "/employee/:employee_id" });
});

App.EmployeesRoute = Ember.Route.extend({
    model: function (params) {
        return App.Employee.find();
    }
});

App.EmployeeRoute = Ember.Route.extend({
    model: function (params) {
        return App.Employee.find(params.employee_id);
    }
});

App.EmployeeController = Ember.ObjectController.extend({
    giveRaise: function () {
        this.set("salary", this.get("salary") * 1.10);
    }
});

// Declare this explicitly so we can test it.
App.EmployeeView = Ember.View.extend({
    // Only needed so we can be called outside of a route by our unit tests.
    templateName: 'employee'
});*/

//================================================================================
// Test Code

// Replace our fixture-based store with a REST-based store for testing, so we
// don't need a server.  We disable simulateRemoteResponse so that objects will
// appear to load at the end of every Ember.run block instead of waiting for a
// timer to fire.
'use strict';
OccupOS.Store = DS.Store.extend({
    revision: 12,
    adapter: DS.FixtureAdapter.create({
        simulateRemoteResponse: false,
        queryFixtures: function(fixtures, query, type){
            console.log('fixtures: ' + fixtures);
            console.log('query: ' + query);
            console.log('type: ' + type);
        }
    })
});

// Declare some fixture objects to use in our test application.  There's
// nothing like factory_girl or machinist yet.
/*App.Employee.FIXTURES = [{
    id: 1,
    name: 'Jane Q. Public',
    salary: 80000,
    managedBy: null,
    manages: [2]
}, {
    id: 2,
    name: 'John Q. Public',
    salary: 60000,
    managedBy: 1,
    manages: []
}];*/

// Declare some fixture objects to use in our test application.  There's
// nothing like factory_girl or machinist yet.
//Sensortype for Temperature: 9 and for Lightintensity: 3
//Temperature values between 18.0-24.0 and Lightintensity 0-100
OccupOS.Sensor.FIXTURES = [{
    id: 1,
    measuredData: 20,
    measuredAt: '2013-04-18 17:00:00',
    sensorType: 9
}, {
    id: 2,
    measuredData: 20.6,
    measuredAt: '2013-04-18 17:00:10',
    sensorType: 9
}, {
    id: 3,
    measuredData: 23,
    measuredAt: '2013-04-18 17:00:20',
    sensorType: 9
}, {
    id: 4,
    measuredData: 0,
    measuredAt: '2013-04-18 17:00:00',
    sensorType: 3
}, {
    id: 5,
    measuredData: 89,
    measuredAt: '2013-04-18 17:00:10',
    sensorType: 3
}];

// Run before each test case.
QUnit.testStart(function () {
    // Put the application into a known state, and destroy the defaultStore.
    // Be careful about DS.Model instances stored in App; they'll be invalid
    // after this.
    // This is broken in some versions of Ember and Ember Data, see:
    // https://github.com/emberjs/data/issues/847
    //Ember.run(OccupOS, 'advanceReadiness');
    //OccupOS.reset();
    // Display an error if asynchronous operations are queued outside of
    // Ember.run.  You need this if you want to stay sane.
    Ember.testing = true;
});

// Run after each test case.
QUnit.testDone(function () {
    Ember.testing = false;
});

// Optional: Clean up after our last test so you can try out the app
// in the jsFiddle.  This isn't normally required.
QUnit.done(function () {
    OccupOS.reset();
});

// Load associations immediately, instead of waiting for FixtureAdapter's
// asynchronous loads.  Basically, all we need to do is access each object
// from inside Ember.run.
// TODO: We can't test this or insert where needed until App.reset() works.
// TODO: Handle hasMany.
/*function loadAssociations(object ) {     //, paths...
    var paths = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < paths.length; i++) {
        var components = paths[i].split('.');
        for (var j = 0; j < components.length; j++) {
            Ember.run(function () {
                var path = components.slice(0, j+1).join('.');
                object.get(path);
            });
        }
    }
}*/

// Sample model test.

module('OccupOS.Sensor');

test('Has a Sensor', function () {
    var temperature = {};
    Ember.run(function () {
        // Won't actually load until the end of the run-block.
        temperature = OccupOS.Sensor.find(1);
    });
    equal(temperature.get('measuredData'), 20);
    equal(temperature.get('measuredAt'), '2013-04-18 17:00:00');
    equal(temperature.get('sensorType'), 9);
});

// Sample controller test.

/*module('OccupOS.IndexController', {
    setup: function () {
        Ember.run(this, function () {
            // We could also fetch a model from our fixtures.
            this.model = OccupOS.Sensor.createRecord({ measuredData: 30 });
            this.controller = OccupOS.IndexController.create({ content: this.model });
        });
    }
});

test('can give the employee a raise', function () {
    var oldSalary = this.model.get('salary');
    Ember.run(this, function () {
        this.controller.giveRaise();
    });
    equal(this.model.get('salary'), oldSalary * 1.1);
});

// Sample view test.

module('OccupOS.IndexView', {
    setup: function () {
        Ember.run(this, function () {
            var model = App.Employee.find(1);
            this.controller = App.EmployeeController.create({
                // We need a container to test views with linkTo.
                /*jshint camelcase: false*/
                //container: App.__container__,
                /*jshint camelcase: true*/
                /*content: model
            });
            // If for some reason we want to isolate this, we can use
            // a sinon stub to intercept certain calls.
            sinon.stub(this.controller, 'giveRaise');
            this.view = App.EmployeeView.create({
                controller: this.controller,
                context: this.controller
            });
            this.view.append(); // Hook up to our document.
        });
    },

    teardown: function () {
        Ember.run(this, function () {
            this.view.remove(); // Unhook from our document.
        });
    }
});

test('shows the employee\'s name', function () {
    equal(this.view.$('h2').text(), 'Jane Q. Public');
    ok(this.view.$('.manages li').text().match(/John/));
});

test('Can sort table', function () {
    this.view.$('button').click();
    ok(this.controller.giveRaise.calledOnce);
});

// Sample acceptance test.

module('Employee features');

test('give John\'s boss a raise', function () {
    $('a:contains("Show employees")').click();
    $('a:contains("John")').click();
    $('.managed-by a').click();
    equal($('.salary').text(), '$80000');
    $('button:contains("Give Raise")').click();
    equal($('.salary').text(), '$88000');
});*/

