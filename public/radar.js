function init(h,w) {
  $("#itemEditBox").hide();
  $('#title').text(document.title);  
	   
 var radar = new pv.Panel()
      .width(w)
      .height(h)
      .canvas('radar')

// arcs
radar.add(pv.Dot)
       .data(radar_arcs)
       .left(w/2)
       .bottom(h/2)
       .radius(function(d){return d.r;})
       .strokeStyle("#ccc")
       .anchor("top")       
       .add(pv.Label).text(function(d) { return d.name;});

//quadrant lines -- vertical
radar.add(pv.Line)
        .data([(h/2-radar_arcs[radar_arcs.length-1].r),h-(h/2-radar_arcs[radar_arcs.length-1].r)])
        .lineWidth(1)
        .left(w/2)        
        .bottom(function(d) {return d;})       
        .strokeStyle("#bbb");

//quadrant lines -- horizontal 
radar.add(pv.Line)
        .data([(w/2-radar_arcs[radar_arcs.length-1].r),w-(w/2-radar_arcs[radar_arcs.length-1].r)])
        .lineWidth(1)
        .bottom(h/2)
        .left(function(d) {return d;})       
        .strokeStyle("#bbb");


// blips

// Migration
// var index = 1;
// for (var i = 0; i < radar_data.length; i++) {
//   for (var j = 0; j < radar_data[i].items.length; j++) {
//     radar_data[i].items[j].index = index;
//     radar_data[i].items[j].quadrant = radar_data[i].quadrant;
//     index ++;
//     $.post("/item/new", JSON.stringify(radar_data[i].items[j]));
//   }
// }
$.get("/item/all", function(data) {
  var groupedByQuadrant = _.groupBy(data, function(d) { return d.quadrant; });

  // Static Loading
  // var index = 1;
  // for (var i = 0; i < radar_data.length; i++) {
  //   for (var j = 0; j < radar_data[i].items.length; j++) {
  //     radar_data[i].items[j].index = index;
  //     radar_data[i].items[j].quadrant = radar_data[i].quadrant;
  //     index ++;
  //   }
  // }

  // DB Loading
  window.totalCount = 0;
  for (var i = 0; i < radar_data.length; i++) {
    radar_data[i].items = groupedByQuadrant[radar_data[i].quadrant];
    for (var j = 0; j < radar_data[i].items.length; ++ j) {
      window.totalCount ++;
    }
  }

  for (var i = 0; i < radar_data.length; i++) {
      radar.add(pv.Dot)       
      .def("active", false)
      .data(radar_data[i].items)
      .size( function(d) { return ( d.blipSize !== undefined ? d.blipSize : 70 ); })
      .left(function(d) { if (!d.oldX) {
                            var x = polar_to_raster(d.pc.r, d.pc.t)[0];
                            // console.log("name:" + d.name + ", x:" + x); 
                            d.x = x;
                          d.oldX = true;
                            return x;
                        } else {
                          return d.x;
                        }

                        })
      .top(function(d) { 
        if (!d.oldY) {
        var y = polar_to_raster(d.pc.r, d.pc.t)[1];                                 
                            // console.log("name:" + d.name + ", y:" + y); 
                            d.y = h - y;
                            d.oldY = true;
                            return h - y;        
        } else {
          return d.y;
        }
  })
      .title(function(d) { return d.name;})
      .cursor("move")    
      .event("dblclick", function(d) { 
        edit(d);
      }) 
              .event("mousedown", pv.Behavior.drag())
              .event("dragstart", radar)
              .event("dragend", function(d) {
                console.log(d);
                $.post("/item/update", JSON.stringify(d), function(data, status) {
                  console.log(status);
                });
              })
              .event("drag", radar)
      .angle(45)
      .strokeStyle(radar_data[i].color)
      .fillStyle(radar_data[i].color)
      .shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})         
      .anchor("center")
          .add(pv.Label)
          .text(function(d) {return d.index;}) 
          .textBaseline("middle")
          .textStyle("white");            
  }


  //Quadrant Ledgends
  for (var i = 0; i < radar_data.length; i++) {        
      radar.add(pv.Label)         
           .left( radar_data[i].left )         
           .top( radar_data[i].top )  
           .text(  radar_data[i].quadrant )    
           .strokeStyle( radar_data[i].color )
           .fillStyle( radar_data[i].color )                    
           .font("18px sans-serif")
              .add( pv.Dot )            
              .def("i", radar_data[i].top )
              .data(radar_data[i].items)            
              .top( function() { return ( this.i() + 18 + this.index * 18 );} )   
              .shape( function(d) {return (d.movement === 't' ? "triangle" : "circle");})                 
              .cursor( function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })                                                            
              .event("click", function(d) { if ( d.url !== undefined ){window.open(d.url);}}) 
                  .size(10) 
              .angle(45)            
              .anchor("right")                
                  .add(pv.Label)                
                  .text(function(d) {return d.index + ". " + d.name;} );
  }      
         
   radar.anchor('radar');
   radar.render();
});
};
