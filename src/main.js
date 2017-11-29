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
var jumpDistance = 55;
var distanceCount = 0;
var horizontalMoving = false;
var horizontalDistance = 10;
var horizontalCount = 0;
var slideOnWall = false;
var cantClimb = false;
//角色參數控制
var ballRespawn = [50,400];
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
var chasing =false;
var gameStartInterval ;
var startTimer = false;
var totalTimeCount = 0;
var bottomY = 480;
var minYScroll = 300;//Y卷軸相關速度
var scrollMap = false;//捲動開關 開了就會捲動
var obstacleSet = //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
{
  "leftfloor":[-10,0,-9999,500,"noClimb"],
  "rightfloor":[500,510,-9999,500,"noClimb"],
  "downfloor":[0,500,500,520],
  //basic Test Stage
  "obstacle1" : [150,350,480,500],//stair
  "obstacle1_2" : [250,350,460,480],//stair2
  "obstacle1_3" : [300,350,440,460],//stair3
  "obstacle2" : [0,150,430,450],//layer2
  "obstacleV3" : [150,170,220,370,"cantPass"],//pink
  "obstacleV4" : [210,230,220,370,"cantPass"],//pink
  "obstacle5" : [0,75,380,400],
  "obstacle51" : [0,75,280,300],
  "obstacle6" : [75,150,330,350],
  "obstacle61" : [75,150,230,250],
  "obstacle7" : [270,470,330,350],//stair
  "obstacle7_2" : [270,370,310,331],//stair2
  "obstacle7_3" : [270,320,290,311],//stair3
};
//按鍵設定
var leftKey = 37;
var rightKey = 39;

