
(function() {
  d3.json('jur.json',

  // callback function
  function(error, data) {
    if (error) {
      console.log(error);
    }

    showGraph(filterData(data, 'email.sentOn', '%Y-%m-%dT%H:%M:%S.%LZ'));
  });

  function filterData(data, key, timeFormat) {
    var emailPred = function(item) {
      return _.includes(item._source.exists, key);
    };

    var retrieveTimestamp = function(item) {
      return d3.time.format(timeFormat)
                    .parse(item._source[key]);
    };

    var splitDate = function(date) {
      return {
        day:  date.getDay(),
        hour: date.getHours(),
      };
    };

    // extract timestamps
    var timestamps = _.map(
      _.filter(data.hits.hits, emailPred),
      _.compose(splitDate, retrieveTimestamp));

    // count number of items in each bin
    var tsCounts = _.mapValues(
      _.groupBy(timestamps,   _.partial(_.get, _, 'day')),
      _.partial(_.countBy, _, _.partial(_.get, _, 'hour')));

    // map the nested objects to a list of lists containing {key, value}-pairs
    var dict2List = function(dict) {
      return _.map(d3.range(0, 24), function(i) {
        return {
          key:   _.parseInt(i) + 'h',
          value: _.get(dict, i.toString(), 0),
        };
      });
    };

    return _.map(_.pairs(tsCounts),
      function(kvpair) {
        var dayInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return [{key: 'Day', value: dayInWeek[kvpair[0]]}].concat(dict2List(kvpair[1]));
      });
  }

function showGraph ( data ) {

  var flatAscending,
  upperLimit,
  examplePunchcard;

  flatAscending = data.map( function(array) {
    var value;
    return array.slice(1).map( function ( sliced ) {
      return parseFloat( sliced.value );
    }).filter(function ( element ) {
      return element > 0;
    });

  }).reduce(function(a, b) {
    return a.concat(b);
  }).sort(function(a, b) {
    return a - b;
  } );

  // we find the upper limit quantile in order
  // to not show upper outliers
  upperLimit = d3.quantile( flatAscending, 0.95 );

  examplePunchcard = new D3punchcard({
    data: data,
    element: '#punchcard',
    upperLimit: upperLimit
  })
  .draw({ width: document.getElementById('punchcard').offsetWidth });
}

})();
