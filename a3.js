<<<<<<< HEAD
var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var w = 960 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bottom;


d3.csv("stocks.csv", function(error, data) {
  data.forEach(function(d) {
    name = d.name;
    type = d.type;
    price = +d.price;
    tValue = +d.tValue;
    vol = +d.vol;

  });
  drawVis(data);
  showData(data);
});

var col = d3.scale.category10();



var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var line = svg.line()
    .interpolate("basis")
    .attr("cx", function(d) { return x(d.price);  })
    .attr("cy", function(d) { return y(d.tValue);  });


var x = d3.scale.linear()
        .domain([0, 1000])
        .range([0, w]);

var y = d3.scale.linear()
        .domain([0, 1000])
        .range([h, 0]);


var axisScale = d3.scale.linear()
  .domain([0, 100])
  .range([h, 0]);

var xAxis = d3.svg.axis()
  .scale(x).orient("bottom");

svg.append("g").attr("class", "axis")
  .call(xAxis);
  // .attr("transform", "translate(0," + h + ")").tickSize(h)
  // .call(xAxis);



var yAxis = d3.svg.axis()
  .scale(y).orient("left");

svg.append("g").attr("class", "axis")
  .call(yAxis);

  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var w = 960 - margin.left - margin.right;
  var h = 500 - margin.top - margin.bottom;

// svg.append("path")
//   .attr("class", "line")
//   .attr("d", function(d) {
//     return line(+d.tValue);
//   })
//   .style("stroke", function(d) {
//     return color(d.name);
//   });
function drawVis(data) {
  var lines = svg.selectAll("line")
 .data(data)
 .enter()
 .append("path")
    .attr("class", "line")
    .attr("d", function(d) {
      return line(d);
    })
    .style("stroke", function(d) {
      return col(d.type);
    })
    .append("svg:title")
          .text(function(d, i) { 
            return "name: " + d.name + " price: " + d.price + " tvalue: " + d.tValue + " vol: " + d.vol; 
          });
   }

function showData(data, error) {
   svg.selectAll("line")
   .on("mouseover", function(d){

      d3.selectAll(d.name).style("visibility", "visible")
   }); 

}
=======
var margin = {top: 30, right: 80, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var color = d3.scale.category10();


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);
d3.csv("names.csv", function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Year"; }));

    data.forEach(function(d) {
        Year = +d.Year;
        Name = d.Name;
        Gender = d.Gender;
        Count = +d.Count;
        Ranking = +d.Ranking;
    });


    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Count); });


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var names = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                return {Year: [d.Year], Name: d.Name, Gender: d.Gender,
                    Count: +[d.Count], Ranking: +[d.Ranking]};
            })
        };
    });

    x.domain(d3.extent(data, function(d) { return d.Year; }));

    y.domain([
        d3.min(names, function(c) { return d3.min(c.values, function(v) { return v.Count; }); }),
        d3.max(names, function(c) { return d3.max(c.values, function(v) { return v.Count; }); })
    ]);



    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        // x-axis title
        .append("text")
        .attr("x", (width / 2))
        .attr("y", margin.bottom)
        .attr("dx", ".71em")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        // y-axis title
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Count of Names");

    // title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text("Top Popular Names");

    var name = svg.selectAll(".name")
        .data(names)
        .enter().append("g")
        .attr("class", "name");

    name.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .style("stroke", function(d) { return color(d.Name); });

    name.append("text")
        .datum(function(d) { return {name: d.Name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.count) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.Name; });
});
>>>>>>> 5470da16e281d35270ed22b8a4dd03ddf8dd0fdf
