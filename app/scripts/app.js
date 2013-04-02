require('app/components/jquery/jquery');
require('app/components/handlebars/handlebars.runtime');
require('app/components/ember/ember');
require('app/components/ember-data');
require('app/scripts/templates');

Ember.LOG_BINDINGS = true;

var OccupOS = Ember.Application.create({
    VERSION: '0.1.0',
    //possibly change to OccupOS Monitor
    name: 'OccupOS',
    author: 'Markus Padourek',
    LOG_TRANSITIONS: true,
    rootElement: '#test',
    ready: function () {
     //   console.log("---------test----------");
       // console.log(OccupOS.IndexController.set('sensors', OccupOS.Sensor.find({})));
     //   setInterval( function() {
       //     controller.set('sensors', OccupOS.Sensor.find({}))
        //}, 5000)
    }
});

/*Ember.onerror = function (error) {
    Em.$.ajax('/error-notification', 'POST', {
        stack: error.stack,
        otherInformation: 'exception message'
    });
};*/

require('app/scripts/store');
require('app/scripts/models/sensor');

require('app/scripts/views/application_view');
require('app/scripts/views/navbar_view');
require('app/scripts/views/index_view');

require('app/scripts/controllers/application_controller');
require('app/scripts/controllers/navbar_controller');
require('app/scripts/controllers/index_controller');
require('app/scripts/controllers/sensor_controller');

require('app/scripts/router');
require('app/scripts/routes/index_route');
