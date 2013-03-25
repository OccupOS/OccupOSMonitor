/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />
/// <reference path="../../_references.js" />

OccupOS.IndexView = Ember.View.extend({
    sensorsBinding: 'controller.sensors',
    sensorsObserver: function() {
        this.rerender();
    }.observes('sensors.isLoaded'),
    /*whenDataLoads: function () {
        console.log("whendataloadsView");
        console.log(this.get('sensors.isLoaded'));
        console.log(this.get('sensors.length'));

        this.set('content', this.get('sensors').toArray());
    }.observes('sensors.isLoaded'),*/
    didInsertElement: function () {
        if (this.get('sensors.isLoaded')) {
            console.log('Indexview');
            //console.log(this.get('sensors'));
            console.log(this.get('sensors.length'));
            console.log(this.get('sensors.isLoaded'));
            var sensorsArray = this.get('sensors').toArray();
            console.log(sensorsArray[0].get("measuredAt"));
            var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format.iso.parse;
            //   var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L").parse;
            //var parseDate = d3.time.format("%d-%b-%y").parse;
            var x = d3.time.scale.utc()
                //  var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) { return x(d.MeasuredAt); })
                .y(function(d) { return y(d.MeasuredData); });

            /*var svg = d3.select("#test").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

            var svg = d3.select("#test").append("svg")
                .attr('class', 'graph')
                .attr('height', height + margin.top + margin.bottom)
                .append("svg")
                //.attr("width", width + margin.left + margin.right)
                //.attr("height", height + margin.top + margin.bottom)
                .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                //.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                .attr("preserveAspectRatio", "none")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            $.getJSON("http://localhost:9226/api/v1/sensors?callback=?", function(sensors) {
                // json = JSON.parse(sensors.getJSON);
                //   str = JSON.stringify(sensors);
                console.log(sensors["sensors"]);
                //   json = JSON.parse(str);
                // json["sensors"].forEach(function (d) {
                // JSON.stringify(sensors);
                //json = JSON.parse(sensors);
                sensors["sensors"].forEach(function(d) {
                    d.measuredAt = parseDate(d.measuredAt);
                    d.measuredData = d.measuredData;
                    // console.log(d);
                });
                x.domain(d3.extent(sensors["sensors"], function(d) { return d.measuredAt; }));
                y.domain(d3.extent(sensors["sensors"], function(d) { return d.measuredData; }));

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Price ($)");

                svg.append("path")
                    .datum(sensors["sensors"])
                    .attr("class", "line")
                    .attr("d", line);

            });

                /*    var myjson = '{"sensors": [ { "MeasuredData": "434", "MeasuredAt": "2013-03-21T14:34:24.0000000"}, { "MeasuredData": "654", "MeasuredAt": "2013-03-22T14:34:24.0000000" } ]}';
                //  var myjson = '{"sensors": [ { "MeasuredData": "434", "MeasuredAt": "12-Feb-13"}, { "MeasuredData": "654", "MeasuredAt": "14-Feb-13" } ]}';
                json = JSON.parse(myjson); //add this line
                console.log(json["sensors"]);
                console.log(json["sensors"].length);
                json["sensors"].forEach(function (d) {
                    console.log("test");
                    d.MeasuredAt = parseDate(d.MeasuredAt);
                    d.MeasuredData = d.MeasuredData;
                    console.log(d.MeasuredAt);
                });
                x.domain(d3.extent(json["sensors"], function (d) { return d.MeasuredAt; }));
                    y.domain(d3.extent(json["sensors"], function (d) { return d.MeasuredData; }));*/

            /*     svg.append("g")
                     .attr("class", "x axis")
                     .attr("transform", "translate(0," + height + ")")
                     .call(xAxis);
     
                 svg.append("g")
                     .attr("class", "y axis")
                     .call(yAxis)
                     .append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 6)
                     .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .text("Price ($)");
     
                 svg.append("path")
                     .datum(json["sensors"])
                     .attr("class", "line")
                     .attr("d", line);*/
        }
    }
});

/*OccupOS.anotherObject = Ember.Object.create({
    valueBinding: "OccupOS.IndexController.value",

    // OTHER CODE FOR THIS OBJECT...
});*/