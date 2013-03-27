/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />

OccupOS.IndexController = Ember.Controller.extend({
    occupants: '-',
    light: '-',
    temp: '-',
    pressure: '-',
    humidity: '-',
    init: function () {
        //console.log('IndexController');
        //console.log(this.get('value'));
    },

    sensorsObserver: function () {
        if (this.get('sensorUpdates.isLoaded')) {
            var self = this;
            this.get('sensorUpdates').toArray().forEach(function (d) {
                //  console.log(d.get("sensorType"));
                var sensorType = parseInt(d.get("sensorType"), 10);
                switch(sensorType){
                    case 1:
                        self.set('occupants', parseInt(d.get('measuredData'), 10));
                        break;
                    case 3:
                        self.set('light', parseInt(d.get('measuredData'), 10));
                        break;
                    case 5:
                        self.set('humidity', parseFloat(d.get('measuredData')));
                        break;
                    case 7:
                        self.set('pressure', parseFloat(d.get('measuredData')));
                        break;
                    case 9:
                        self.set('temp', parseFloat(d.get('measuredData')));
                        break;
                    default:
                       break;
                }
                //if (d.get("sensorType") == id) {
                //    updateValue = parseInt(d.get('measuredData'), 10);
                //}
            });
        }
    }.observes('sensorUpdates.isLoaded')
    /*whenDataLoads: function () {
        console.log("whendataloads");
        console.log(this.get('sensors.isLoaded'));
        console.log(this.get('sensors.length'));

        this.set('content', this.get('sensors').toArray());
    }.observes('sensors.isLoaded')*/
});
