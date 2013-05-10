'use strict';

OccupOS.BtngroupController = Ember.Controller.extend({
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
        console.log(timeInterval);
        window.timer1.change(window.myTimer1, timeInterval, id);
    }
});
