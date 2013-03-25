OccupOS.IndexRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        controller.set('sensors', OccupOS.Sensor.find({}));
        setInterval(function() 
        { console.log("---------test----------"); controller.set('sensors', OccupOS.Sensor.find({})); }, 20000)
    }/*,
    redirect: function () {
        this.transitionTo('monitor');
    }*/
});