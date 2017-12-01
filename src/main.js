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
var ballRadius = 10;
var timeInterval = 10;//0.01s
var velocityY = 0;//拿去算自由落體了
var velocityX = 0;
var upV = -3;//2.5/0.01s 這個其實就是真正的Vy 負號向上
var touchTolerance = 3; // up
//按鍵狀態控制
var jumpKeyDown = false;
var leftKeyDown = false;//用於判斷左右鍵押著不放的情況
var rightKeyDown = false;
//全域狀態控制
var intervalList = [];
var stageClear =false ;
var chasing =false;
var gameStartInterval ;
var movingInterval = null;
var timerOpen = 0;//0=off 1=all 2=pass
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
var oriObstacleSet;
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
        if(timerOpen>0&&!startTimer) startTimer = true;
        // up arrow         
        if(!jumpKeyDown)
        {
          jumpKeyDown =true;//看要不要擋上按著不放避免黏鍵
          if(jumpTimes<2)//跳兩段
          {
            distanceCount = 0;
            jumpTimes +=1;//算跳躍段數
            jumping = true;
          }          
        }        
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == leftKey) {
       if(timerOpen>0&&!startTimer) startTimer = true;
       // left arrow
       leftKeyDown = true;
       velocityX = -1;
       horizontalMoving = true;          
    }
    else if (e.keyCode == rightKey) {
       if(timerOpen>0&&!startTimer) startTimer = true;
       // right arrow
       rightKeyDown = true;
       velocityX = 1;
       horizontalMoving = true;
    }
    else if ( e.keyCode == '90')//z
    {
      restartTimer();      
    }
    else if ( e.keyCode == '88')//x
    {
      timerOpen = timerOpen+1;
      if( timerOpen == 3 ) timerOpen=0;
      if( timerOpen == 0 )
      {
        document.getElementById("timerStatusText").innerText = "Timer【OFF】:  ";
        totalTimeCount = 0;
        startTimer = false;
      }
      else if( timerOpen == 1 )
      {
        restartTimer();
        document.getElementById("timerStatusText").innerText = "Timer【ON/TotalMode】:  ";
      } 
      else if( timerOpen == 2 )
      {
        restartTimer();
        document.getElementById("timerStatusText").innerText = "Timer【ON/PassMode】:  ";
      }
    }
}

function worldGravity()
{  
  if (chasing) chaseScreen();
  if (startTimer) updateTime();
  if (timerOpen>0) totalTimeCount = Number(totalTimeCount)+Number(timeInterval);
  //dead
  if (d3.select("#jumper").attr("cy")>500+Number(ballRadius))//摔落下方邊界
  {
    dropTime=0;
    jumpTimes = 2;
    Respawn();
  }  
  if(leftKeyDown)
  {
    horizontalMoving = true;
  }
  else if(rightKeyDown)
  {
    horizontalMoving = true;
  }

  onTheObstacle = false;
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
        //result[1] = result[1] - velocityX*15;
        var reflectResult = collisionDetection("#jumper",-velocityX*15,0);
        result[1] = reflectResult[1];
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
        Respawn();
        cantClimb = true;
        jumping = false;
       }          
      }
    }
    if(result[3]!="dead")
    {
      d3.select("#jumper").attr("cx",result[1]);
      d3.select("#jumper").attr("cy",result[2]);
    }
    else
    {
      Respawn();
    }    
    horizontalCount = Number(horizontalCount)+Math.abs(result[1]-orix);
    if(horizontalCount>=horizontalDistance || result[3] =="dead")
    {
      horizontalMoving = false;
      horizontalCount = 0 ;
    }
  }

  var result = collisionDetection("#jumper",0,touchTolerance);//測是否站在障礙物上方
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

  if(jumping)//跳躍中
  {
    var oriy = d3.select("#jumper").attr("cy");
    var result = collisionDetection("#jumper",0,upV);
    d3.select("#jumper").attr("cx",result[1]);
    d3.select("#jumper").attr("cy",result[2]);
    distanceCount = Number(distanceCount)+Math.abs(result[2]-oriy);
    if(result[0]&&result[4]=="bot")//撞到
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
    /*if(result[3]=="spring")
    {
      console.log("7pupu");
      jumping = true;
      jumpTimes = 1;
      dropTime = 0;
    }*/
    d3.select("#jumper").attr("cx",result[1]);
    d3.select("#jumper").attr("cy",result[2]);
  }
  cantClimb = false;
}

