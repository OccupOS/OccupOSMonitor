/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />

OccupOS.IndexView = Ember.View.extend({
    templateName: 'Index',
    //test: 'soo',
    testBinding: 'OccupOS.IndexController.content',
    init: function() {
        console.log('Indexview');
        console.log(this.get('test'));
    }
})