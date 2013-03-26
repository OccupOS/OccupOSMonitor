/// <reference path="../../vendor/ember.js" />
/// <reference path="../App.js" />
/// <reference path="../../_references.js" />

OccupOS.IndexView = Ember.ContainerView.extend({
    classNames: ['monitor'],
    childViews: ['LinechartView', 'TableView','LinecharttwoView'],
    sensorsBinding: 'controller.sensors',
    sensorUpdatesBinding: 'controller.sensorUpdates',
    value: 'test',
    sensorsObserver: function() {
        this.rerender();
        console.log("----------rerender-------------");
    }.observes('sensors.isLoaded'),
    /*sensorUpdatesObserver: function() {
        
    }.observes('sensorUpdates.isLoaded'),*/
    LinechartView: Ember.View.extend({
        templateName: 'linechart',
        //sensorsBinding: 'parentView.sensors',
        didInsertElement: function didInsertElement() {
            if (this.get('parentView.sensors.isLoaded')) {
                console.log('LinechartViewGut');
                //console.log(this.get('sensors'));
                //console.log(this.get('IndexView').get('sensors.isLoaded'));
                drawLineChart(this.get('parentView.sensors'), 1);
            } else {
                console.log('badboy');
            }
        }/*,
        updateChart: function updateChart() {
            console.log('update chart');
        }.observes('sensorUpdates')*/
    }),
    TableView: Ember.View.extend({
        templateName: 'table',
        test: 'testa'
    }),
    LinecharttwoView: Ember.View.extend({
        templateName: 'linechart',
        //sensorsBinding: 'parentView.sensors',
        didInsertElement: function didInsertElement() {
            if (this.get('parentView.sensors.isLoaded')) {
                //console.log('LinechartView');
                //console.log(this.get('sensors'));
                //console.log(this.get('IndexView').get('sensors.isLoaded'));
                drawLineChart(this.get('parentView.sensors'),3);
            }
        }
    })
    /*didInsertElement: function () {
        if (this.get('sensors.isLoaded')) {
            drawLineChart();
        }
    }*/
});

function drawLineChart(sensors,id) {
    console.log('drawlinechart');
    
    var sensorsArrayTmp = sensors.toArray();
    
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