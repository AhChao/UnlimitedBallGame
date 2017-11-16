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
var velocityY = 0;//拿去算自由落體了
var velocityX = 0;
var upV = -3;//2.5/0.01s 這個其實就是真正的Vy 負號向上
//按鍵狀態控制
var jumpKeyDown = false;
var leftKeyDown = false;//用於判斷左右鍵押著不放的情況
var rightKeyDown = false;
//全域狀態控制
var bottomY = 480;
var minYScroll = 300;//Y卷軸相關速度
var scrollMap = false;//捲動開關 開了就會捲動
var obstacleSet = //[x1,x2,y1,y2,通行(option)]//碰到障礙物不要觸發重力
{
  "floor":[0,500,500,520],
  "obstacle1" : [150,350,480,500],//stair
  "obstacle1_2" : [250,350,460,480],//stair2
  "obstacle1_3" : [300,350,440,460],//stair3
  "obstacle2" : [0,150,430,450],//layer2
  "obstacle3" : [150,170,220,370,false],//pink
};
//按鍵設定
var leftKey = 37;
var rightKey = 39;

function checkKeyUp(e) {//放開按鍵 重製按鍵狀態 主要避免壓著不放連續觸發
  if (e.keyCode == '38' || e.keyCode == '32') 
  {//跳躍鍵放開
    //jumpKeyUp
    jumpKeyDown = false;
  }
  else if (e.keyCode == leftKey ) 
  {
    leftKeyDown = false;
  }
  else if ( e.keyCode == rightKey )
  {
    rightKeyDown = false;
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
          //jumpKeyDown =true;//看要不要擋上按著不放避免黏鍵
          if(jumpTimes<2)//跳兩段
          {
            jumpTimes +=1;//算跳躍段數
            jumping = true;
          }          
        }        
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == leftKey) {
       // left arrow
       leftKeyDown = true;
       velocityX = -1;
       //if(!inTheAir) //在空中不能左右移動
       // {
          horizontalMoving = true;    
       //}       
    }
    else if (e.keyCode == rightKey) {
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
  if(leftKeyDown||rightKeyDown)
  {
    horizontalMoving = true;
  }
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
  var distanceX;
  var distanceY;
  //v=gt 初速度=0  
  if(droping)
  {
    dropTime = (Number(dropTime)+Number(timeInterval));
  }  
  velocityY = gravity * dropTime/1000;
  distanceY = velocityY*timeInterval;
  
  for (var i in obstacleSet)//踩在障礙物上嗎
  {
    onTheObstacle=false;
    if(ballCenter>=obstacleSet[i][0]&&ballCenter<=obstacleSet[i][1])
    {
      if(Math.abs(ballBot-obstacleSet[i][2])<=1)
      {
       onTheObstacle=true;
       break;
      }
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
        if((Number(oriy)-Number(ballRadius)<obstacleSet[i][3]&&Number(oriy)-Number(ballRadius)>obstacleSet[i][2])||
          (Number(oriy)+Number(ballRadius)<obstacleSet[i][3]&&Number(oriy)+Number(ballRadius)>obstacleSet[i][2])||
          (Number(oriy)<obstacleSet[i][3]&&Number(oriy)>obstacleSet[i][2]))
        {//球左緣本來在他的右邊 進去後撞到右邊 或 球右緣本來在他左邊 進去後撞到右邊
          if((Number(orix)-Number(ballRadius)>=obstacleSet[i][1]&&Number(orix)-Number(ballRadius)+Number(velocityX)<=obstacleSet[i][1])||
            (Number(orix)+Number(ballRadius)<=obstacleSet[i][0]&&Number(orix)+Number(ballRadius)+Number(velocityX)>=obstacleSet[i][0]))
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

  if(jumping)//跳躍中
  {
    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    oriy = Number(oriy)+Number(upV);
    distanceCount = Number(distanceCount)+Math.abs(upV);
    for (var i in obstacleSet)//撞到障礙物?
    {//中心在某block的左右寬度間 或 中心在某block的左右寬度間 =>表示同一X範圍
      if(obstacleSet[i].length==5)
        if((Number(orix)-Number(ballRadius)>obstacleSet[i][0]&&Number(orix)-Number(ballRadius)<obstacleSet[i][1])||
          (Number(orix)+Number(ballRadius)>obstacleSet[i][0]&&Number(orix)+Number(ballRadius)<obstacleSet[i][1])||
          (Number(orix)>obstacleSet[i][0]&&Number(orix)<obstacleSet[i][1]))
        {//球上緣本來在他的下邊 進去後撞到下邊
          if(Number(oriy)-Number(ballRadius)>=obstacleSet[i][3]&&Number(oriy)-Number(ballRadius)+Number(upV)<=obstacleSet[i][3])
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
  else if(onTheObstacle)//障礙物上
  {
    jumpTimes = 0;
    inTheAir = false;
    droping = false;
    dropTime = 0;
  }  
  else //自由落體
  {
    var oriy = d3.select("#jumper").attr("cy");
    var orix = d3.select("#jumper").attr("cx");
    inTheAir = true;
    droping = true;
    oriy = Number(oriy) + distanceY;
    
    for (var i in obstacleSet)//踩在障礙物上嗎
    {
      if(ballCenter>=obstacleSet[i][0]&&ballCenter<=obstacleSet[i][1])
      {
        //加了距離後跑進障礙物中
        if((Number(oriy)+Number(ballRadius)+Number(distanceY)>=obstacleSet[i][2])&&
        (Number(oriy)+Number(ballRadius)+Number(distanceY)<=obstacleSet[i][3]))
        {
         oriy = obstacleSet[i][2]-ballRadius;//中心歸位到障礙物上緣-球半徑
         break;
        }
      }
    }
    if(oriy>bottomY)//撞到地板 重製跳躍狀態
    {
      jumpTimes = 0;
      inTheAir = false;
      droping = false;
      dropTime = 0;
      oriy=bottomY;
    }
    d3.select("#jumper").attr("cy",oriy);
  }
}

function init()
{/*cut screen
  d3.select("#basicSVG").attr("viewBox","0,300,500,500")
                        .attr("preserveAspectRatio","xMidYMid slice");*/
  setInterval(worldGravity, timeInterval);//add gravity to world 0.01s
}
init();