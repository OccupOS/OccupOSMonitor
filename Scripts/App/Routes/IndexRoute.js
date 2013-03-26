OccupOS.IndexRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        controller.set('sensors', OccupOS.Sensor.find({}));
        setInterval(function() {
            console.log("---------test----------");
            controller.set('sensorUpdates', OccupOS.Sensor.find({ "limit": "1" }));
        }, 5000);
    }/*,
    redirect: function () {
        this.transitionTo('monitor');
    }*/
});