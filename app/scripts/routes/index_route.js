OccupOS.IndexRoute = Ember.Route.extend({
    setupController: function (controller) {
        'use strict';
        var period = 1;
        controller.set('sensors', OccupOS.Sensor.find({ 'period': '1'}));
        setInterval(function () {
            console.log('---------test----------');
            if (OccupOS.PeriodController.selection.id !== period)
            {
                setTimeout(function () {
                    period = OccupOS.PeriodController.selection.id;
                    controller.set('sensors', OccupOS.Sensor.find({ 'period': period}));
                }, 2000);
                
            }
            
            console.log(period);
            controller.set('sensorUpdates', OccupOS.Sensor.find({ 'limit': '1'}));
        }, 5000);
    },/*
    redirect: function () {
        this.transitionTo('monitor');
    }*/
});