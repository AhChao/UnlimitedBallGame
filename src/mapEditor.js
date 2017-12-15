var nowCubeColor = "#0044BB";
var dragStartX="";
var dragStartY="";
var dragEndX;
var dragEndY;
var customMap ={};

function selectCubeColor(id)
{
	nowCubeColor = d3.select("#"+id).attr("fill");
	d3.select("#selectStrokeForCube").attr("x",d3.select("#"+id).attr("x")-10)
									 .attr("y",d3.select("#"+id).attr("y")-10);
}

function backToGame()
{
    var a = document.createElement("a");
    a.href = "./index.html";
    a.click();
}

function drawCubeByClick(evt)
{
	if(document.getElementById("clickCreateModeCheck").checked)
	{
		var viewBox = d3.select("#basicSVG").attr("viewBox").split(",");
		var viewBoxX = viewBox[0];
		var viewBoxY = viewBox[1];
		var e = evt.target;
	    var dim = e.getBoundingClientRect();
	    var x = evt.clientX - dim.left + Number(viewBoxX);
	    var y = evt.clientY - dim.top + Number(viewBoxY);
	    var height = 20;
	    var width = 20;
	    var obsCount = document.getElementById("basicSVG").childElementCount;
	    d3.select("#basicSVG").append("rect").
	    attr({
	      'x':x,
	      'y':y,
	      'height':height,
	      'width':width,
	      'fill':nowCubeColor,
	      'id': "obs"+obsCount,
	      'onclick': "selectCube(this.id)",
	      });
	}	
}
function selectCube(id)
{
	document.getElementById("obsId").innerText=id;
	document.getElementById("obsWidth").value=d3.select("#"+id).attr("width");
	document.getElementById("obsHeight").value=d3.select("#"+id).attr("height");
	document.getElementById("obsX").value=d3.select("#"+id).attr("x");
	document.getElementById("obsY").value=d3.select("#"+id).attr("y");

	var strokeX = d3.select("#"+id).attr("x")-10;
	var strokeY = d3.select("#"+id).attr("y")-10;
	var strokeHeight = Number(d3.select("#"+id).attr("height"))+20;
	var strokeWidth = Number(d3.select("#"+id).attr("width"))+20;
	if(d3.select("#objSelectStroke")[0][0]==null)
	{
		d3.select("#basicSVG").append("rect").
	    attr({
	      'x':strokeX,
	      'y':strokeY,
	      'height':strokeHeight,
	      'width':strokeWidth,
	      'fill':"None",
	      'id': "objSelectStroke",
	      'stroke':"#AA0000",
	      'stroke-width':"5",
	      });
	}
	else
	{
		d3.select("#objSelectStroke").
	    attr({
	      'x':strokeX,
	      'y':strokeY,
	      'height':strokeHeight,
	      'width':strokeWidth,
	      'fill':"None",
	      'id': "objSelectStroke",
	      'stroke':"#AA0000",
	      'stroke-width':"5",
	      });
	}
}
function removeCube()
{
	var id = document.getElementById("obsId").innerText;
	d3.select("#"+id).remove();
	d3.select("#objSelectStroke").remove();
}
function applyCubeData()
{
	var id = document.getElementById("obsId").innerText;
	d3.select("#"+id).attr(
		{
			"width":document.getElementById("obsWidth").value,
			"height":document.getElementById("obsHeight").value,
			"x":document.getElementById("obsX").value,
			"y":document.getElementById("obsY").value,
		});
	selectCube(id);
}
function resetCanvas()
{
	document.getElementById("canvasULX").innerText=0;
    document.getElementById("canvasULY").innerText=0;
	d3.select("#basicSVG").attr("viewBox","0,0,500,500");
    d3.select("#basicSVGBG").attr("x",0).attr("y",0);
}

function saveMap()
{
	var totalSVG = d3.select("#basicSVG").selectAll("rect");
	customMap ={};
	for(var i in totalSVG[0])
	{
		console.log(totalSVG[0][i].id);
		if(id!="basicSVG"&&id!="basicSVGBG")
		{
			var x = d3.select("#"+totalSVG[0][i].id).attr("x");
			var y = d3.select("#"+totalSVG[0][i].id).attr("y");
			var height = d3.select("#"+totalSVG[0][i].id).attr("height");
			var width = d3.select("#"+totalSVG[0][i].id).attr("width");
			var option;
			switch(d3.select("#"+totalSVG[0][i].id).attr("fill")){
				case "#0044BB": option = "noClimb";
				case "#AA0000": option = "goal";
				case "#3A0088": option = "dead";
				case "#F75000": option = "spring";
				case "gray": option = "passable";
				case "black": option = "cantPass";
				case "#33FFDD": option = "ice";
				case "#FFD700": option = "lock";
				case "#005757": option = "tele";
			}
			customMap[totalSVG[0][i].id] = [x,y,width,height,option];
		}		
	}
}

var dragCreate = d3.behavior.drag()  
    .on('dragstart', function() {
    	dragStartX="";
    	dragStartY="";
    })
    .on('drag', function() { 
   	  if(dragStartX==""&&dragStartY=="")
   	  {
   	  	dragStartX=d3.event.x;
   	  	dragStartY=d3.event.y;
   	  }
   	  else
   	  {
   	  	dragEndX=d3.event.x;
     	dragEndY=d3.event.y;
   	  }   	  
    })
    .on('dragend', function() {
      var width = Math.abs(dragEndX-dragStartX);
      var height = Math.abs(dragEndY-dragStartY);
      var dim = document.getElementById("basicSVG").getBoundingClientRect();
      var x = dragStartX<dragEndX? dragStartX:dragEndX;
      x = x- dim.left;
      var y = dragStartY<dragEndY? dragStartY:dragEndY;
      y = y- dim.top;
      var obsCount = document.getElementById("basicSVG").childElementCount;
      if(document.getElementById("paintModeCheck").checked)
      {
      	d3.select("#basicSVG").append("rect").
	      attr({
	      'x':x,
	      'y':y,
	      'height':height,
	      'width':width,
	      'fill':nowCubeColor,
	      'id': "obs"+obsCount,
	      'onclick': "selectCube(this.id)",
	      });
      }
      else if(document.getElementById("dragModeCheck").checked)
      {
      	var movedX = dragEndX- dim.left;
      	var movedY = dragEndY- dim.top;
      	d3.select("#"+document.getElementById("obsId").innerText).
			      attr({
			      'x':movedX,
			      'y':movedY,
			      });
		selectCube(document.getElementById("obsId").innerText);
      }
      else if(!document.getElementById("clickCreateModeCheck").checked)
      {
      	var movedX =0 ;
      	var movedY =0 ;
      	movedX = dragEndX- dim.left;
      	movedY = dragEndY- dim.top;
      	var viewBox = d3.select("#basicSVG").attr("viewBox").split(",");
		var viewBoxX = viewBox[0];
		var viewBoxY = viewBox[1];

      	movedX = Number(viewBoxX) + Number(dragStartX)-dragEndX;
      	movedY = Number(viewBoxY) + Number(dragStartY)-dragEndY;
      	if(isNaN(movedX)) movedX = 0;
      	if(isNaN(movedY)) movedY = 0;
      	document.getElementById("canvasULX").innerText=movedX;
      	document.getElementById("canvasULY").innerText=movedY;
      	d3.select("#basicSVG").attr("viewBox",movedX+","+movedY+",500,500");
      	d3.select("#basicSVGBG").attr("x",movedX).attr("y",movedY);
      }      
    });

d3.select('#basicSVG')
  .call(dragCreate);

