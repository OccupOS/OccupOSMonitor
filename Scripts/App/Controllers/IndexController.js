/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />

OccupOS.IndexController = Ember.Controller.extend({
    value: 'blas',
    init: function () {
        //console.log('IndexController');
        //console.log(this.get('value'));
    },
    /*whenDataLoads: function () {
        console.log("whendataloads");
        console.log(this.get('sensors.isLoaded'));
        console.log(this.get('sensors.length'));

        this.set('content', this.get('sensors').toArray());
    }.observes('sensors.isLoaded')*/
});
