﻿OccupOS.MonitorView = Ember.View.extend({
    //contentBinding: 'OccupOS.MonitorController',
    chart:          {},
    line:           {},
    area:           {},
    /** Method: updateChart()
    * Listens for changes in the content and updates the line chart
    * dynamically with a fancy animation.
    *
    * Observes:
    *  - content.@each.value
    */
    /*updateChart: function updateChart() {
        var content = this.get('content'),
            chart   = this.get('chart'),
            line    = this.get('line'),
            area    = this.get('area');

        //selects, updates and animates the d3-chart lines
        chart.selectAll('path.line')
            .data(content)
            .transition()
            .duration(500)
            .ease('sin')
            .attr('d', line(content));

                //selects, updates and animates the d3-chart filled area
                chart.selectAll('path.area')
                    .data(content)
                    .transition()
                    .duration(500)
                    .ease('sin')
                    .attr('d', area(content));
            }.observes('content.@each.value'),

            didInsertElement: function didInsertElement() {
                var elementId = this.get('elementId');
                var content = this.get('content');
                console.log("view");
                console.log(content);

                //There is nothing in content (in the Controller I think), Check: http://jsfiddle.net/2UPLp/16/light/

                var margin = { top: 35, right: 35, bottom: 35, left: 35 };
                var w = 500 - margin.right - margin.left;
                var h = 300 - margin.top - margin.top;

                console.log(content.length);

                var x = d3.scale.linear()
                    .range([0, w])
                    .domain([1, content.length]);
                var y = d3.scale.linear()
                    .range([h, 0])
                    .domain([0, 100]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .ticks(10)
                    .tickSize(-h)
                    .tickSubdivide(true);
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .ticks(4)
                    .tickSize(-w)
                    .orient('left');

                // Prepeare Chart Elements:
                var line = d3.svg.line()
                    .interpolate('monotone')
                    .x(function (d) { return x(d.get('timestamp')) })
                    .y(function (d) { return y(d.get('value')) });
                this.set('line', line);

                var area = d3.svg.area()
                    .interpolate('monotone')
                    .x(function (d) { return x(d.get('timestamp')); })
                    .y0(h)
                    .y1(function (d) { return y(d.get('value')); });
                this.set('area', area);

                var chart = d3.select('#' + elementId).append('svg:svg')
                    .attr('id', 'chart')
                    .attr('width', w + margin.left + margin.right)
                    .attr('height', w + margin.top + margin.bottom)
                    .append('svg:g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                // Add Chart Elements to Chart:
                chart.append('svg:g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + h + ')')
                    .call(xAxis);

                chart.append('svg:g')
                    .attr('class', 'y axis')
                    .call(yAxis);

                chart.append('svg:clipPath')
                    .attr('id', 'clip')
                    .append('svg:rect')
                    .attr('width', w)
                    .attr('height', h);

                chart.append('svg:path')
                    .attr('class', 'area')
                    .attr('clip-path', 'url(#clip)')
                    .attr('d', area(content));

                chart.append('svg:path')
                    .attr('class', 'line')
                    .attr('clip-path', 'url(#clip)')
                    .attr('d', line(content));
                this.set('chart', chart);
            }*/
});

//OccupOS.MonitorView = Ember.ContainerView.extend({
//    classNames: ['monitor'],
//    //defines how often and in which order a childView will be displayed
//    childViews: ['BarchartView', 'LinechartView', 'TableView'],
//    contentBinding: 'OccupOS.MonitorController.content',
//    didInsertElement: function didInsertElement() {
//        console.log("bla " + this.get('content'));
//    },
//    BarchartView: Ember.View.extend({
//        templateName: 'barchart'
//    }),
//    LinechartView: Ember.View.extend({
//        templateName: 'linechart',
//        contentBinding: 'OccupOS.MonitorController',
//        chart:        {},
//        line:         {},
//        area:         {},
//        /** Method: updateChart()
//         * Listens for changes in the content and updates the line chart
//         * dynamically with a fancy animation.
//         *
//         * Observes:
//         *  - content.@each.value
//         */
//        updateChart: function updateChart() {
//            var content = this.get('content'),
//                chart   = this.get('chart'),
//                line    = this.get('line'),
//                area    = this.get('area');

//            //selects, updates and animates the d3-chart lines
//            chart.selectAll('path.line')
//                .data(content)
//                .transition()
//                .duration(500)
//                .ease('sin')
//                .attr('d', line(content));
//            //selects, updates and animates the d3-chart filled area
//            chart.selectAll('path.area')
//                .data(content)
//                .transition()
//                .duration(500)
//                .ease('sin')
//                .attr('d', area(content));
//        }.observes('content.@each.value'),
//        didInsertElement: function didInsertElement() {
//            var elementId = this.get('elementId');
//            var content = this.get('content');

//            console.log(content);

//            //There is nothing in content (in the Controller I think), Check: http://jsfiddle.net/2UPLp/16/light/

//            /*var margin = { top: 35, right: 35, bottom: 35, left: 35 };
//            var w = 500 - margin.right - margin.left;
//            var h = 300 - margin.top - margin.top;

//            var x = d3.scale.linear()
//                .range([0, w])
//                .domain([1, content.length]);
//            var y = d3.scale.linear()
//                .range([h, 0])
//                .domain([0, 100]);
//            var xAxis = d3.svg.axis()
//                .scale(x)
//                .ticks(10)
//                .tickSize(-h)
//                .tickSubdivide(true);
//            var yAxis = d3.svg.axis()
//                .scale(y)
//                .ticks(4)
//                .tickSize(-w)
//                .orient('left');

//            // Prepeare Chart Elements:
//            var line = d3.svg.line()
//                .interpolate('monotone')
//                .x(function (d) { return x(d.get('timestamp')) })
//                .y(function (d) { return y(d.get('value')) });
//            this.set('line', line);

