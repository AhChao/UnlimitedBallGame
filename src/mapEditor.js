var nowCubeColor = "#0044BB";
var dragStartX="";
var dragStartY="";
var dragEndX;
var dragEndY;

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
		var e = evt.target;
	    var dim = e.getBoundingClientRect();
	    var x = evt.clientX - dim.left;
	    var y = evt.clientY - dim.top;
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

var dragCreate = d3.behavior.drag()  
    .on('dragstart', function() {
    	console.log(d3.select("#basicSVG").attr("viewBox"));
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
      	var movedX = dragEndX- dim.left
      	var movedY = dragEndY- dim.top
      	d3.select("#"+document.getElementById("obsId").innerText).
			      attr({
			      'x':movedX,
			      'y':movedY,
			      });
		selectCube(document.getElementById("obsId").innerText);
      }
      else
      {
      	var movedX =0 ;
      	var movedY =0 ;
      	movedX = dragEndX- dim.left;
      	movedY = dragEndY- dim.top;
      	document.getElementById("canvasULX").innerText=movedX;
      	document.getElementById("canvasULY").innerText=movedY;
      	d3.select("#basicSVG").attr("viewBox",movedX+","+movedY+",500,500");
      	d3.select("#basicSVGBG").attr("x",movedX).attr("y",movedY);
      }      
    });

d3.select('#basicSVG')
  .call(dragCreate);

