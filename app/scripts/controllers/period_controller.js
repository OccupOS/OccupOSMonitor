OccupOS.PeriodController = Ember.ArrayProxy.create({
	needs: ['IndexController'],
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
	//	console.log(this.get('selection').get('firstObject').get('id'));
		//console.log('selection: ' + this.get('controllers.IndexController.selection'));
		//console.log(this.get('selection').get('id').toString());
	}.observes('selection.isLoaded')
});