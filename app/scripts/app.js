require('app/components/jquery/jquery');
require('app/components/handlebars/handlebars-runtime');
require('app/components/ember/ember');
require('app/components/ember-data-APIv11');
require('app/scripts/templates');
require('app/components/d3/d3');


Ember.LOG_BINDINGS = true;

window.OccupOS = Ember.Application.create({
    VERSION: '0.1.0',
    //possibly change to OccupOSMonitor
    name: 'OccupOS',
    author: 'Markus Padourek',
    LOG_TRANSITIONS: true,
    //change to a proper rootElement
    rootElement: '#test',
});

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