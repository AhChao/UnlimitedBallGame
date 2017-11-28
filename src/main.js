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
var jumpDistance = 60;
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
}

function worldGravity()
{
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
    //velocityX = Math.abs(velocityX);
    //velocityX = -velocityX;
    horizontalMoving = true;
  }
  else if(rightKeyDown)
  {
    //velocityX = Math.abs(velocityX);
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
    var collisionObstacle=[0,0,0,0,0];
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
            collisionObstacle=obstacleSet[i];
            if(droping&&obstacleSet[i][4]!="noClimb"&&obstacleSet[i][4]!="dead")//踢牆跳
            {
             orix = orix - velocityX*15;
             droping = false;
             jumpTimes = 0;
             inTheAir = false;
             droping = false;
             dropTime = 0;
             slideOnWall = true;             
            }
            else //平常撞到的時候
            {
             if(obstacleSet[i][4]=="noClimb")
             {
              cantClimb = true;
              jumping = false;
             }              
             orix = orix - velocityX;
             horizontalMoving = false;//撞到要停下移動狀態
             horizontalCount = 0;
             if(obstacleSet[i][4]=="dead")
             {
              cantClimb = true;
              jumping = false;
              Respawn();              
             }
             break;              
            }           
          }
        }
    } 
    if( collisionObstacle[4] =="dead")
    {
      Respawn();
    }
    else
    {
      d3.select("#jumper").attr("cx",orix);
    }    
    if(horizontalCount>=horizontalDistance || collisionObstacle[4] =="dead")
    {
      horizontalMoving = false;
      horizontalCount = 0 ;
    }
  }

  if(jumping)//跳躍中
  {
    var orix = d3.select("#jumper").attr("cx");
    var oriy = d3.select("#jumper").attr("cy");
    var collisionObstacle=[0,0,0,0,0];
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
           collisionObstacle=obstacleSet[i];
           oriy = obstacleSet[i][3]+ballRadius;
           jumping = false;//撞到要停下移動狀態
           distanceCount = 0;
           break;
          }
        }
    }
    if(!cantClimb) d3.select("#jumper").attr("cy",oriy);
    if(collisionObstacle[4]=="dead") Respawn();
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
    oriy = Number(oriy) + distanceY;
    var collisionObstacle=[0,0,0,0,0];
    
    for (var i in obstacleSet)//踩在障礙物上嗎 做碰撞修正
    {
      if(ballCenter>=obstacleSet[i][0]&&ballCenter<=obstacleSet[i][1])
      /*//判斷球左緣右緣在(障礙物左緣或右緣間)
      if((Number(orix)-Number(ballRadius)<=obstacleSet[i][1]&&Number(orix)+Number(ballRadius)>=obstacleSet[i][1])||
            (Number(orix)-Number(ballRadius)<=obstacleSet[i][0]&&Number(orix)+Number(ballRadius)>=obstacleSet[i][0]))*/
      {
        //加了距離後跑進障礙物中
        if((Number(oriy)+Number(ballRadius)+Number(distanceY)>=obstacleSet[i][2])&&
        (Number(oriy)+Number(ballRadius)+Number(distanceY)<=obstacleSet[i][3]))
        {
         if(obstacleSet[i][4]=="goal") startTimer = false;     
         collisionObstacle = obstacleSet[i];    
         oriy = obstacleSet[i][2]-ballRadius;//中心歸位到障礙物上緣-球半徑
         break;
        }
      }
      else if(Number(orix)-Number(ballRadius)<=obstacleSet[i][0]&&Number(orix)+Number(ballRadius)>=obstacleSet[i][0]&&Number(orix)<=obstacleSet[i][0])
      {
        if((Number(oriy)+Number(ballRadius)+Number(distanceY)>=obstacleSet[i][2])&&
        (Number(oriy)+Number(ballRadius)+Number(distanceY)<=obstacleSet[i][3]))
        {
         if(obstacleSet[i][4]=="goal") startTimer = false;
         collisionObstacle = obstacleSet[i];
         oriy = obstacleSet[i][2]-ballRadius;//中心歸位到障礙物上緣-球半徑
         orix = obstacleSet[i][0] - ballRadius -1;
         break;
        }
      }
      else if(Number(orix)-Number(ballRadius)<=obstacleSet[i][1]&&Number(orix)+Number(ballRadius)>=obstacleSet[i][1]&&Number(orix)>=obstacleSet[i][1])
      {
        if((Number(oriy)+Number(ballRadius)+Number(distanceY)>=obstacleSet[i][2])&&
        (Number(oriy)+Number(ballRadius)+Number(distanceY)<=obstacleSet[i][3]))
        {
         if(obstacleSet[i][4]=="goal") startTimer = false;
         collisionObstacle = obstacleSet[i];
         oriy = obstacleSet[i][2]-ballRadius;//中心歸位到障礙物上緣-球半徑
         orix = obstacleSet[i][1] + ballRadius + 1;
         break;
        }
      }
    }/*
    if(oriy>bottomY)//撞到地板 重製跳躍狀態
    {
      jumpTimes = 0;
      inTheAir = false;
      droping = false;
      dropTime = 0;
      oriy=bottomY;
    }*/
    if(collisionObstacle[4]=="dead") Respawn();
    else
    {
      d3.select("#jumper").attr("cx",orix);
      d3.select("#jumper").attr("cy",oriy);
    }
  }
  cantClimb = false;
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
  document.getElementById("gameTitle").innerText = "Unlimited Ball Game" + " - " + stageSet[stage]["stageName"];
  obstacleBuild();   

  d3.select("#jumper").attr("cx",ballRespawn[0])
                      .attr("cy",ballRespawn[1]);
                      //fortest
  /*d3.select("#jumper").attr("cx",260)
                      .attr("cy",40);*/
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
    color = obstacleSet[i].length > 4 ? "black" : "gray";
    if(obstacleSet[i][4]=="noClimb") color="#0044BB";
    else if(obstacleSet[i][4]=="goal") color="#AA0000";
    else if(obstacleSet[i][4]=="dead") color="#3A0088";
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

