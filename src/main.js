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
var jumpKeyDown = false;
var jumpTimes = 0;
var minYScroll = 300;
var scrollMap = false;
var obstacleSet = //[x1,x2,y1,y2]//碰到障礙物不要觸發重力
{
  "obstacle1" : [150,350,480,500],
  "obstacle2" : [0,150,430,450],
};
var ballBot;
var ballCenter;
var onTheObstacle = false;

function checkKeyUp(e) {
  if(e.keyCode == '37' || e.keyCode =='39')
  {
    // left / right arrow up
    leftKeyDown = false;
    rightKeyDown = false;
  }
  if (e.keyCode == '38' || e.keyCode == '32') 
  {
    //jumpKeyUp
    jumpKeyDown = false;
  }
}

function checkKey(e) {
    
    e = e || window.event;

    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    //console.log(e.keyCode);

    if (e.keyCode == '38' || e.keyCode == '32') {
        // up arrow        
        if(!jumpKeyDown)
        {
          jumpTimes +=1;
          //jumpKeyDown = true;
          if(!leftKeyDown&&!rightKeyDown) velocityX = 0;
          oriy = oriy-50;
          d3.select("#jumper").attr("cy",oriy);
        }        
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow       
       leftKeyDown = true;
       velocityX = -1;
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
       velocityX = 1;
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
  //算球的底端
  onTheObstacle = false;
  ballCenter = d3.select("#jumper").attr("cx");
  ballBot = Number(d3.select("#jumper").attr("r"))+Number(d3.select("#jumper").attr("cy"));
  if(scrollMap)
  {
    minYScroll = Number(minYScroll)-0.1;
    d3.select("#basicSVG").attr("viewBox","0,"+minYScroll+",500,500")
  }
  var gravity = 0.3;
  var hittedObstalceY;
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

  for (var i in obstacleSet)//踩在障礙物上嗎
  {
    if(ballCenter>=obstacleSet[i][0]&&ballCenter<=obstacleSet[i][1])
    {
      if(ballBot<=obstacleSet[i][2])
      {
       onTheObstacle=true;
       hittedObstalceY=obstacleSet[i][2];
       break;
      }
      else
      {
        onTheObstacle =false;
      }
    }
    else
    {
      onTheObstacle =false;
    }
  }
  if(onTheObstacle)
  {
    inTheAir = false;
    droping = false;
    dropTime = 0;
    oriy=hittedObstalceY-10;//依據球的半徑算碰撞
    d3.select("#jumper").attr("cy",oriy);
  }
  else if(oriy<bottomY)//在空中
  {
    inTheAir = true;
    droping = true;
    oriy = Number(oriy) + distanceY;
    if(oriy>bottomY)//撞到地板 重製跳躍狀態
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
  console.log(velocityY,distanceY,dropTime);
}

function init()
{/*cut screen
  d3.select("#basicSVG").attr("viewBox","0,300,500,500")
                        .attr("preserveAspectRatio","xMidYMid slice");*/
  setInterval(worldGravity, timeInterval);//add gravity to world
}
init();