﻿/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />
/// <reference path="../../_references.js" />
'use strict';

//possibly move helper-functions into different file!
function createLineChart(currentView, width) {
    console.log('creating line chart');
    //Setting default value for width
    width = typeof width !== 'undefined' ? width : 960;
    //values for width and height should be (more) dynamical, based on how big you actually want the graph. Seems useful for better font-rendering.
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        //height = 350 - margin.top - margin.bottom,
        height = 350 - 10 - 15,
        sensors = currentView.get('parentView.parentView.sensors'),
        graphSensorType = currentView.get('sensorType'),
        lineChartNr = currentView.get('lineChartNr'),
        parseDate = d3.time.format.iso.parse,
        sensorsArray = [],
        xvalues = [],
        yvalues = [];

    width = width - margin.left - margin.right;
    sensors.forEach(function (d) {

        if (d.get('sensorType') === graphSensorType) {
            // might need that to display date/time on x-Axis. Hopefully not though.
            sensorsArray.addObject(d);
            xvalues.push(parseDate(d.get('measuredAt')));
            yvalues.push(parseInt(d.get('measuredData'), 10));
        }
    });
    //the latest data should be at the end rather than at the beginning for d3js
    //  yvalues.reverse();
    // sensorsArray.reverse();
    currentView.set('sensorsArray', sensorsArray);
    //   var x = d3.scale.linear().domain([0, xvalues.length - 1]).range([0, width]);
    // Used for displaying date/time
    console.log(d3.extent(xvalues));
    var x = d3.time.scale().domain(d3.extent(xvalues)).range([0, width]);
    var y = d3.scale.linear().domain(d3.extent(yvalues))
        .range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    //TO-DO: Show date/time for x-Axis
    var line = d3.svg.line()
        //.x(function (d) { console.log('line x bla'); console.log(d); return x(d.get('measuredData')); })
        .y(function (d) { return y(d.get('measuredData')); })
        .x(function (d) { return x(parseDate(d.get('measuredAt'))); })
        //      .x(function (d, i) { return x(i); })
        //    .y(function (d) { return y(d); })
        .interpolate('linear');
    //this.set('line', line);

    //var svg = d3.select('#test').append('svg')
    //    .attr('width', width + margin.left + margin.right)
    //    .attr('height', height + margin.top + margin.bottom)
    //  .append('g')
    //    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //TO-DO: Fix that d3.select command. Possible have a parameter.
    //Or use selectAll and check which .linechart-div doesn't have any svg elements yet.
    console.log(d3.extent(xvalues));
    var svg = d3.select(d3.selectAll('.linechart')[0][lineChartNr]).append('svg')
        .data([sensorsArray])
        .attr('class', 'graph')
        .attr('height', height + margin.top + margin.bottom)
        .append('svg')
        .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
        .attr('preserveAspectRatio', 'none')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('x', width)
        .attr('dx', '.10em')
        .style('text-anchor', 'end')
        .text('Time period');

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Intensity');

    svg.append('path')
        //.datum(sensorsArray)
        .attr('class', 'line')
        .attr('d', line);



    currentView.set('yvalue', yvalues);
    currentView.set('line', line);
    currentView.set('x', x);
    currentView.set('y', y);
    currentView.set('graph', svg);
    currentView.set('xvalue', xvalues);
}