function objectCollision(character,xDisplacement,yDisplacement,theObject)
{
  var orix = d3.select(character).attr("cx");
  var oriy = d3.select(character).attr("cy");
  var changedX = Number(orix)+xDisplacement;
  var changedY = Number(oriy)+yDisplacement;
  var positionShouldBe = [false,changedX,changedY,""];//collision?,x,y,屬性,障礙物被撞到的方向
  var collisionObstacle = [0,0,0,0,""];
  if(xDisplacement)//判斷左右碰撞
  {
    //先判斷位移前&&位移後上下同高，再判斷左右穿越
    if((Number(oriy)-Number(ballRadius)<theObject[3]&&Number(oriy)-Number(ballRadius)>theObject[2])||
        (Number(oriy)+Number(ballRadius)<theObject[3]&&Number(oriy)+Number(ballRadius)>theObject[2])||
        (Number(oriy)<theObject[3]&&Number(oriy)>theObject[2]))
    {
      if((Number(changedY)-Number(ballRadius)<theObject[3]&&Number(changedY)-Number(ballRadius)>theObject[2])||
        (Number(changedY)+Number(ballRadius)<theObject[3]&&Number(changedY)+Number(ballRadius)>theObject[2])||
        (Number(changedY)<theObject[3]&&Number(changedY)>theObject[2]))
      { //左碰撞:球右緣本來在他左邊 進去後撞到右邊
        if(Number(orix)+Number(ballRadius)<=theObject[0]&&Number(changedX)+Number(ballRadius)>=theObject[0])
        {            
          collisionObstacle = theObject;
          positionShouldBe[0]=true;
          positionShouldBe[1]=theObject[0]-ballRadius;
          positionShouldBe[4]="left";
        }
        //右碰撞:球左緣本來在他的右邊 進去後撞到右邊
        else if(Number(orix)-Number(ballRadius)>=theObject[1]&&Number(changedX)-Number(ballRadius)<=theObject[1])
        {
          collisionObstacle = theObject;
          positionShouldBe[0]=true;
          positionShouldBe[1]=theObject[1]+ballRadius;
          positionShouldBe[4]="right";
        }
      }
    }
  }
  if(positionShouldBe[0]==true)
  {
    positionShouldBe[3]=collisionObstacle[4];
  } 
  if(yDisplacement)//判斷上下碰撞
  {
    //先判斷位移前&&位移後左右同範圍，再判斷上下穿越
    if((Number(orix)-Number(ballRadius)>theObject[0]&&Number(orix)-Number(ballRadius)<theObject[1])||
       (Number(orix)+Number(ballRadius)>theObject[0]&&Number(orix)+Number(ballRadius)<theObject[1])||
       (Number(orix)>theObject[0]&&Number(orix)<theObject[1]))
    {
      if((Number(changedX)-Number(ballRadius)>theObject[0]&&Number(changedX)-Number(ballRadius)<theObject[1])||
         (Number(changedX)+Number(ballRadius)>theObject[0]&&Number(changedX)+Number(ballRadius)<theObject[1])||
         (Number(changedX)>theObject[0]&&Number(changedX)<theObject[1]))
      { 
        //上碰撞:球下緣本來在他的上邊 進去後撞到上邊          
        if(Number(oriy)+Number(ballRadius)<=theObject[2]&&Number(changedY)+Number(ballRadius)>=theObject[2]||
           Number(oriy)+Number(ballRadius)<=theObject[3]&&Number(changedY)+Number(ballRadius)>=theObject[3])
        {            
          collisionObstacle=theObject;
          positionShouldBe[0]=true;
          positionShouldBe[2]=theObject[2]-ballRadius;
          positionShouldBe[4]="top";          
        }
        //下碰撞:球上緣本來在他的下邊 進去後撞到下邊
        else if(((Number(oriy)-Number(ballRadius)>=theObject[3]&&Number(changedY)-Number(ballRadius)<=theObject[3])||
                (Number(oriy)-Number(ballRadius)>=theObject[2]&&Number(changedY)-Number(ballRadius)<=theObject[2]))&&
                theObject[4]!="passable")
        {
         collisionObstacle=theObject;
         positionShouldBe[0]=true;
         positionShouldBe[2]=theObject[3]+ballRadius;
         positionShouldBe[4]="bot";
        }
      }        
    }
  }
  if(positionShouldBe[0]==true)
  {
    positionShouldBe[3]=collisionObstacle[4];
  }
  return positionShouldBe;
}

