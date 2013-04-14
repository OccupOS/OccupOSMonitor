OccupOS.IndexRoute = Ember.Route.extend({
    setupController: function (controller) {
        'use strict';
        var period = 1; // default: get latest hour data
        var oneMinute = 60 * 1000;
        var oneHour = oneMinute * 60;
        var oneDay = oneHour * 24;
        var timeInterval = oneMinute; // 1 minute by default
        controller.set('sensors', OccupOS.Sensor.find({ 'period': '1'}));
        var myInt = setInterval(function () {
            console.log('---------test----------');
            if (OccupOS.PeriodController.selection.id !== period)
            {
                period = OccupOS.PeriodController.selection.id;
                setTimeout(function () {
                    controller.set('sensors', OccupOS.Sensor.find({ 'period': period}));
                }, 2000);
                switch (period) {
                case 1:
                    timeInterval = oneMinute; // Update every one minute
                    break;
                case 2:
                    timeInterval = oneMinute * 10; // every 10 mins
                    break;
                case 3:
                    timeInterval = oneHour * 3; // every 3 hours
                    break;
                case 4:
                    timeInterval = oneHour * 12;
                    break;
                case 5:
                    timeInterval = oneDay * 2;
                }
                clearInterval(myInt);
                myInt = setInterval(myFunc, timeInterval);
            }
            controller.set('sensorUpdates', OccupOS.Sensor.find({ 'limit': '1'}));
        }, timeInterval);
        var myFunc = function () {
            console.log('---------test----------');
            if (OccupOS.PeriodController.selection.id !== period)
            {
                period = OccupOS.PeriodController.selection.id;
                setTimeout(function () {
                    controller.set('sensors', OccupOS.Sensor.find({ 'period': period}));
                }, 2000);
                switch (period) {
                case 1:
                    timeInterval = oneMinute; // Update every one minute
                    break;
                case 2:
                    timeInterval = oneMinute * 10; // every 10 mins
                    break;
                case 3:
                    timeInterval = oneHour * 3; // every 3 hours
                    break;
                case 4:
                    timeInterval = oneHour * 12;
                    break;
                case 5:
                    timeInterval = oneDay * 2;
                }
                controller.set('sensorUpdates', OccupOS.Sensor.find({ 'limit': '1'}));
                clearInterval(myInt);
                myInt = setInterval(myFunc, timeInterval);
            }
            controller.set('sensorUpdates', OccupOS.Sensor.find({ 'limit': '1'}));
        };
    },/*
     redirect: function () {
     this.transitionTo('monitor');
     }*/
});