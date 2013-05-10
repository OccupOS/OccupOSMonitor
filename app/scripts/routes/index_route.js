'use strict';

OccupOS.IndexRoute = Ember.Route.extend({
    myTimer: {},
    controller: null,
    timer: {},
    myFunc2: function () {
        //var period = OccupOS.PeriodManager.selection.id;
        window.controller1.set('sensorUpdates', OccupOS.Sensor.find({ 'limit': '1'}));
    },
    setupController: function (controller) {
        window.controller1 = controller;
        controller.set('sensors', OccupOS.Sensor.find({ 'period': '1'}));

        //this.set('timer',timer1);
        //this.set('timer', timer1);
        //60000ms = last hour
        window.myTimer1 = window.timer1.start(this.myFunc2, 60000);
        /*var period = 1; // default: get latest hour data
        var oneMinute = 60 * 1000;
        var oneHour = oneMisnute * 60;
        var oneDay = oneHour * 24;
        var timeInterval = oneMinute; // 1 minute by default
        controller.set('sensors', OccupOS.Sensor.find({ 'period': '1'}));
        var myInt = setInterval(function () {
            console.log('---------test----------');
            if (OccupOS.PeriodManager.selection.id !== period)
            {
                period = OccupOS.PeriodManager.selection.id;
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
            if (OccupOS.PeriodManager.selection.id !== period)
            {
                period = OccupOS.PeriodManager.selection.id;
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
    },*/
    /*
     redirect: function () {
     this.transitionTo('monitor');
     }*/
    }
});

window.timer1 = {
    timers:{},
    inc:0,
    start:function(cb, gap) {
        var key = this.inc;
        this.inc++;
        this.timers[key] = [setInterval(cb, gap), cb];
        return key;
    },
    stop:function(id) {
        if( !this.timers[id]) { return; }
        clearInterval(this.timers[id][0]);
        delete this.timers[id];
    },
    change: function(id, newgap, t) {
        if( !this.timers[id]) { return; }
        clearInterval(this.timers[id][0]);
        console.log(newgap);
        window.controller1.set('sensors', OccupOS.Sensor.find({ 'period': t}));
        setInterval(this.timers[id][1], newgap);
    }
};
