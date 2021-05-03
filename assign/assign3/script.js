const data = [
{ name: "ATL", score: 1.65},
{ name: "TOR", score: 1.45},
{ name: "LAA", score: 1.42},
{ name: "CIN", score: 1.45},
{ name: "ARI", score: 0.97},
{ name: "NYY", score: 1.66},
{ name: "MIN", score: 1.47},
{ name: "SLB", score: 0.89},
{ name: "CLE", score: 0.97},
{ name: "OAK", score: 1.28},
{ name: "SF", score: 1.35},
{ name: "MIL", score: 0.23},
{ name: "COL", score: 0.05},
{ name: "CHC", score: 1.21},
{ name: "TEX", score: 1.03},
{ name: "BOR", score: 1.35},
{ name: "LA", score: 1.90},
{ name: "SEA", score: 1.00},
{ name: "DET", score: 1.07},
{ name: "KC", score: 1.13},
{ name: "PHP", score: 1.37},
{ name: "SD", score: 1.56},
{ name: "TB", score: 1.43},
{ name: "HOU", score: 1.25},
{ name: "BAL", score: 1.28},
{ name: "WSH", score: 1.10},
{ name: "CHI", score: 1.60},
{ name: "MIA", score: 0.98},
{ name: "PIT", score: 0.98},
{ name: "NYM", score: 1.43},
];

const width = 1500;
const height = 450;
const margin = { top: 32, bottom: 32, left: 32, right: 32 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, 2])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", '#132448')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.score, b.score)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.score))
    .attr('title', (d) => d.score)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.score))
    .attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].name))
    .attr("font-size", '20px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
