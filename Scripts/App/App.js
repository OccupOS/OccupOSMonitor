/// <reference path="../_references.js" />

Ember.LOG_BINDINGS = true;

var OccupOS = Ember.Application.create({
    VERSION: '0.1.0',
    //possibly change to OccupOS Monitor
    name: 'OccupOS',
    author: 'Markus Padourek',
    LOG_TRANSITIONS: true,
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



$(function () {
      //window.setInterval(function () {
    //    OccupOS.IndexController.set('sensors', OccupOS.Sensor.find({}))
    //}, 10000);
});