function collisionDetection(character,xDisplacement,yDisplacement)
{  
  var orix = d3.select(character).attr("cx");
  var oriy = d3.select(character).attr("cy");
  var changedX = Number(orix)+xDisplacement;
  var changedY = Number(oriy)+yDisplacement;
  var positionShouldBe = [false,changedX,changedY,""];//collision?,x,y,屬性,障礙物被撞到的方向
  var collisionObstacle = [0,0,0,0,""];
  var obstacleID = "";

  for (var i in obstacleSet)//遍歷所有障礙物
  {
    if(xDisplacement!=0)//判斷左右碰撞
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
            obstacleID = i;
            positionShouldBe[0]=true;
            positionShouldBe[1]=obstacleSet[i][0]-ballRadius;
            positionShouldBe[4]="left";
          }
          //右碰撞:球左緣本來在他的右邊 進去後撞到右邊
          else if(Number(orix)-Number(ballRadius)>=obstacleSet[i][1]&&Number(changedX)-Number(ballRadius)<=obstacleSet[i][1])
          {
            collisionObstacle = obstacleSet[i];
            obstacleID = i;
            positionShouldBe[0]=true;
            positionShouldBe[1]=obstacleSet[i][1]+ballRadius;
            positionShouldBe[4]="right";
          }
        }
      }
    }
    if(positionShouldBe[0]==true)
    {
      positionShouldBe[3]=collisionObstacle[4];
      break;//已發生碰撞
    } 
    if(yDisplacement!=0)//判斷上下碰撞
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
            obstacleID = i;
            positionShouldBe[0]=true;
            positionShouldBe[2]=obstacleSet[i][2]-ballRadius;
            positionShouldBe[4]="top";          
          }
          //下碰撞:球上緣本來在他的下邊 進去後撞到下邊
          else if(((Number(oriy)-Number(ballRadius)>=obstacleSet[i][3]&&Number(changedY)-Number(ballRadius)<=obstacleSet[i][3])||
                  (Number(oriy)-Number(ballRadius)>=obstacleSet[i][2]&&Number(changedY)-Number(ballRadius)<=obstacleSet[i][2]))&&
                  obstacleSet[i][4]!="passable")
          {
           collisionObstacle=obstacleSet[i];
           obstacleID = i;
           positionShouldBe[0]=true;
           positionShouldBe[2]=obstacleSet[i][3]+ballRadius;
           positionShouldBe[4]="bot";
          }
        }        
      }
    }
    if(positionShouldBe[0]==true)
    {
      positionShouldBe[3]=collisionObstacle[4];//複製方塊屬性
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
      passTheStage();
    }
  }
  else if(collisionObstacle[4]=="ice")
  {
    if((d3.selectAll("#"+obstacleID))[0].length>0)
    {
      window.setTimeout(
      function() {
      d3.select("#"+obstacleID).remove();}
      , 100);      
    }
    else//沒了就無視碰撞
    {
      positionShouldBe = [false,changedX,changedY,""];//collision?,x,y
    }
  }
  return positionShouldBe;
}

function init()
{/*cut screen
  d3.select("#basicSVG").attr("viewBox","0,300,500,500")
                        .attr("preserveAspectRatio","xMidYMid slice");*/
  var interval_id = window.setInterval("", 9999); // Get a reference to the last

  intervalList = [];
  stageClear = false;
  clearInterval(gameStartInterval);
  clearInterval(movingInterval);
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
  //obstacleSet = stageSet[stage]["obstacleSet"];
  obstacleSet = JSON.parse(JSON.stringify(stageSet[stage]["obstacleSet"]));
  oriObstacleSet = JSON.parse(JSON.stringify(stageSet[stage]["obstacleSet"]));
  //oriObstacleSet = stageSet[stage]["obstacleSet"];
  ballRespawn = stageSet[stage]["respawnPoint"];
  chasing = stageSet[stage]["chasing"];
  if(stageSet[stage]["jumpDistance"]>0) jumpDistance = stageSet[stage]["jumpDistance"];
  else jumpDistance = 55;
  document.getElementById("gameTitle").innerText = "Unlimited Ball Game" + " - " + stageSet[stage]["stageName"];
  obstacleBuild(oriObstacleSet);   

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
  startTimer = false;
  stageClear = false;
  d3.select("#logText").remove();
  updateTime();
}

