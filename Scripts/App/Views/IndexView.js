/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />
/// <reference path="../../_references.js" />

OccupOS.IndexView = Ember.ContainerView.extend({
    classNames: ['monitor'],
    //layoutName: 'rowwrapper',
    childViews: ['TableView', 'LinechartView','LinecharttwoView'],
    sensorsBinding: 'controller.sensors',
    sensorsArray: null,
    sensorUpdatesBinding: 'controller.sensorUpdates',
    sensorsObserver: function () {
        if (this.get('sensors.isLoaded')) {
            this.rerender();
            console.log("----------rerender-------------");
            this.set('sensorsArray', this.get('sensors').toArray());
        }
    }.observes('sensors.isLoaded'),
    sensorUpdatesObserver: function () {
        if (this.get('sensorUpdates.isLoaded')) {
            this.get('childViews').objectAt(1).updateChart();
            this.get('childViews').objectAt(2).updateChart();
        }
    }.observes('sensorUpdates.isLoaded'),
    LinechartView: Ember.View.extend({
        templateName: 'linechart',
        chart: {},
        line: {},
        graph: null,
        x: null,
        y: null,
        data: null,
        lineNew: null,
        //layoutName: 'rowwrapper',
        //sensorsBinding: 'parentView.sensors',
        didInsertElement: function didInsertElement() {
            if (this.get('parentView.sensors.isLoaded')) {
                console.log('chart two: draw now');
                //drawLineChart(this.get('parentView.sensors'),3);
                var id = 1;
                var sensorsArrayTmp = this.get('parentView.sensors').toArray();

                var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
                var parseDate = d3.time.format.iso.parse;

                var sensorsArray = new Array(),
                    xvalues = new Array(),
                    yvalues = new Array();
                sensorsArrayTmp.forEach(function (d) {
                    //  console.log(d.get("sensorType"));
                    if (d.get("sensorType") == id) {
                        sensorsArray.addObject(d);
                        xvalues.push(parseDate(d.get('measuredAt')));
                        yvalues.push(parseInt(d.get('measuredData')));
                    }
                });
                // sensorsArray = sensors.toArray();
                //  console.log(sensorsArray[0].get("measuredAt"));
                // console.log(sensorsArray[0].get("measuredAt"));

                //var x = d3.time.scale.utc().
                //  .range([0, width]);
                var x = d3.scale.linear().domain([0, xvalues.length - 1]).range([0, width]);
                //var x = d3.time.scale.utc().domain(d3.extent(xvalues)).range([0, width]);
                var y = d3.scale.linear().domain(d3.extent(yvalues))
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var line = d3.svg.line()
                    //.x(function (d) { console.log('line x bla'); console.log(d); return x(d.get("measuredData")); })
                //.y(function (d) { return y(d.get("measuredData")); });
                //.x(function (d, i) { console.log('line x bla'); console.log(d); console.log(i); console.log(x(i)); return 178*i; })
                  .x(function (d, i) { return x(i); })
                .y(function (d) { return y(d); })
                .interpolate("basis");
                //this.set('line', line);

                /*var svg = d3.select("#test").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

                var svg = d3.select(".linechart").append("svg")
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

                //sensorsArray.forEach(function (d) {
                //    d.set("measuredAt", parseDate(d.get("measuredAt")));
                //    d.set("measuredData", d.get("measuredData"));
                //});

                //x.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredAt"); }));
                //y.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredData"); }));

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
                    //.datum(sensorsArray)
                    .attr("class", "line")
                    .attr("d", line(yvalues));
                //this.set('chart', svg);
                //console.log(this.get('chart'));
                this.set('data', yvalues);
                this.set('lineNew', line);
                this.set('x', x);
                this.set('y', y);
                this.set('graph', svg);
            }


            /*
            if (this.get('parentView.sensors.isLoaded')) {
                console.log('LinechartViewGut');
                //drawLineChart(this.get('parentView.sensors'), 1);
                var sensors = this.get('parentView.sensors');
        //		var sensors = this.get('parentView.sensorsArray');
                var id = 1;
                console.log('drawlinechart');

            //	var sensorsArrayTmp = sensors.toArray();
                var sensorsArrayTmp = sensors;
                var sensorsArray = new Array();
                sensorsArrayTmp.forEach(function (d) {
                    //  console.log(d.get("sensorType"));
                    if (d.get("sensorType") == id) {
                        sensorsArray.addObject(d);

                    }
                });
                // sensorsArray = sensors.toArray();
                //  console.log(sensorsArray[0].get("measuredAt"));
                // console.log(sensorsArray[0].get("measuredAt"));

                var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;
                var parseDate = d3.time.format.iso.parse;

                var x = d3.time.scale.utc()
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
                    .x(function (d) { return x(d.get("measuredAt")); })
                    .y(function (d) { return y(d.get("measuredData")); });
                this.set('line', line);



                var svg = d3.select(".linechart").append("svg")
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

                sensorsArray.forEach(function (d) {
                    d.set("measuredAt", parseDate(d.get("measuredAt")));
                    d.set("measuredData", d.get("measuredData"));
                });

                x.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredAt"); }));
                y.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredData"); }));

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
                    .datum(sensorsArray)
                    .attr("class", "line")
                    .attr("d", line);
                this.set('chart', svg);

                alert('didInsertElement. If statement');
            }
            //   } else {
            //       console.log('badboy');
            //    }
            alert('didInsertElement');
        */},
        updateChart: function updateChart() {
            var graph = this.get('graph');
            var line = this.get('lineNew');
            var v = this.get('data').shift(); // remove the first element of the array
            this.get('data').push(v);
            //Note change order of functions to make animation look a bit better
            graph.selectAll("path.line")
                .data([this.get('data')]) // set the new data
                .transition() // start a transition to bring the new value into view
                .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                .ease("sin")
                .attr("d", line);

            /* Other possible animation:
            graph.selectAll("path.line")
                    .data([this.get('data')]) // set the new data
                    .attr("transform", "translate(" + this.get('x')(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
                    .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
                    .transition() // start a transition to bring the new value into view
                    .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                    .ease("sin")
                    .attr("transform", "translate(" + this.get('x')(0) + ")"); 

            */
        }
    }),
    TableView: Ember.View.extend({
        templateName: 'table',
        test: 'testa'
    }),
    LinecharttwoView: Ember.View.extend({
        templateName: 'linechart',
        chart: {},
        line: {},
        graph: null,
        x: null,
        y: null,
        data: null,
        lineNew: null,
        //layoutName: 'rowwrapper',
        //sensorsBinding: 'parentView.sensors',
        didInsertElement: function didInsertElement() {
            if (this.get('parentView.sensors.isLoaded')) {
                console.log('chart two: draw now');
                //drawLineChart(this.get('parentView.sensors'),3);
                var id = 3;
                var sensorsArrayTmp = this.get('parentView.sensors').toArray();

                var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
                var parseDate = d3.time.format.iso.parse;

                var sensorsArray = new Array(),
                    xvalues = new Array(),
                    yvalues = new Array();
                sensorsArrayTmp.forEach(function (d) {
                    //  console.log(d.get("sensorType"));
                    if (d.get("sensorType") == id) {
                        sensorsArray.addObject(d);
                        xvalues.push(parseDate(d.get('measuredAt')));
                        yvalues.push(parseInt(d.get('measuredData')));
                    }
                });
                // sensorsArray = sensors.toArray();
                //  console.log(sensorsArray[0].get("measuredAt"));
                // console.log(sensorsArray[0].get("measuredAt"));

                //var x = d3.time.scale.utc().
                //  .range([0, width]);
                var x = d3.scale.linear().domain([0, xvalues.length - 1]).range([0, width]);
                //var x = d3.time.scale.utc().domain(d3.extent(xvalues)).range([0, width]);
                var y = d3.scale.linear().domain(d3.extent(yvalues))
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var line = d3.svg.line()
                    //.x(function (d) { console.log('line x bla'); console.log(d); return x(d.get("measuredData")); })
                //.y(function (d) { return y(d.get("measuredData")); });
                //.x(function (d, i) { console.log('line x bla'); console.log(d); console.log(i); console.log(x(i)); return 178*i; })
                  .x(function (d, i) { return x(i); })
                .y(function (d) { return y(d); })
                .interpolate("basis");
                //this.set('line', line);

                /*var svg = d3.select("#test").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

                var svg = d3.select(".linechart").append("svg")
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

                //sensorsArray.forEach(function (d) {
                //    d.set("measuredAt", parseDate(d.get("measuredAt")));
                //    d.set("measuredData", d.get("measuredData"));
                //});

                //x.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredAt"); }));
                //y.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredData"); }));

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
                    //.datum(sensorsArray)
                    .attr("class", "line")
                    .attr("d", line(yvalues));
                //this.set('chart', svg);
                //console.log(this.get('chart'));
                this.set('data', yvalues);
                this.set('lineNew', line);
                this.set('x', x);
                this.set('y', y);
                this.set('graph', svg);
            }
        },
        updateChart: function updateChart() {
            var graph = this.get('graph');
            var line = this.get('lineNew');
            var v = this.get('data').shift(); // remove the first element of the array
            this.get('data').push(v);
            //Note change order of functions to make animation look a bit better
            graph.selectAll("path.line")
                .data([this.get('data')]) // set the new data
                .transition() // start a transition to bring the new value into view
                .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                .ease("sin")
                .attr("d", line);
            
            /* Other possible animation:

            graph.selectAll("path.line")
                    .data([this.get('data')]) // set the new data
                    .attr("transform", "translate(" + this.get('x')(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
                    .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
                    .transition() // start a transition to bring the new value into view
                    .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                    .ease("sin")
                    .attr("transform", "translate(" + this.get('x')(0) + ")"); 

            */
        }
    })
});

function drawLineChart(sensors,id) {
    console.log('drawlinechart');
    
    var sensorsArrayTmp = sensors.toArray();
    
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    var parseDate = d3.time.format.iso.parse;

    var sensorsArray = new Array(),
        xvalues = new Array(),
        yvalues = new Array();
    console.log('1');
    sensorsArrayTmp.forEach(function (d) {
    //  console.log(d.get("sensorType"));
        if (d.get("sensorType") == id) {
            sensorsArray.addObject(d);
            xvalues.push(parseDate(d.get('measuredAt')));
            yvalues.push(parseInt(d.get('measuredData')));
        }
    });
    console.log('2');
   // sensorsArray = sensors.toArray();
  //  console.log(sensorsArray[0].get("measuredAt"));
   // console.log(sensorsArray[0].get("measuredAt"));

    //var x = d3.time.scale.utc().
    //  .range([0, width]);
    var x = d3.scale.linear().domain([0, xvalues.length-1]).range([0, width]);
    //var x = d3.time.scale.utc().domain(d3.extent(xvalues)).range([0, width]);
    console.log('extent___________:');
    console.log(d3.extent(xvalues));
    console.log(d3.extent(yvalues));
    console.log(yvalues);
    var y = d3.scale.linear().domain(d3.extent(yvalues))
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        //.x(function (d) { console.log('line x bla'); console.log(d); return x(d.get("measuredData")); })
    //.y(function (d) { return y(d.get("measuredData")); });
    //.x(function (d, i) { console.log('line x bla'); console.log(d); console.log(i); console.log(x(i)); return 178*i; })
      .x(function (d, i) { return x(i); })
    .y(function (d) {  return y(d); })
    .interpolate("basis");
    //this.set('line', line);

    /*var svg = d3.select("#test").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

    var svg = d3.select(".linechart").append("svg")
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

    //sensorsArray.forEach(function (d) {
    //    d.set("measuredAt", parseDate(d.get("measuredAt")));
    //    d.set("measuredData", d.get("measuredData"));
    //});

    //x.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredAt"); }));
    //y.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredData"); }));

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
        //.datum(sensorsArray)
        .attr("class", "line")
        .attr("d", line(yvalues));
    //this.set('chart', svg);
    //console.log(this.get('chart'));
}

function updateChart() {
    var content = this.get('content');
    var chart = this.get('chart');
    var line = this.get('line');
    var area = this.get('area');

    chart.selectAll('path.line')
        .data(content)
        .transition()
        .duration(500)
        .ease('sin')
        .attr('d', line(content));
    chart.selectAll('path.area')
        .data(content)
        .transition()
        .duration(500)
        .ease('sin')
        .attr('d', area(content));
}

/*OccupOS.IndexView = Ember.ContainerView.extend({
    classNames: ['monitor'],
    childViews: ['BarchartView', 'LinechartView', 'TableView'],
    sensorsBinding: 'controller.sensors',
    sensorsObserver: function() {
        this.rerender();
    }.observes('sensors.isLoaded'),
    didInsertElement: function didInsertElement() {
        console.log("didInsert");
    },
    LinechartView: Ember.View.extend({
        didInsertElement: function didInsertElement() {
            console.log("test");
        }
    })
});*/