function checkKeyUp(e) {//放開按鍵 重製按鍵狀態 主要避免壓著不放連續觸發
  //console.log("UP",e.keyCode);//用來看到底放了什麼    
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
    //console.log(e.keyCode);//用來看到底按了什麼    
    e = e || window.event;
    var orix = d3.select("#jumper").attr("cx");//抓主角的X,Y
    var oriy = d3.select("#jumper").attr("cy");    

    if (e.keyCode == '38' || e.keyCode == '32') {
        // up arrow         
        if(!jumpKeyDown)
        {
          jumpKeyDown =true;//看要不要擋上按著不放避免黏鍵
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
    else if ( e.keyCode == '90')
    {
      restartTimer();
      startTimer = true;
    }
    else if ( e.keyCode == '88')
    {
      startTimer = false;
    }
}

function worldGravity()
{
  if (chasing) chaseScreen();
  if (startTimer) updateTime();
  //dead
  if (d3.select("#jumper").attr("cy")>500+Number(ballRadius))
  {
    dropTime=0;
    Respawn();
  }
  totalTimeCount = Number(totalTimeCount)+Number(timeInterval);
  if(leftKeyDown)
  {
    horizontalMoving = true;
  }
  else if(rightKeyDown)
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

  var result = collisionDetection("#jumper",0,1);
  onTheObstacle=false;
  if(result[0])
  {
    onTheObstacle=true;
    if(result[3]=="dead")
     {
      Respawn();
     }
     if(result[3]=="spring")
    {
      jumping = true;
      jumpTimes = 1;
      dropTime = 0;
    }
  }

  /*
  for (var i in obstacleSet)//踩在障礙物上嗎
  {
    onTheObstacle=false;
    if(ballCenter>=obstacleSet[i][0]&&ballCenter<=obstacleSet[i][1])
    {
      if(Math.abs(ballBot-obstacleSet[i][2])<=1)
      {
       onTheObstacle=true;
       if(obstacleSet[i][4]=="dead")
       {
        Respawn();
       }
       break;
      }
    }
  }*/
  
  if(horizontalMoving)//橫向移動中
  {
    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    var collisionObstacle=[0,0,0,0,0];
    //orix = Number(orix)+Number(velocityX);
    //horizontalCount = Number(horizontalCount)+Math.abs(velocityX);
    var result = collisionDetection("#jumper",velocityX,0);
    if(result[0])//發生碰撞
    {      
      if(droping&&result[3]!="noClimb"&&result[3]!="dead"&&result[3]!="spring")//踢牆跳
      {
        result[1] = result[1] - velocityX*15;
        //orix = orix - velocityX*15;
        droping = false;
        jumpTimes = 0;
        inTheAir = false;
        droping = false;
        dropTime = 0;
        slideOnWall = true;
      }
      else //平常撞到的時候
      {
       if(result[3]=="noClimb")
       {
        cantClimb = true;
        jumping = false;
       }              
       horizontalMoving = false;//撞到要停下移動狀態
       horizontalCount = 0;
       if(result[3]=="dead")
       {
        cantClimb = true;
        jumping = false;
       }          
      }
    }
    d3.select("#jumper").attr("cx",result[1]);
    d3.select("#jumper").attr("cy",result[2]);
    horizontalCount = Number(horizontalCount)+Math.abs(result[1]-orix);
    if(horizontalCount>=horizontalDistance || result[3] =="dead")
    {
      horizontalMoving = false;
      horizontalCount = 0 ;
    }
  }

  if(jumping)//跳躍中
  {
    var oriy = d3.select("#jumper").attr("cy");
    var result = collisionDetection("#jumper",0,upV);
    d3.select("#jumper").attr("cx",result[1]);
    d3.select("#jumper").attr("cy",result[2]);
    distanceCount = Number(distanceCount)+Math.abs(result[2]-oriy);
    if(result[0])//撞到
    {
       jumping = false;//撞到要停下移動狀態
       distanceCount = 0;
    }
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
  else if(slideOnWall)
  {
    var oriy = d3.select("#jumper").attr("cy");
    oriy = Number(oriy) + 0.5;
    d3.select("#jumper").attr("cy",oriy);
    slideOnWall =false;
  }
  else //自由落體
  {
    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    inTheAir = true;
    droping = true;
    var collisionObstacle=[0,0,0,0,0];
    
    var result = collisionDetection("#jumper",0,distanceY);
    if(result[3]=="spring")
    {
      jumping = true;
      jumpTimes = 1;
      dropTime = 0;
    }
    d3.select("#jumper").attr("cx",result[1]);
    d3.select("#jumper").attr("cy",result[2]);
  }
  cantClimb = false;
}

function collisionDetection(character,xDisplacement,yDisplacement)
{  
  var orix = d3.select(character).attr("cx");
  var oriy = d3.select(character).attr("cy");
  var changedX = Number(orix)+xDisplacement;
  var changedY = Number(oriy)+yDisplacement;
  var positionShouldBe = [false,changedX,changedY,""];//collision?,x,y
  var collisionObstacle = [0,0,0,0,""];

  for (var i in obstacleSet)//遍歷所有障礙物
  {
    if(xDisplacement)//判斷左右碰撞
    {
      //先判斷位移前&&位移後上下同高，再判斷左右穿越
      if((Number(oriy)-Number(ballRadius)<obstacleSet[i][3]&&Number(oriy)-Number(ballRadius)>obstacleSet[i][2])||
          (Number(oriy)+Number(ballRadius)<obstacleSet[i][3]&&Number(oriy)+Number(ballRadius)>obstacleSet[i][2])||
          (Number(oriy)<obstacleSet[i][3]&&Number(oriy)>obstacleSet[i][2]))
      {
        if((Number(changedY)-Number(ballRadius)<obstacleSet[i][3]&&Number(changedY)-Number(ballRadius)>obstacleSet[i][2])||
          (Number(changedY)+Number(ballRadius)<obstacleSet[i][3]&&Number(changedY)+Number(ballRadius)>obstacleSet[i][2])||
          (Number(changedY)<obstacleSet[i][3]&&Number(changedY)>obstacleSet[i][2]))
        { //左碰撞:球右緣本來在他左邊 進去後撞到右邊
          if(Number(orix)+Number(ballRadius)<=obstacleSet[i][0]&&Number(changedX)+Number(ballRadius)>=obstacleSet[i][0])
          {            
            collisionObstacle = obstacleSet[i];
            positionShouldBe[0]=true;
            positionShouldBe[1]=obstacleSet[i][0]-ballRadius;
          }
          //右碰撞:球左緣本來在他的右邊 進去後撞到右邊
          else if(Number(orix)-Number(ballRadius)>=obstacleSet[i][1]&&Number(changedX)-Number(ballRadius)<=obstacleSet[i][1])
          {
            collisionObstacle = obstacleSet[i];
            positionShouldBe[0]=true;
            positionShouldBe[1]=obstacleSet[i][1]+ballRadius;
          }
        }
      }
    }
    if(positionShouldBe[0]==true)
    {
      positionShouldBe[3]=collisionObstacle[4];
      break;//已發生碰撞
    } 
    if(yDisplacement)//判斷上下碰撞
    {
      //先判斷位移前&&位移後左右同範圍，再判斷上下穿越
      if((Number(orix)-Number(ballRadius)>obstacleSet[i][0]&&Number(orix)-Number(ballRadius)<obstacleSet[i][1])||
         (Number(orix)+Number(ballRadius)>obstacleSet[i][0]&&Number(orix)+Number(ballRadius)<obstacleSet[i][1])||
         (Number(orix)>obstacleSet[i][0]&&Number(orix)<obstacleSet[i][1]))
      {
        if((Number(changedX)-Number(ballRadius)>obstacleSet[i][0]&&Number(changedX)-Number(ballRadius)<obstacleSet[i][1])||
           (Number(changedX)+Number(ballRadius)>obstacleSet[i][0]&&Number(changedX)+Number(ballRadius)<obstacleSet[i][1])||
           (Number(changedX)>obstacleSet[i][0]&&Number(changedX)<obstacleSet[i][1]))
        { 
          //上碰撞:球下緣本來在他的上邊 進去後撞到上邊          
          if(Number(oriy)+Number(ballRadius)<=obstacleSet[i][2]&&Number(changedY)+Number(ballRadius)>=obstacleSet[i][2]||
             Number(oriy)+Number(ballRadius)<=obstacleSet[i][3]&&Number(changedY)+Number(ballRadius)>=obstacleSet[i][3])
          {            
            collisionObstacle=obstacleSet[i];
            positionShouldBe[0]=true;
            positionShouldBe[2]=obstacleSet[i][2]-ballRadius;
          }
          //下碰撞:球上緣本來在他的下邊 進去後撞到下邊
          else if(((Number(oriy)-Number(ballRadius)>=obstacleSet[i][3]&&Number(changedY)-Number(ballRadius)<=obstacleSet[i][3])||
                  (Number(oriy)-Number(ballRadius)>=obstacleSet[i][2]&&Number(changedY)-Number(ballRadius)<=obstacleSet[i][2]))&&
                  obstacleSet[i][4]!="passable")
          {
           collisionObstacle=obstacleSet[i];
           positionShouldBe[0]=true;
           positionShouldBe[2]=obstacleSet[i][3]+ballRadius;
          }
        }        
      }
    }
    if(positionShouldBe[0]==true)
    {
      positionShouldBe[3]=collisionObstacle[4];
      break;//已發生碰撞
    } 
  }

  if(collisionObstacle[4]=="dead")
  {
    positionShouldBe[1]=ballRespawn[0];
    positionShouldBe[2]=ballRespawn[1];
  }
  else if(collisionObstacle[4]=="goal")
  {
    //在上方才算到達終點
    if(positionShouldBe[2]<collisionObstacle[2]&&
       positionShouldBe[1]>=collisionObstacle[0]&&
       positionShouldBe[1]<=collisionObstacle[1])
    {
      startTimer = false;
    }
  }
  return positionShouldBe;
}

function init()
{/*cut screen
  d3.select("#basicSVG").attr("viewBox","0,300,500,500")
                        .attr("preserveAspectRatio","xMidYMid slice");*/  
  clearInterval(gameStartInterval);
  d3.selectAll("#basicSVG").remove();
  d3.select("#gameBody").append("svg")
  .attr("id","basicSVG")
  .attr("width","500")
  .attr("height","500");
  document.getElementById("stageSelect").blur();
  d3.select("#basicSVG").append("rect")
  .attr("id","basicSVGBG")
  .attr("x","0")
  .attr("y","0")
  .attr("fill","None")
  .attr("stroke","black")
  .attr("stroke-width","5")
  .attr("width","500")
  .attr("height","500");
  d3.select("#basicSVG").append("circle")
  .attr("id","jumper")
  .attr("cx","250")
  .attr("cy","330")
  .attr("r","10")
  .attr("fill","#FCE0CA")
  .attr("stroke","black")
  .attr("stroke-width","2")
  .attr("width","500")
  .attr("height","500");
  var stage = document.getElementById("stageSelect").value;
  obstacleSet = stageSet[stage]["obstacleSet"];
  ballRespawn = stageSet[stage]["respawnPoint"];
  chasing = stageSet[stage]["chasing"];
  document.getElementById("gameTitle").innerText = "Unlimited Ball Game" + " - " + stageSet[stage]["stageName"];
  obstacleBuild();   

  d3.select("#jumper").attr("cx",ballRespawn[0])
                      .attr("cy",ballRespawn[1]);
                      //fortest
  /*d3.select("#jumper").attr("cx",210)
                      .attr("cy",250);*/
  gameStartInterval = setInterval(worldGravity, timeInterval);//add gravity to world 0.01s
}

function getTime()
{  
  return ((totalTimeCount/1000).toFixed(2));//secound
}
function updateTime()
{
  document.getElementById("timerCount").innerText = getTime();
}
function restartTimer()
{
  totalTimeCount = 0;
  updateTime();
}

function Respawn()
{
  d3.select("#jumper").attr("cx",ballRespawn[0])
                      .attr("cy",ballRespawn[1])
                      .attr("fill",document.getElementById("jumperColor").value);
}

function obstacleBuild()
{
  for(var i in obstacleSet)
  {
    height = obstacleSet[i][3]-obstacleSet[i][2];
    width = obstacleSet[i][1]-obstacleSet[i][0];
    x = obstacleSet[i][0];
    y = obstacleSet[i][2];
    if(obstacleSet[i][4]=="noClimb") color="#0044BB";
    else if(obstacleSet[i][4]=="goal") color="#AA0000";
    else if(obstacleSet[i][4]=="dead") color="#3A0088";
    else if(obstacleSet[i][4]=="spring") color="#F75000";
    else if(obstacleSet[i][4]=="passable") color="gray";
    else if(obstacleSet[i][4]=="cantPass") color="black";
    d3.select("#basicSVG").
    append('rect').
    attr({
    'x':x,
    'y':y,
    'height':height,
    'width':width,
    'fill':color,
    });
  }
}
init();

function chaseScreen()
{
  var xMin=0;//d3.select("#jumper").attr("cx")-300;
  var yMin=0;//d3.select("#jumper").attr("cy")-300;
  var width = 500;
  var height = 500;  
  if(d3.select("#jumper").attr("cx")-xMin>=250) xMin=d3.select("#jumper").attr("cx")-xMin-250;
  if(d3.select("#jumper").attr("cy")-yMin>=500) yMin=d3.select("#jumper").attr("cy")-yMin-500;
  d3.select("#basicSVGBG").attr("x",xMin)
                          .attr("y",yMin);
  d3.select("#basicSVG").attr("viewBox",xMin+","+yMin+","+width+","+height)//"0,0,500,500"
                        .attr("preserveAspectRatio","xMidYMid slice");
}