function updateLineChart(currentView, simulationMode, width) { //add parameter simulationMode
    var graph = currentView.get('graph'),
    // line = currentView.get('line'),
        graphSensorType = currentView.get('sensorType'),
        sensorsArray = currentView.get('sensorsArray'),
        xvalues = [],
        yvalues = [],
        parseDate = d3.time.format.iso.parse,
    // updateValue = 0,
        sensorUpdates = currentView.get('parentView.parentView.sensorUpdates'),
        measuredDataArray = [];
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        height = 350 - margin.top - margin.bottom;
    //graph.select('.yaxis').transition().duration(10).call(yAxis);
    width = width - margin.left - margin.right;
    if(sensorsArray[0].get('measuredData')==='NaN')
        {
        console.log('connection error');
        return;
    }
    sensorsArray.forEach(function (d) {
        measuredDataArray.push(d.get('measuredData'));
    });
    //var firstElement = sensorsArray.shift();

    //      console.log(currentView.get('parentView.parentView.sensorUpdates').toArray());
    if (simulationMode) {
        var firstElement = measuredDataArray.shift();
        measuredDataArray.push(firstElement);
        var i = 0;
        sensorsArray.forEach(function (d) {
            d.set('measuredData', measuredDataArray[i]);
            i++;
        });
    } else {
        //measuredDataArray.shift();
        sensorsArray.shift();
        sensorUpdates.forEach(function (d) {
            if (d.get('sensorType') === graphSensorType) {
                //if (parseInt(d.get('measuredData'), 10)  === measuredDataArray[measuredDataArray.length - 1]) {
                if (parseInt(d.get('measuredData'), 10)  === sensorsArray[sensorsArray.length - 1]) {
                    console.log('warning');
                    $('#warn-temp').remove();
                    var warning = '<div class ="alert" id="warn-temp"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Warning!</strong> The temperature did not change. Check your sensors!.</div>';
                    $('.container:first').prepend(warning);
                } else {
                    $('#warn-temp').remove();
                }
                //measuredDataArray.push(d.get('measuredData'));
                sensorsArray.push(d);
            }
        });
    }

    /*var i = 0;

     sensorsArray.forEach(function (d) {
     d.set('measuredData', measuredDataArray[i]);
     i++;
     });*/
    currentView.set('sensorsArray', sensorsArray);
    sensorsArray.forEach(function (d) {
        // might need that to display date/time on x-Axis. Hopefully not though.
        //sensorsArray.addObject(d);
        xvalues.push(parseDate(d.get('measuredAt')));
        yvalues.push(parseInt(d.get('measuredData'), 10));
    });

    var x = d3.time.scale().domain(d3.extent(xvalues)).range([0, width]);
    var y = d3.scale.linear().domain(d3.extent(yvalues))
        .range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');
    console.log(d3.extent(xvalues));
    var line = d3.svg.line()
        //.x(function (d) { console.log('line x bla'); console.log(d); return x(d.get('measuredData')); })
        .y(function (d) { return y(d.get('measuredData')); })
        .x(function (d) { return x(parseDate(d.get('measuredAt'))); })
        //      .x(function (d, i) { return x(i); })
        //    .y(function (d) { return y(d); })
        .interpolate('linear');

    graph.selectAll('path.line')
        .data([sensorsArray]) // set the new data
        .transition() // start a transition to bring the new value into view
        .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
        .ease('sin')
        .attr('d', line);
    graph.selectAll('.x.axis').transition().duration(500).call(xAxis);
    graph.selectAll('.y.axis').transition().duration(500).call(yAxis);
    //currentView.set('xvalues',xvalues);
    //currentView.set('yvalues',yvalues);
    //var v = yvalues.shift(); // remove the first element of the array
    //exchange v with updateValue
    //this.get('data').push(updateValue);
    //yvalues.push(v);
    //Note change order of functions to make animation look a bit better


    /* Other possible animation:

     graph.selectAll('path.line')
     .data([this.get('data')]) // set the new data
     .attr('transform', 'translate(' + this.get('x')(1) + ')') // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
     .attr('d', line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
     .transition() // start a transition to bring the new value into view
     .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
     .ease('sin')
     .attr('transform', 'translate(' + this.get('x')(0) + ')');

     */
}


