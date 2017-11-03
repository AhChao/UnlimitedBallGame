document.onkeydown = checkKey;

function checkKey(e) {
    
    e = e || window.event;

    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    console.log(orix,oriy);

    if (e.keyCode == '38') {
        // up arrow
        console.log("up");
    }
    else if (e.keyCode == '40') {
        // down arrow
        console.log("down");
    }
    else if (e.keyCode == '37') {
       // left arrow
       console.log("left");
       orix = orix-10;
       d3.select("#jumper").attr("cx",orix);
    }
    else if (e.keyCode == '39') {
       // right arrow
       console.log("right");
       orix = Number(orix)+10;
       d3.select("#jumper").attr("cx",orix);
    }

}

function worldGravity()
{
  var oriy = d3.select("#jumper").attr("cy");
  if(oriy<500)
}