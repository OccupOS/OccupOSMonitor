require('app/lib/jquery/jquery');
require('app/lib/nightlies/handlebars-runtime');
require('app/lib/ember/ember');
require('app/lib/nightlies/ember-data-APIv11');
require('app/scripts/templates');
require('app/lib/d3/d3');
require('app/lib/nightlies/jquery-dataTables');
require('app/lib/nightlies/bootstrap-dataTables');


Ember.LOG_BINDINGS = true;

window.OccupOS = Ember.Application.create({
    VERSION: '0.1.0',
    //possibly change to OccupOSMonitor
    name: 'OccupOS',
    author: 'Markus Padourek',
    LOG_TRANSITIONS: true,
    //change to a proper rootElement
    rootElement: window.TESTING ? '#qunit-fixture' : '#occupos-app'
});

if (window.TESTING) {
    window.OccupOS.deferReadiness();
}

require('app/scripts/store');
require('app/scripts/models/sensor');

require('app/scripts/views/application_view');
require('app/scripts/views/navbar_view');
require('app/scripts/views/index_view');

require('app/scripts/controllers/application_controller');
require('app/scripts/controllers/navbar_controller');
require('app/scripts/controllers/index_controller');

require('app/scripts/router');
require('app/scripts/routes/index_route');