//test for gamepad
var hasGP = false;
var repGP;
var gpUPDown = false;
var gpLeftDown = false;
var gpRightDown = false;

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
        html += "Pad id: "+gp.id+" | ";
    html+= "pressed : ";

    e = $.Event('keydown');
    if(gp.buttons[12].pressed||gp.buttons[0].pressed)
    {
      html+= "Jump ";
      gpUPDown=true;
      e.keyCode= 38; // up and A
      $('input').trigger(e);
    } 
    if(gp.buttons[14].pressed)
    {
      html+= "Left ";
      gpLeftDown=true;
      e.keyCode= leftKey;
      $('input').trigger(e);
    } 
    if(gp.buttons[15].pressed)
    {
      html+= "Right ";
      gpRightDown=true;
      e.keyCode= rightKey;
      $('input').trigger(e);
    }

    e = $.Event('keyup');
    if(gpUPDown==true&&!gp.buttons[12].pressed&&!gp.buttons[0].pressed)
    {
      e.keyCode=38;
      gpUPDown=false;
      $('input').trigger(e);
    }
    if(gpLeftDown==true&&!gp.buttons[14].pressed)
    {
      e.keyCode=leftKey;
      gpLeftDown=false;
      $('input').trigger(e);
    }
    if(gpRightDown==true&&!gp.buttons[15].pressed)
    {
      e.keyCode=rightKey;
      gpRightDown=false;
      $('input').trigger(e);
    }

    $("#gamepadDisplay").html(html);
}

$(document).ready(function() { 

if(canGame()) {
    var prompt = "【To begin using your gamepad, connect it and press any button!】";
    $("#gamepadPrompt").text(prompt);

    $(window).on("gamepadconnected", function() {
        hasGP = true;
        $("#gamepadPrompt").html("【Gamepad connected!】");
        console.log("connection event");
        repGP = window.setInterval(reportOnGamepad,100);
    });

    $(window).on("gamepaddisconnected", function() {
        console.log("disconnection event");
        $("#gamepadPrompt").text(prompt);
        window.clearInterval(repGP);
    });

    //setup an interval for Chrome
    var checkGP = window.setInterval(function() {
        console.log('checkGP');
        if(navigator.getGamepads()[0]) {
            if(!hasGP) $(window).trigger("gamepadconnected");
            window.clearInterval(checkGP);
        }
    }, 500);
}

});