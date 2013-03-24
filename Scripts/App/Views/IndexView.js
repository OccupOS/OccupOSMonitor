/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />

OccupOS.IndexView = Ember.View.extend({
    propertyBinding: 'controller.value',
    didInsertElement: function() {
        console.log('Indexview');
        console.log(this.get('property'));
    }
});

/*OccupOS.anotherObject = Ember.Object.create({
    valueBinding: "OccupOS.IndexController.value",

    // OTHER CODE FOR THIS OBJECT...
});*/