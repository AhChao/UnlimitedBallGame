var nowCubeColor = "#0044BB";
var dragStartX="";
var dragStartY="";
var dragEndX;
var dragEndY;
var customMap ={};
var innerObstacleSet;
var oldMapData;

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

function simRespawnPoint()
{
	d3.select("#jumper").attr("cx",document.getElementById("respawnXText").value)
						.attr("cy",document.getElementById("respawnYText").value);
}

function saveMap()
{
	var totalSVG = d3.select("#basicSVG").selectAll("rect");
	var obsSet = customMap["obstacleSet"];
	obsSet ={};
	customMap ={};
	customMap["stageName"] = document.getElementById("mapNameText").value;
	customMap["respawnPoint"] = [document.getElementById("respawnXText").value,document.getElementById("respawnYText").value];
	customMap["obstacleSet"] = {};
	for(var i in totalSVG[0])
	{
		if(totalSVG[0][i].id!="basicSVG"&&totalSVG[0][i].id!="basicSVGBG"&&totalSVG[0][i].id!="objSelectStroke")
		{
			var x = d3.select("#"+totalSVG[0][i].id).attr("x");
			var y = d3.select("#"+totalSVG[0][i].id).attr("y");
			var height = d3.select("#"+totalSVG[0][i].id).attr("height");
			var width = d3.select("#"+totalSVG[0][i].id).attr("width");
			var option;
			switch(d3.select("#"+totalSVG[0][i].id).attr("fill")){
				case "#0044BB":
					option = "noClimb";
					break;
				case "#AA0000":
					option = "goal";
					break;
				case "#3A0088":
					option = "dead";
					break;
				case "#F75000":
					option = "spring";
					break;
				case "gray":
					option = "passable";
					break;
				case "black":
					option = "cantPass";
					break;
				case "#33FFDD":
					option = "ice";
					break;
				case "#FFD700":
					option = "lock";
					break;
				case "#005757":
					option = "tele";
					break;
			}
			var objId = totalSVG[0][i].id;
			customMap["obstacleSet"][objId]=[Number(x),Number(x)+Number(width),Number(y),Number(y)+Number(height),option];
			//obsSet[totalSVG[0][i].id] = [x,y,width,height,option];
		}		
	}
	

	var jsonFinData = JSON.stringify(customMap);
	var name = document.getElementById("mapNameText").value+".txt";
	var type = "text/plain"
    var a = document.createElement("a");
    var file = new Blob([jsonFinData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

var loadMap = function(event) 
{
    document.activeElement.blur();
    var input = event.target;
    var reader = new FileReader();
    
    reader.onload = function(){
        var text = reader.result;
        oldMapData = JSON.parse(text);
        innerObstacleSet = oldMapData["obstacleSet"];
        objRebuild();
    };
    reader.readAsText(input.files[0]);  
};

function objRebuild()
{
	d3.select("#basicSVG").remove();
    d3.select("#divForBasicSVG").append("svg")
	.attr("id","basicSVG")
	.attr("width","500")
	.attr("height","500");
	d3.select("#basicSVG").append("rect")
	.attr("id","basicSVGBG")
	.attr("x","0")
	.attr("y","0")
	.attr("fill","None")
	.attr("stroke","black")
	.attr("stroke-width","5")
	.attr("width","500")
	.attr("height","500")
	.attr("onclick","drawCubeByClick(evt)");
	d3.select("#basicSVG").append("circle")
	  .attr("id","jumper")
	  .attr("cx",oldMapData["respawnPoint"][0])
	  .attr("cy",oldMapData["respawnPoint"][1])
	  .attr("r","10")
	  .attr("fill","#FCE0CA")
	  .attr("stroke","black")
	  .attr("stroke-width","2");
	d3.select('#basicSVG')
    .call(dragCreate);

    for(var i in innerObstacleSet)
	{
	    var height = innerObstacleSet[i][3]-innerObstacleSet[i][2];
	    var width = innerObstacleSet[i][1]-innerObstacleSet[i][0];
	    var x = innerObstacleSet[i][0];
	    var y = innerObstacleSet[i][2];
	    var obstacleID = i;
	    var color;

	    if(innerObstacleSet[i][4]=="noClimb") color="#0044BB";
	    else if(innerObstacleSet[i][4]=="goal") color="#AA0000";
	    else if(innerObstacleSet[i][4]=="dead") color="#3A0088";
	    else if(innerObstacleSet[i][4]=="spring") color="#F75000";
	    else if(innerObstacleSet[i][4]=="passable") color="gray";
	    else if(innerObstacleSet[i][4]=="cantPass") color="black";
	    else if(innerObstacleSet[i][4]=="ice") color="#33FFDD";
	    else if(innerObstacleSet[i][4]=="lock") color="#FFD700";
	    else if(innerObstacleSet[i][4]=="tele") color="#005757";
	    
	    d3.select("#basicSVG").
	      append('rect').
	      attr({
	      'x':x,
	      'y':y,
	      'height':height,
	      'width':width,
	      'fill':color,
	      'id': i,
	      'onclick': "selectCube(this.id)",
	      });
	}
	document.getElementById("respawnXText").value = oldMapData["respawnPoint"][0];
	document.getElementById("respawnYText").value = oldMapData["respawnPoint"][1];
	document.getElementById("mapNameText").value = oldMapData["stageName"];
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
      else if(document.getElementById("dragCanvasCheck").checked)
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

