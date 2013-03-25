/// <reference path="../_references.js" />

Ember.LOG_BINDINGS = true;

var OccupOS = Ember.Application.create({
    VERSION: '0.1.0',
    //possibly change to OccupOS Monitor
    name: 'OccupOS',
    author: 'Markus Padourek',
    LOG_TRANSITIONS: true
    //ready: function() {
    //
    //}
});

/*Ember.onerror = function (error) {
    Em.$.ajax('/error-notification', 'POST', {
        stack: error.stack,
        otherInformation: 'exception message'
    });
};*/