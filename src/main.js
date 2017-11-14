//監聽:按下/放開 按鍵
document.onkeydown = checkKey;
document.onkeyup = checkKeyUp;
//角色狀態控制
var inTheAir = false;
var droping = false;
var onTheObstacle = false;
var dropTime = 0;
var jumpTimes = 0;
var jumping = false;
var jumpDistance = 50;
var distanceCount = 0;
var horizontalMoving = false;
var horizontalDistance = 10;
var horizontalCount = 0;
//角色參數控制
var ballBot;
var ballCenter;
var ballRadius = 10;
var timeInterval = 10;//0.01s
var velocityY = 0;
var velocityX = 0;
var upV = 3;//2.5/0.01s
//按鍵狀態控制
var leftKeyDown = false;
var rightKeyDown = false;
var jumpKeyDown = false;
//全域狀態控制
var bottomY = 480;
var minYScroll = 300;//Y卷軸相關速度
var scrollMap = false;//捲動開關 開了就會捲動
var obstacleSet = //[x1,x2,y1,y2,通行(option)]//碰到障礙物不要觸發重力
{
  "obstacle1" : [150,350,480,500],//stair
  "obstacle1_2" : [250,350,460,480],//stair2
  "obstacle1_3" : [300,350,440,460],//stair3
  "obstacle2" : [0,150,430,450],//layer2
  "obstacle3" : [150,170,220,370,false],//pink
};

function checkKeyUp(e) {//放開按鍵 重製按鍵狀態 主要避免壓著不放連續觸發
  if(e.keyCode == '37' || e.keyCode =='39')//左鍵右鍵放開的時候
  {//判斷
    leftKeyDown = false;
    rightKeyDown = false;
  }
  if (e.keyCode == '38' || e.keyCode == '32') 
  {//跳躍鍵放開
    //jumpKeyUp
    jumpKeyDown = false;
  }
}

function checkKey(e) {//按下按鍵時觸發的
    
    e = e || window.event;
    var orix = d3.select("#jumper").attr("cx");//抓主角的X,Y
    var oriy = d3.select("#jumper").attr("cy");
    //console.log(e.keyCode);//用來看到底按了什麼

    if (e.keyCode == '38' || e.keyCode == '32') {
        // up arrow             
        if(!jumpKeyDown)
        {
          //jumpKeyDown =true;
          if(jumpTimes<2)//跳兩段
          {
            jumpTimes +=1;//算跳躍段數
            //if(!leftKeyDown&&!rightKeyDown) velocityX = 0;
            //oriy = oriy-50;
            jumping = true;
            //d3.select("#jumper").attr("cy",oriy);
          }          
        }        
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow       
       leftKeyDown = true;
       velocityX = -1;
       //if(!inTheAir)
       // {
          horizontalMoving = true;    
       //}       
    }
    else if (e.keyCode == '39') {
       // right arrow
       rightKeyDown = true;
       velocityX = 1;
       //if(!inTheAir)
       //{
        horizontalMoving = true;
       //}
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
  var hittedObstalceY;//撞到的障礙物的Y
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
      if((ballBot-obstacleSet[i][2])<5&&(ballBot-obstacleSet[i][2])>=0)
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
  if(horizontalMoving)//橫向移動中
  {

    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    orix = Number(orix)+Number(velocityX);
    horizontalCount = Number(horizontalCount)+Math.abs(velocityX);
    for (var i in obstacleSet)//撞到障礙物?
    {//上緣在某block的寬度間 或 下緣在某block的寬度間 =>表示同一高度
        if((Number(oriy)-Number(ballRadius)>obstacleSet[i][2]&&Number(oriy)-Number(ballRadius)<obstacleSet[i][3])||
          (Number(oriy)+Number(ballRadius)<obstacleSet[i][3]&&Number(oriy)+Number(ballRadius)>obstacleSet[i][2])||
          (Number(oriy)<obstacleSet[i][3]&&Number(oriy)>obstacleSet[i][2]))
        {//球左緣本來在他的右邊 進去後撞到右邊 或 球右緣本來在他左邊 進去後撞到右邊
          if((Number(orix)-Number(ballRadius)<=obstacleSet[i][1]&&Number(orix)-Number(ballRadius)+Number(velocityX)>=obstacleSet[i][1])||
            (Number(orix)+Number(ballRadius)>=obstacleSet[i][0]&&Number(orix)+Number(ballRadius)-velocityX<=obstacleSet[i][0]))
          {
           orix = orix - velocityX;
           horizontalMoving = false;//撞到要停下移動狀態
           horizontalCount = 0;
           break;
          }
        }
    } 
    d3.select("#jumper").attr("cx",orix);
    if(horizontalCount>=horizontalDistance)
    {
      horizontalMoving = false;
      horizontalCount = 0 ;
    }
  }

  if(jumping)
  {
    var oriy = d3.select("#jumper").attr("cy");
    oriy = Number(oriy)-Number(upV);//向上用扣的
    distanceCount = Number(distanceCount)+Math.abs(upV);
    for (var i in obstacleSet)//撞到障礙物?
    {//中心在某block的左右寬度間 或 中心在某block的左右寬度間 =>表示同一X範圍
      if(obstacleSet[i].length==5)
        if((Number(orix)-Number(ballRadius)>obstacleSet[i][0]&&Number(orix)-Number(ballRadius)<obstacleSet[i][1])||
          (Number(orix)+Number(ballRadius)>obstacleSet[i][0]&&Number(orix)+Number(ballRadius)<obstacleSet[i][1])||
          (Number(orix)>obstacleSet[i][0]&&Number(orix)<obstacleSet[i][1]))
        {//球上緣本來在他的下邊 進去後撞到下邊
          if(Number(oriy)-Number(ballRadius)>=obstacleSet[i][3]&&Number(oriy)-Number(ballRadius)-Number(upV)<=obstacleSet[i][3])
          {
           oriy = obstacleSet[i][3]+ballRadius;
           jumping = false;//撞到要停下移動狀態
           distanceCount = 0;
           break;
          }
        }
    }
    d3.select("#jumper").attr("cy",oriy);
    if(distanceCount>=jumpDistance)
    {
      jumping=false;
      distanceCount=0;
      droping=true;
    }
  }
  else if(onTheObstacle)
  {
    jumpTimes = 0;
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
      jumpTimes = 0;
      inTheAir = false;
      droping = false;
      dropTime = 0;
      oriy=bottomY;
    }

    //distanceX = velocityX;
    //orix = Number(orix) + Number(distanceX);
    d3.select("#jumper").attr("cy",oriy);
    d3.select("#jumper").attr("cx",orix);
  }
  //console.log(onTheObstacle);
  
}

function init()
{/*cut screen
  d3.select("#basicSVG").attr("viewBox","0,300,500,500")
                        .attr("preserveAspectRatio","xMidYMid slice");*/
  setInterval(worldGravity, timeInterval);//add gravity to world
}
init();