OccupOS.IndexView = Ember.ContainerView.extend({
    classNames: ['monitor'],
    //layoutName: 'rowwrapper',
    //   childViews: ['TableView', 'LinechartView','LinecharttwoView'],
    childViews: ['RowOneView', 'RowTwoView', 'RowThreeView'],
    sensorsBinding: 'controller.sensors',
    sensorsIsLoaded: false,
    sensorUpdatesBinding: 'controller.sensorUpdates',
    sensorsObserver: function () {
        if (this.get('sensors.isLoaded')) {
            //convert sensors immediately to array, so it can be used straight away
            this.set('sensorsIsLoaded', true);

            this.set('sensors', this.get('sensors').toArray());
            this.rerender();
            console.log('----------rerender-------------');

        }
    }.observes('sensors.isLoaded'),
    sensorUpdatesObserver: function () {
        if (this.get('sensorUpdates.isLoaded')) {
            this.set('sensorUpdates', this.get('sensorUpdates').toArray());

            this.get('childViews').objectAt(0).get('childViews').objectAt(1).updateChart();
            this.get('childViews').objectAt(1).get('childViews').objectAt(0).updateChart();
        }
    }.observes('sensorUpdates.isLoaded'),
    RowOneView: Ember.ContainerView.extend({
        classNames: ['row'],
        childViews: ['TableView', 'LinechartView'],
        TableView: Ember.View.extend({
            classNames: ['col-span-6'],
            templateName: 'table',
            didInsertElement: function didInsertElement() {
                $('.table').dataTable();
            }
        }),
        LinechartView: Ember.View.extend({
            classNames: ['col-span-6'],
            templateName: 'linechart',
            lineChartNr: 0,
            chartTitle: 'Light Intensity History',
            sensorType: 3,
            chart: {},
            line: null,
            graph: null,
            x: null,
            y: null,
            xvalues: null,
            data: null,
            lineNew: null,
            sensorsArray: {},
            //layoutName: 'rowwrapper',
            //sensorsBinding: 'parentView.parentView.sensors',
            didInsertElement: function didInsertElement() {
                if (this.get('parentView.parentView.sensorsIsLoaded')) {
                    createLineChart(this, 560);

                }
            },
            updateChart: function updateChart() {
                var simulationMode = false;
                updateLineChart(this, simulationMode, 560);
            }
        })
    }),
    RowTwoView: Ember.ContainerView.extend({
        classNames: ['row'],
        childViews: ['LinecharttwoView'/*, 'ForceChartView'*/],
        LinecharttwoView: Ember.View.extend({
            classNames: ['col-span-12'],
            templateName: 'linechart',
            chartTitle: 'Temperature History',
            lineChartNr: 1,
            sensorType: 9,
            chart: {},
            line: null,
            graph: null,
            x: null,
            y: null,
            yvalues: null,
            lineNew: null,
            sensorsArray: {},
            //layoutName: 'rowwrapper',
            //sensorsBinding: 'parentView.parentView.sensors',
            didInsertElement: function didInsertElement() {
                if (this.get('parentView.parentView.sensorsIsLoaded')) {
                    createLineChart(this);
                }
            },
            updateChart: function updateChart() {
                var simulationMode = false;
                updateLineChart(this, simulationMode, 960);
                //updateLineChartFromServer(this);
            }
        }),
        ForceChartView: Ember.View.extend({
            classNames: ['span4'],
            templateName: 'linechart',
            didInsertElement: function didInsertElement() {
                /*var width = 960,
                 height = 500;

                 var color = d3.scale.category20();

                 var force = d3.layout.force()
                 .charge(-120)
                 .linkDistance(30)
                 .size([width, height]);
                 //return null;
                 var svg = d3.select(d3.selectAll('.linechart')[0][1]).append('svg')
                 .attr('width', width)
                 .attr('height', height);*/

                /*d3.json('/scripts/data.json', function (error, graph) {
                 force
                 .nodes('[{"name":"Person1","group":1}, {"name":"Person2","group":2}, {"name":"Person3","group":3}, {"name":"Person3","group":4}]')
                 .links('[{"source":1,"target":0,"value":1}, {"source":2,"target":0,"value":8}, {"source":3,"target":0,"value":10}, {"source":3,"target":2,"value":6}}')
                 .start();

                 var link = svg.selectAll('.link')
                 .data('[{"source":1,"target":0,"value":1}, {"source":2,"target":0,"value":8}, {"source":3,"target":0,"value":10}, {"source":3,"target":2,"value":6}]')
                 .enter().append('line')
                 .attr('class', 'link')
                 .style('stroke-width', function (d) { return Math.sqrt(d.value); });

                 var node = svg.selectAll('.node')
                 .data('[{"name":"Person1","group":1}, {"name":"Person2","group":2}, {"name":"Person3","group":3}, {"name":"Person3","group":4}]')
                 .enter().append('circle')
                 .attr('class', 'node')
                 .attr('r', 5)
                 .style('fill', function (d) { return color(d.group); })
                 .call(force.drag);

                 node.append('title')
                 .text(function (d) { return d.name; });*/

                /*force.on('tick', function () {
                 link.attr('x1', function (d) { return d.source.x; })
                 .attr('y1', function (d) { return d.source.y; })
                 .attr('x2', function (d) { return d.target.x; })
                 .attr('y2', function (d) { return d.target.y; });

                 node.attr('cx', function (d) { return d.x; })
                 .attr('cy', function (d) { return d.y; });
                 });*/
                //});
            }
        })
    }),
    RowThreeView: Ember.ContainerView.extend({
        classNames: ['row'],
        childViews: ['SelectView'],
        SelectView: Ember.View.extend({
            //templateName: 'btngroup',
            //click: function(e){
            //    console.log('Clickhandler wooo');
            //    var clickedButton = $(e.target);
            //    clickedButton.siblings().removeClass('active');
            //    clickedButton.addClass('active');
            //}
        })
    })
});