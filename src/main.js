document.onkeydown = checkKey;
document.onkeyup = checkKeyUp;
var inTheAir = false;
var droping = false;
var dropTime = 0;
var timeInterval = 10;//0.01s
var velocityY = 0;
var velocityX = 0;
var bottomY = 480;
var leftKeyDown = false;
var rightKeyDown = false;
var obstacleSet = //[x1,x2,y1,y2]//碰到障礙物不要觸發重力
{
  "obstacle1" : [150,350,470,490],
};

function checkKeyUp(e) {
  if(e.keyCode == '37' || e.keyCode =='39')
  {
    // left / right arrow up
    leftKeyDown = false;
    rightKeyDown = false;
  }
}

function checkKey(e) {
    
    e = e || window.event;

    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    //console.log(e.keyCode);

    if (e.keyCode == '38' || e.keyCode == '32') {
        // up arrow
        if(!leftKeyDown&&!rightKeyDown) velocityX = 0;
        oriy = oriy-50;
        d3.select("#jumper").attr("cy",oriy);
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow       
       leftKeyDown = true;
       velocityX = -0.5;
       if(!inTheAir)
        {
         //velocityX = -0.5;
         orix = orix-5;       
         d3.select("#jumper").attr("cx",orix);       
       }       
    }
    else if (e.keyCode == '39') {
       // right arrow
       rightKeyDown = true;
       velocityX = 0.5;
       if(!inTheAir)
       {
         //velocityX = 0.5;
         orix = Number(orix)+5;         
         d3.select("#jumper").attr("cx",orix);
       }
    }
}

function worldGravity()
{
  var gravity = 0.3;
  var distanceX;
  var distanceY;
  //v=gt 初速度=0
  if(droping)
  {
    dropTime = (Number(dropTime)+Number(timeInterval));
  }  
  velocityY = gravity * dropTime/1000;
  distanceY = velocityY*timeInterval;
  var oriy = d3.select("#jumper").attr("cy");
  var orix = d3.select("#jumper").attr("cx");

  if(oriy<bottomY)
  {
    console.log(velocityX);
    inTheAir = true;
    droping = true;
    oriy = Number(oriy) + distanceY;
    if(oriy>bottomY)
    {
      inTheAir = false;
      droping = false;
      dropTime = 0;
      oriy=bottomY;
    } 
    
    distanceX = velocityX;
    orix = Number(orix) + Number(distanceX);
    d3.select("#jumper").attr("cy",oriy);
    d3.select("#jumper").attr("cx",orix);
  }  
}

setInterval(worldGravity, timeInterval);

/*
while(1)
{
  setTimeout(function () {        
            worldGravity();
  }, 100);
}*/