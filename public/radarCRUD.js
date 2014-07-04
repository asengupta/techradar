var newItem = function() {
	return {"name":"No name", "pc":{"r":0,"t":0},"movement":"t", quadrant: "Architecture"};
};

var cancel = function() {
	$("#itemEditBox").hide();
};

$("#cancelEdit").click(function() {
	cancel();
});

$("#saveItem").click(function() {
	var updatedData = JSON.parse($("#itemEditBox").attr("data-id"));
	console.log("Saving...");
	updatedData.name = $("#itemText").val();
	updatedData.quadrant = $("#itemQuadrant").val();
	updatedData.url = $("#itemLink").val();
	if (!updatedData.index) updatedData.index = ++ window.totalCount;
	console.log(updatedData);
	$.post("/item/update", JSON.stringify(updatedData), function(data, status) {
		console.log(status);
		cancel();
		location.reload();
	});
});

$("#deleteItem").click(function() {
	var itemBeingEdited = JSON.parse($("#itemEditBox").attr("data-id"));
	if (!itemBeingEdited) {
		console.log("Item has not yet been created.");
		cancel();
		return;
	}
	if (!window.confirm("This Radar item will be deleted. OK to Proceed?")) return;
	$.post("/item/delete", JSON.stringify({_id: itemBeingEdited._id}), function(data, status) {
		console.log(status);
		cancel();
		location.reload();
	});
});

$("#newRadarItemLink").click(function() {
	console.log("Click");
	edit();
});

var edit = function(d) {
	$('#itemQuadrant').empty();
	_.each(radar_data, function(quadrant) {   
     $('#itemQuadrant')
         .append($("<option></option>")
         .attr("value",quadrant.quadrant)
         .text(quadrant.quadrant)); 
	});
	$("#itemQuadrant")
	window.scrollTo(0, 0);
	$("#itemEditBox").attr("data-id", d ? JSON.stringify(d) : JSON.stringify(newItem()));
	$("#itemEditBox").show();
	$("#itemID").text(d ? d._id : "New Item");
	$("#itemText").val(d ? d.name : "");
	$("#itemQuadrant").val(d ? d.quadrant : "");
	$("#itemLink").val(d ? d.url : "");
};