function passTheStage()
{
  startTimer = false;
  if(stageClear == false)
  {
    d3.select("#basicSVG").append("text")
    .attr("id","logText")
    .attr("x","80")
    .attr("y","270")
    .attr("fill","#EEEE00")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("style","font-size:70px")
    .text("Stage Clear!");
    stageClear = true;  
  }  
}

function Respawn()
{
  if( timerOpen == 2 ) restartTimer();
  stageReset();
  console.log(velocityY);
  stageClear = false;
  d3.select("#logText").remove();
  d3.select("#jumper").attr("cx",ballRespawn[0])
                      .attr("cy",ballRespawn[1])
                      .attr("fill",document.getElementById("jumperColor").value);  
}

function stageReset()//for dead
{
  for(var i in oriObstacleSet)
  {
    height = oriObstacleSet[i][3]-oriObstacleSet[i][2];
    width = oriObstacleSet[i][1]-oriObstacleSet[i][0];
    x = oriObstacleSet[i][0];
    y = oriObstacleSet[i][2];
    var obstacleID = i;
    if(oriObstacleSet[i][4]=="ice"&&!(d3.selectAll("#"+obstacleID)[0].length>0))
    {
      color="#33FFDD";
      d3.select("#basicSVG").
      append('rect').
      attr({
      'x':x,
      'y':y,
      'height':height,
      'width':width,
      'fill':color,
      'id': i,
      });
    }     
  }
}

function obstacleBuild(innerObstacleSet)
{
  for(var i in innerObstacleSet)
  {
    var height = innerObstacleSet[i][3]-innerObstacleSet[i][2];
    var width = innerObstacleSet[i][1]-innerObstacleSet[i][0];
    var x = innerObstacleSet[i][0];
    var y = innerObstacleSet[i][2];
    var obstacleID = i;

    if(innerObstacleSet[i][4]=="noClimb") color="#0044BB";
    else if(innerObstacleSet[i][4]=="goal") color="#AA0000";
    else if(innerObstacleSet[i][4]=="dead") color="#3A0088";
    else if(innerObstacleSet[i][4]=="spring") color="#F75000";
    else if(innerObstacleSet[i][4]=="passable") color="gray";
    else if(innerObstacleSet[i][4]=="cantPass") color="black";
    else if(innerObstacleSet[i][4]=="ice") color="#33FFDD";
    d3.select("#basicSVG").
    append('rect').
    attr({
    'x':x,
    'y':y,
    'height':height,
    'width':width,
    'fill':color,
    'id': i,
    });
    if(innerObstacleSet[i].length>5)//帶移動屬性
    {           
      intervalList.push(obstacleID);
    }
    if(intervalList.length>0)
    {
      movingInterval = setInterval(function(){ letObstacleMoving();}, timeInterval);
    }
  }
}

function letObstacleMoving()
{
  for(var i in intervalList)
  {
    obstacleMoving(intervalList[i]);
  }
}

