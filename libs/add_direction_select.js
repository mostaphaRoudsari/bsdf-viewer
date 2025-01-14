function add_directions_dropdown(directions) {
    
  var select = d3.select("#direction")
    .text("Pick wavelength and direction: ")
    .append("select")
  
  // add options based on directions
  select.selectAll("option")
      .data(directions)
      .enter()
      .append("option")
      .attr("value", function(d, i){ return i; })
      .text(function(d) { return d;});
    
  	// add change event to update the values and colors
    select.on("change", function(d) {    
      selectedDirection = parseInt(d3.select(this).property("value"));
      update_graph_direction();
     });

	d3.selectAll("select option")
  	.filter(function(d, i){return i == selectedDirection;})
  		.attr("selected", "true");

  update_graph_direction();
}

function update_graph_direction(){
  d3.selectAll(".patch")
    .attr("fill", function(d) {
    	d.value = d.values[selectedDirection][selectedPatch - 1];
      return color(d.value);}
  );
  // TODO: This should most likely be updated!
  d3.selectAll(".patchtitle").text(function(d) { return d.value; });
  d3.selectAll("text.patch_id").text(function(d) { return d.id; });
  
  updateCPText();
}
