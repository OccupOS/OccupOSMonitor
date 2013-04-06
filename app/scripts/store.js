'use strict';
/*DS.WebAPIAdapter.map('OccupOS.Sensordata', {
    // Web API server is not handling reference update/delete, so use "load" instead of "always"
    sensorData: { embedded: 'load' }
});

var webApiAdapter = DS.WebAPIAdapter.create({
    namespace: "api",
    bulkCommit: false/*,
    antiForgeryTokenSelector: "#antiForgeryToken"*/
/*});

var serializer = Ember.get(webApiAdapter, 'serializer');
serializer.configure('OccupOS.Sensordata', {
    sideloadAs: "sensordata",
    primaryKey: "id"
});*/
//serializer.configure('App.Todo', {
//    sideloadAs: "todo",
//    primaryKey: "todoItemId"
//});

/*DS.RESTAdapter.configure("plurals", {
    sensors: "sensors"
});*/

DS.WebAPISerializer = DS.JSONSerializer.extend({
    keyForAttributeName: function (type, name) {
        // `firstName` stays as `firstName`. By default, the
        // RESTAdapter's serializer decamelizes name.
        return name;
    }
});

OccupOS.Adapter = DS.RESTAdapter.extend({
    serializer: DS.WebAPISerializer,
    url: 'http://localhost:9226',
    namespace: 'api/v1',
    buildURL: function (record, suffix) {
        return this._super(record, suffix) + '?callback=?';
    }
});

OccupOS.Store = DS.Store.extend({
    adapter: OccupOS.Adapter.create(),
    //adapter: webApiAdapter,
    revision: 11
});