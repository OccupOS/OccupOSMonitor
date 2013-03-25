OccupOS.IndexRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        controller.set('sensors', OccupOS.Sensor.find({}));
    }/*,
    redirect: function () {
        this.transitionTo('monitor');
    }*/
});