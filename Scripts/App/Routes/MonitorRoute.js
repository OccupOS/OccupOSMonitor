/**
    <Description of Route>

    @class
    @namespace OccupOS
    @extends Ember.Route

    further examples of use:
    @param {string} title - The title of the book.
    @param {string} author - The author of the book.
 */

OccupOS.MonitorRoute = Ember.Route.extend({
    /**
        @private (Note: ??really?? Not sure, just copied example from ember.js code)

        Connects the Controller with the Models. Loads SensorData from server using the API.

        @method setupController
    */
    setupController: function (controller, model) {
        // Note: The following comments are just for VS2012 intellisense. Consider using it (or not).
        /// <summary>
        /// 
        /// </summary>
        /// <param name="controller"></param>
        /// <param name="model"></param>
        controller.set('content', OccupOS.Sensordata.find());
    }
});