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

d3.select(".domain")
  .attr("fill", "red");

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