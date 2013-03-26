/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />
/// <reference path="../../_references.js" />

OccupOS.IndexView = Ember.ContainerView.extend({
    classNames: ['monitor'],
    //layoutName: 'rowwrapper',
    childViews: ['LinechartView'/*, 'TableView'*/,'LinecharttwoView'],
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
            //    this.set('sensorsArray', this.get('sensors').toArray());
            //   this.get('sensorsArray').shift();
            //    this.set('sensors', this.get('sensorsArray'));
            //var tmpArray = this.get('sensorsArray');
            //var tmpFrst = tmpArray.shift();
            //tmpArray.push(tmpFrst);
            //tmp.shift();
            // tmp.push()
           // this.set('sensorsArray', tmpArray);
            //this.set('sensors', tmp);
            //	alert(tmp.length);
            this.get('childViews').objectAt(0).updateChart();
            //this.get('childViews').objectAt(2).updateChart();
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
                //console.log()
                console.log('0');
                var graph = d3.select(".linechart").append("svg:svg").attr("width", "100%").attr("height", "100%");
                //var margin = { top: 20, right: 20, bottom: 30, left: 50 },
                //    width = 960 - margin.left - margin.right,
                //    height = 500 - margin.top - margin.bottom;
                //var parseDate = d3.time.format.iso.parse;

                var sensors = this.get('parentView.sensors').toArray();
                console.log('1');
                //var ydata = [],
                //    xdata = [];
                //console.log('foreach:');
                //sensors.forEach(function (d) {
                //    ydata.push(parseInt(d.get('measuredData'), 10));
                //    xdata.push(parseDate(d.get('measuredAt')));
                //});
                //console.log(ydata);
                //console.log(xdata);
                // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
                var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9];
                this.set('data', data);

                

                //var x = d3.time.scale.utc()
                //  .range([0, width]);

                //var y = d3.scale.linear()
                //    .range([height, 0]);

                
                // X scale will fit values from 0-10 within pixels 0-100
                var x = d3.scale.linear().domain([0, 48]).range([0, 300]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition

                // Y scale will fit values from 0-10 within pixels 0-100
                var y = d3.scale.linear().domain([0, 10]).range([0, 30]);

                //var xAxis = d3.svg.axis()
                //    .scale(x)
                 //   .orient("bottom");

                //var yAxis = d3.svg.axis()
                //    .scale(y)
                //    .orient("left");

                //var line = d3.svg.line()
                //    .x(function (d, i) { return x(i); })
                //    .y(function (d) { return y(d); })
                //    .interpolate("basis");
                

                // create a line object that represents the SVN line we're creating
                var line = d3.svg.line()
                    // assign the X function to plot our line as we wish
                    .x(function (d, i) {
                        // verbose logging to show what's actually being done
                        //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
                        // return the X coordinate where we want to plot this datapoint
                        return x(i);
                    })
                    .y(function (d) {
                        // verbose logging to show what's actually being done
                        //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
                        // return the Y coordinate where we want to plot this datapoint
                        return y(d);
                    }).interpolate("basis");
                //this.set('line', line);

                /*var lineGraph = d3.select(".linechart").append("svg")
                                    .attr('class', 'graph')
                                    .attr('height', height + margin.top + margin.bottom)
                                  .append("svg")
                                    //.attr("width", width + margin.left + margin.right)
                                    //.attr("height", height + margin.top + margin.bottom)
                                    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                                    //.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                                    .attr("preserveAspectRatio", "none")
                                  .append("g")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

                /*sensorsArray.forEach(function (d) {
                    d.set("measuredAt", parseDate(d.get("measuredAt")));
                    d.set("measuredData", d.get("measuredData"));
                });*/

                //x.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredAt"); }));
                //y.domain(d3.extent(sensorsArray, function (d) { return d.get("measuredData"); }));
                //console.log("check that out:");
                //console.log(x.domain(d3.extent(xdata)));
                //x.domain(d3.extent(xdata));
                //y.domain(d3.extent(ydata));

                /*lineGraph.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                lineGraph.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                  .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Price ($)");

                lineGraph.append("path")
                    .datum(sensors)
                    .attr("class", "line")
                    .attr("d", line(xdata));*/

                this.set('lineNew', line);
                this.set('x', x);
                this.set('y', y);
                // display the line by appending an svg:path element with the data line we created above
                graph.append("svg:path").attr("d", line(data));
                this.set('graph', graph);
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
            /*      console.log('update chart');
                  var content = this.get('parentView.sensors');
               //   var chart = this.get('chart');
                  var line = this.get('line');
                  //var area = this.get('area');
                  alert(line);
                  chart.selectAll('path.line')
                      .data(content)
                      .transition()
                      .duration(500)
                      .ease('sin')
                      .attr('d', line(content));*/
            /*
            console.log('-----Updating Chart-------');
            //var content = this.get('parentView.sensorUpdates').toArray();
            var content = this.get('parentView.sensorsArray');
            console.log(content[0].get('measuredAt'));
            var chart = this.get('chart');
            var line = this.get('line');
            var testdata = (chart.selectAll("path").data());
            var v = testdata.shift(); // remove the first element of the array
            testdata.push(v); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
            //var area = this.get('area');
            console.log('printing data');
            console.log(chart.selectAll("path").data());
            chart.selectAll("path")
                    .data(testdata) // set the new data
                    .attr("transform", "translate(6)") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
                    .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
                    .transition() // start a transition to bring the new value into view
                    .ease("sin")
                    .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                    .attr("transform", "translate(" + 6 + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value
                    
            /* thanks to 'barrym' for examples of transform: https://gist.github.com/1137131 */
            console.log('Shift diagram!!!!');
            console.log(this.get('data'));
            var v = this.get('data').shift(); // remove the first element of the array
            this.get('data').push(v)
            //this.set('data', this.get('data').push(v)); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
            console.log(this.get('data'));
            console.log(this.get('x'));
            console.log(this.get('x')(1));
            graph.selectAll("path")
                    .data([this.get('data')]) // set the new data
                    .attr("transform", "translate(" + this.get('x')(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
                    .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
                    .transition() // start a transition to bring the new value into view
                    .ease("sin")
                    .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                    .attr("transform", "translate(" + this.get('x')(0) + ")"); // 
          //  this.set('graph', graph);
        }

        /* chart.selectAll('path.line')
             .data(content)
             .transition()
             .duration(500)
             .ease('sin')
             .attr('d', line(content));*/
        //chart.selectAll('path.area')
        //    .data(content)
        //    .transition()
        //    .duration(500)
        //    .ease('sin')
        //    .attr('d', area(content));

    }
    ),
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
                console.log('drawlinechart');
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
            console.log('Shift diagram!!!!');
            console.log(this.get('data'));
            var v = this.get('data').shift(); // remove the first element of the array
            this.get('data').push(v)
            //this.set('data', this.get('data').push(v)); // add a new element to the array (we're just taking the number we just shifted off the front and appending to the end)
            console.log(this.get('data'));
            console.log(this.get('x'));
            console.log(this.get('x')(1));
            console.log(this.get('x')(0));
            console.log(this.get('line'));
            graph.selectAll("path")
                    .data([this.get('data')]) // set the new data
                    .attr("transform", "translate(" + this.get('x')(1) + ")") // set the transform to the right by x(1) pixels (6 for the scale we've set) to hide the new value
                    .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
                    .transition() // start a transition to bring the new value into view
                    .ease("sin")
                    .duration(500) // for this demo we want a continual slide so set this to the same as the setInterval amount below
                    .attr("transform", "translate(" + this.get('x')(0) + ")"); //
            /*console.log('update chart');
            var content = this.get('parentView.sensors');
          //  var chart = this.get('chart');
            var line = this.get('line');
              var area = this.get('area');
            alert(area);
            chart.selectAll('path.line')
                .data(content)
                .transition()
                .duration(500)
                .ease('sin')
                .attr('d', line(content));*/
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