function obstacleMoving(obsId) 
{
  var height = obstacleSet[obsId][3]-obstacleSet[obsId][2];
  var width = obstacleSet[obsId][1]-obstacleSet[obsId][0];
  var x = oriObstacleSet[obsId][0];
  var y = oriObstacleSet[obsId][2];
  var nowX = obstacleSet[obsId][0];
  var nowY = obstacleSet[obsId][2];
  //(Number(x) + Number(0.5*width))*(obstacleSet[obsId][5]>0 ? 1:-1) + Number(obstacleSet[obsId][5]);
  var endPointX = Number(x) + Number(oriObstacleSet[obsId][5]);
  var endPointY = Number(y) + Number(oriObstacleSet[obsId][6]);
  var moveTime = obstacleSet[obsId][7]*1000;
  var xMoveDistance = obstacleSet[obsId][5]*( timeInterval / moveTime);
  var yMoveDistance = obstacleSet[obsId][6]*( timeInterval / moveTime);       
  var shouldBeX ;
  var shouldBeY ;

  if(obstacleSet[obsId][8]!="type1"&&obstacleSet[obsId][8]!="type2") obstacleSet[obsId][8]="type1";//第一次

  if(((oriObstacleSet[obsId][5]>=0&&nowX<endPointX)|| //x位移為正向右
     (oriObstacleSet[obsId][5]<0&&nowX>endPointX)|| //x位移為負向左
     (oriObstacleSet[obsId][6]>=0&&nowY<endPointY)|| //y位移為正向下
     (oriObstacleSet[obsId][6]<0&&nowY>endPointY))&&obstacleSet[obsId][8]=="type1") //y位移為負向上
  {
    shouldBeX = Number(nowX)+Number(xMoveDistance);
    shouldBeY = Number(nowY)+Number(yMoveDistance);
  }
  else if(obstacleSet[obsId][8]=="type1") 
  {
    obstacleSet[obsId][8]="type2";
    shouldBeX = Number(nowX)-Number(xMoveDistance);
    shouldBeY = Number(nowY)-Number(yMoveDistance);
  }
  else if(((oriObstacleSet[obsId][5]>=0&&nowX>x)|| //x位移為正向右 反向向左 終點為起點
     (oriObstacleSet[obsId][5]<0&&nowX<x)|| //x位移為負向左
     (oriObstacleSet[obsId][6]>=0&&nowY>y)|| //y位移為正向下
     (oriObstacleSet[obsId][6]<0&&nowY<y))&&obstacleSet[obsId][8]=="type2")
  {    
    shouldBeX = Number(nowX)-Number(xMoveDistance);
    shouldBeY = Number(nowY)-Number(yMoveDistance);   
  }
  else
  {
    obstacleSet[obsId][8]="type1";
    shouldBeX = Number(nowX)+Number(xMoveDistance);
    shouldBeY = Number(nowY)+Number(yMoveDistance);
  }  

  var beforeResult = objectCollision("#jumper",0,0,obstacleSet[obsId]);

  obstacleSet[obsId][0] = shouldBeX;
  obstacleSet[obsId][1] = shouldBeX+width;
  obstacleSet[obsId][2] = shouldBeY;
  obstacleSet[obsId][3] = shouldBeY+height;
  d3.select("#"+obsId).attr("x",shouldBeX)
                      .attr("y",shouldBeY);

  var checkResult = objectCollision("#jumper",0,touchTolerance,obstacleSet[obsId]);
  if(checkResult[0]==false) checkResult = objectCollision("#jumper",0,-touchTolerance,obstacleSet[obsId]);
  if(beforeResult[0]==false&&checkResult[0]==true&&(checkResult[4]=="top"||checkResult[4]=="bot"))//向上搭電梯
  {
    var jumperX = d3.select("#jumper").attr("cx");
    var jumperY = d3.select("#jumper").attr("cy");
    var direction = obstacleSet[obsId][8]=="type1"? 1:-1;
    d3.select("#jumper").attr("cx", Number( jumperX ) + Number(xMoveDistance*direction));
    d3.select("#jumper").attr("cy", Number( jumperY ) + Number(yMoveDistance*direction));
  }
  else if(beforeResult[0]==true&&checkResult[0]==false&&checkResult[4]=="top")//下落跟隨
  {
    var jumperX = d3.select("#jumper").attr("cx");
    var jumperY = d3.select("#jumper").attr("cy");
    var direction = obstacleSet[obsId][8]=="type1"? 1:-1;
    d3.select("#jumper").attr("cx", Number( jumperX ) + Number(xMoveDistance*direction));
    d3.select("#jumper").attr("cy", Number( jumperY ) + Number(yMoveDistance*direction));
  }

  checkResult = objectCollision("#jumper",touchTolerance,0,obstacleSet[obsId]);
  if(checkResult[0])
  {
    d3.select("#jumper").attr("cx", checkResult[1]);
    d3.select("#jumper").attr("cy", checkResult[2]);
  }
  else
  {
    checkResult = objectCollision("#jumper",-touchTolerance,0,obstacleSet[obsId]);
    if(checkResult[0])
    {
      d3.select("#jumper").attr("cx", checkResult[1]);
      d3.select("#jumper").attr("cy", checkResult[2]);
    }
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