//            var area = d3.svg.area()
//                .interpolate('monotone')
//                .x(function (d) { return x(d.get('timestamp')); })
//                .y0(h)
//                .y1(function (d) { return y(d.get('value')); });
//            this.set('area', area);

//            var chart = d3.select('#' + elementId).append('svg:svg')
//                .attr('id', 'chart')
//                .attr('width', w + margin.left + margin.right)
//                .attr('height', w + margin.top + margin.bottom)
//                .append('svg:g')
//                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//            // Add Chart Elements to Chart:
//            chart.append('svg:g')
//                .attr('class', 'x axis')
//                .attr('transform', 'translate(0,' + h + ')')
//                .call(xAxis);

//            chart.append('svg:g')
//                .attr('class', 'y axis')
//                .call(yAxis);

//            chart.append('svg:clipPath')
//                .attr('id', 'clip')
//                .append('svg:rect')
//                .attr('width', w)
//                .attr('height', h);

//            chart.append('svg:path')
//                .attr('class', 'area')
//                .attr('clip-path', 'url(#clip)')
//                .attr('d', area(content));

//            chart.append('svg:path')
//                .attr('class', 'line')
//                .attr('clip-path', 'url(#clip)')
//                .attr('d', line(content));
//            this.set('chart', chart);*/
//        }
//    }),
//    TableView: Ember.View.create({
//        templateName: 'table'
//    })
//});
/*OccupOS.MonitorView = Ember.View.extend({
    didInsertElement: function () {
        //Check out: http://bl.ocks.org/biovisualize/1209499
        var n = 3, // number of layers
    m = 24, // number of samples per layer
    stack = d3.layout.stack(),
    layers = stack(d3.range(n).map(function () { return bumpLayer(m, .1); })),
    yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y; }); }),
    yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y0 + d.y; }); });

        var margin = { top: 0, right: 10, bottom: 20, left: 10 },
            width = 450 - margin.left - margin.right,
            height = 255 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangeRoundBands([0, width], .08);

        var y = d3.scale.linear()
            .domain([0, yStackMax])
            .range([height, 0]);

        var color = d3.scale.linear()
            .domain([0, n - 1])
            .range(["#aad", "#556"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .tickPadding(6)
            .orient("bottom");

        var svg = d3.select("#viz").append("svg")
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

        var layer = svg.selectAll(".layer")
            .data(layers)
          .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) { return color(i); });

        var rect = layer.selectAll("rect")
            .data(function (d) { return d; })
          .enter().append("rect")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", height)
            .attr("width", x.rangeBand())
            .attr("height", 0);

        rect.transition()
            .delay(function (d, i) { return i * 10; })
            .attr("y", function (d) { return y(d.y0 + d.y); })
            .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        d3.selectAll("input").on("change", change);

        var timeout = setTimeout(function () {
            d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
        }, 2000);

        function change() {
            clearTimeout(timeout);
            if (this.value === "grouped") transitionGrouped();
            else transitionStacked();
        }

        function transitionGrouped() {
            y.domain([0, yGroupMax]);

            rect.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr("x", function (d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
                .attr("width", x.rangeBand() / n)
              .transition()
                .attr("y", function (d) { return y(d.y); })
                .attr("height", function (d) { return height - y(d.y); });
        }

        function transitionStacked() {
            y.domain([0, yStackMax]);

            rect.transition()
                .duration(500)
                .delay(function (d, i) { return i * 10; })
                .attr("y", function (d) { return y(d.y0 + d.y); })
                .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
              .transition()
                .attr("x", function (d) { return x(d.x); })
                .attr("width", x.rangeBand());
        }

        // Inspired by Lee Byron's test data generator.
        function bumpLayer(n, o) {

            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < n; i++) {
                    var w = (i / n - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }

            var a = [], i;
            for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
            for (i = 0; i < 5; ++i) bump(a);
            return a.map(function (d, i) { return { x: i, y: Math.max(0, d) }; });
        }

        //--------- Graph 2 ----------------------

        margin = { top: 20, right: 80, bottom: 30, left: 50 },
        width = 500 - margin.left - margin.right,
        height = 280 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%Y%m%d").parse;

        x = d3.time.scale()
            .range([0, width]);

        y = d3.scale.linear()
            .range([height, 0]);

        color = d3.scale.category10();

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.temperature); });

        svg = d3.select("#viz2").append("svg")
            .attr('class', 'graph')
            .attr('height', height + margin.top + margin.bottom)
          .append("svg")
            .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
            .attr("preserveAspectRatio", "none")
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv("/Scripts/data.tsv", function (error, data) {
            color.domain(d3.keys(data[0]).filter(function (key) { return key !== "date"; }));

            data.forEach(function (d) {
                d.date = parseDate(d.date);
            });

            var cities = color.domain().map(function (name) {
                return {
                    name: name,
                    values: data.map(function (d) {
                        return { date: d.date, temperature: +d[name] };
                    })
                };
            });

            x.domain(d3.extent(data, function (d) { return d.date; }));

            y.domain([
              d3.min(cities, function (c) { return d3.min(c.values, function (v) { return v.temperature; }); }),
              d3.max(cities, function (c) { return d3.max(c.values, function (v) { return v.temperature; }); })
            ]);

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
                .text("Temperature (ºC)");

            var city = svg.selectAll(".city")
                .data(cities)
              .enter().append("g")
                .attr("class", "city");

            city.append("path")
                .attr("class", "line")
                .attr("d", function (d) { return line(d.values); })
                .style("stroke", function (d) { return color(d.name); });

            city.append("text")
                .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
                .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .text(function (d) { return d.name; });
        });
    }
});*/