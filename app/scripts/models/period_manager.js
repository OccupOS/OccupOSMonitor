OccupOS.PeriodManager = Ember.ArrayProxy.create({
	selection: null,
	content: [
		OccupOS.Period.create({id: 1, periodTime: 'last hour'}),
		OccupOS.Period.create({id: 2, periodTime: 'last 24 hours'}),
		OccupOS.Period.create({id: 3, periodTime: 'last week'}),
		OccupOS.Period.create({id: 4, periodTime: 'last month'}),
		OccupOS.Period.create({id: 5, periodTime: 'last year'})
	],

	selectionObserver: function () {
		'use strict';
	//	this.set('controllers.IndexController.selection', this.get('selection'));
		console.log('selection updated');
		var oneMinute = 60 * 1000;
        var oneHour = oneMinute * 60;
        var oneDay = oneHour * 24;
        var timeInterval = oneMinute; // 1 minute by default
		switch (this.get('selection.id')) {
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
		OccupOS.IndexRoute.change(OccupOS.IndexRoute.myTimer, timeInterval);
	//	console.log(this.get('selection').get('firstObject').get('id'));
		//console.log('selection: ' + this.get('controllers.IndexController.selection'));
		//console.log(this.get('selection').get('id').toString());
	}.observes('selection.isLoaded')
});