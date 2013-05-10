'use strict';

OccupOS.IndexController = Ember.Controller.extend({
    occupants: '-',
    light: '-',
    temp: '-',
    pressure: '-',
    humidity: '-',
    selection: null,
    init: function () {
        //console.log('IndexController');
        //console.log(this.get('value'));
    },

    sensorsObserver: function () {
        if (this.get('sensorUpdates.isLoaded')) {
            console.log('from controller');
            var self = this;
         // console.log(this.get('sensorUpdates').toArray().length);
            this.get('sensorUpdates').toArray().forEach(function (d) {
                var sensorType = parseInt(d.get('sensorType'), 10);
                switch (sensorType) {
                case 1:
                    self.set('occupants', parseInt(d.get('measuredData'), 10));
                    break;
                case 3:
                    self.set('light', parseInt(d.get('measuredData'), 10));
                    break;
                case 5:
                    self.set('humidity', parseFloat(d.get('measuredData')).toFixed(2));
                    break;
                case 7:
                    self.set('pressure', parseFloat(d.get('measuredData')).toFixed(2));
                    break;
                case 9:
                    self.set('temp', parseFloat(d.get('measuredData')).toFixed(2));
                    break;
                default:
                    break;
                }
                //if (d.get("sensorType") == id) {
                //    updateValue = parseInt(d.get('measuredData'), 10);
                //}
            });
        }
    }.observes('sensorUpdates.isLoaded'),
    selectionObserver: function () {
       // console.log(this.get('selection'));
    }.observes('selection.isLoaded'),
    changePeriod: function(id){
        console.log('Changing Graph: ' + id);
        var oneMinute = 60 * 1000;
        var oneHour = oneMinute * 60;
        var oneDay = oneHour * 24;
        var timeInterval = oneMinute; // 1 minute by default
        switch (id) {
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
        window.timer1.change(window.myTimer1, timeInterval, id);
    }
    /*whenDataLoads: function () {
        console.log("whendataloads");
        console.log(this.get('sensors.isLoaded'));
        console.log(this.get('sensors.length'));

        this.set('content', this.get('sensors').toArray());
    }.observes('sensors.isLoaded')*/
});
