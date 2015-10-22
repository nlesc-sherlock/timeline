// import _ from 'lodash';
// import dc from 'dc';
// import d3 from 'd3';
// import crossfilter from 'crossfilter';
/*global _, dc, d3, crossfilter*/

console.log('\'Allo \'Allo!');

(function() {
  'use strict';

  readCrossfilterData(makePlots);

  function makePlots(data) {
    //var all = data.groupAll();

    // var hourDimension = data.dimension(function(d) {
    //   return d.hour;
    // });

    var monthDimension = data.dimension(function(d) {
      return d.year * 12 + d.month;
    });

    var monthGroup = monthDimension.group();

    var dayDimension = data.dimension(function(d) {
      var dayInWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday',
      ];
      return d.day + '.' + dayInWeek[d.day];
    });

    // var hourGroup =  hourDimension.group().reduce(
    //   /* callback to add data to current filter results */
    //   function(p, v) {
    //     ++p.count;
    //     ++p.perDay[v.day];
    //     return p;
    //   },
    //   /* callback to remove data from current filter results */
    //   function(p, v) {
    //     --p.count;
    //     --p.perDay[v.day];
    //     return p;
    //   },
    //   /* callback to initialize p */
    //   function() {
    //     return {
    //       count:  0,
    //       perDay: zeros(7),
    //     };
    //   }
    // );

    var dayGroup = dayDimension.group();

    var timelineGraph = dc.barChart('#timeline');
    var dayOfWeekGraph = dc.rowChart('#dayofweek');
    var plotWidth = document.getElementById('plot-container').offsetWidth;

    timelineGraph
      .width(plotWidth)
      .height(200)
      .margins({top: 10, right: 50, bottom: 30, left: 40})
      .transitionDuration(1000)
      .dimension(monthDimension)
      .group(monthGroup)
      .x(d3.scale.linear().domain([1999 * 12, 2005 * 12]))
      .y(d3.scale.linear().domain([0, 10]))
      .elasticX(false)
      .elasticY(true)
      .xAxisLabel('time')
      .yAxisLabel('count');

    dayOfWeekGraph
      .width(plotWidth / 2)
      .height(200)
      .transitionDuration(1000)
      .dimension(dayDimension)
      .group(dayGroup)
      .elasticX(true)
      .ordinalColors(['#0072bd', '#d95319', '#edb120', '#7e2f8e', '#77ac30', '#4dbeee']);

    /*    hourChart
          .width(document.getElementById('timeline').offsetWidth)
          .height(200)
          .transitionDuration(1000)
          .dimension(monthDimension)
          .group(monthGroup)
          .x(d3.scale.linear().domain([0, 10]))
          .y(d3.scale.linear().domain([0, 10]))
          .elasticX(true)
          .elasticY(true)
          .xAxisLabel('day')
          .yAxisLabel('count');
    */
    dc.renderAll();
  }

  // function zeros(n) {
  //   return Array.apply(null, new Array(n)).map(Number.prototype.valueOf, 0);
  // }

  function extractTimestamps(data, key, timeFormat) {
    var emailPred = function(item) {
      return _.includes(item._source.exists, key);
    };

    var retrieveTimestamp = function(item) {
      return d3.time.format(timeFormat)
                    .parse(item._source[key]);
    };

    var splitDate = function(date) {
      return {
        date: date,
        day: date.getDay(),
        hour: date.getHours(),
        year: date.getFullYear(),
        month: date.getMonth(),
      };
    };

    // extract timestamps
    var timestamps = _.map(
      _.filter(data.hits.hits, emailPred),
      _.compose(splitDate, retrieveTimestamp));

    return timestamps;
  }

  function readCrossfilterData(f) {
    d3.json('jur.json', function(error, data) {
      if (error) {
        console.log(error);
      }

      f(crossfilter(extractTimestamps(data,
        'email.sentOn', '%Y-%m-%dT%H:%M:%S.%LZ')));
    });
  }
})();
