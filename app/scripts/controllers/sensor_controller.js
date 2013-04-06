/*OccupOS.SensordataController = Ember.Controller.extend({
    test: 'Hello World'
});*/

OccupOS.SensordataController = Ember.ArrayController.extend({
    sortProperties: ['measuredAt']
});

