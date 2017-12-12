//關卡
var stageSet =
{
  "BasicStage" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,屬性]//碰到障礙物不要觸發重力
    {
      //basic Test Stage
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      "rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[0,500,500,520],
      "deadob":[450,470,400,500,"dead"],      
      "obstacle1" : [150,300,480,500,"passable"],//stair
      /*"obstacle1" : [150,350,480,500,"passable"],//stair
      "obstacle1_2" : [250,350,460,480,"passable"],//stair2
      "obstacle1_3" : [300,350,440,460,"passable"],//stair3*/
      "obstacle2" : [0,150,430,450,"passable"],//layer2
      "obstacleV3" : [150,170,220,370,"cantPass"],
      "obstacleV4" : [210,230,220,370,"cantPass"],
      "obstacleV5" : [250,270,120,180,"noClimb"],
      "obstacle5" : [0,75,380,400,"noClimb"],
      "obstacle51" : [0,75,280,300,"noClimb"],
      "obstacle6" : [75,150,330,350,"passable"],
      "obstacle61" : [75,150,230,250,"passable"],
      "upCube1":[450,470,280,300,"spring"],
      "testpillar1":[380,400,400,500,"spring"],
      "testpillar2":[300,320,400,500,"noClimb"],
      "goal" : [0,30,180,200,"goal"],
      //"road" : [30,60,180,200,"noClimb"],
      "obstacle7" : [270,470,330,350,"passable"],//stair
      "obstacle7_2" : [270,370,310,331,"passable"],//stair2
      "obstacle7_3" : [270,320,290,311,"passable"],//stair3
    },
    "respawnPoint" : [250,400],
    "stageName" : "BasicStage",

  },
  "1124WeeklyChallenge" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      "rightfloor":[500,510,-9999,500,"noClimb"],
      "obstacle1":[0,100,480,500,"cantPass"],
      "obstacle2":[130,150,440,460,"cantPass"],
      "obstacle3":[280,300,440,460,"cantPass"],
      "obstacle4":[220,240,280,300,"cantPass"],
      "obstacle5":[380,400,250,450,"cantPass"],
      "obstacle6":[380,400,150,250,"noClimb"],
      "obstacle66":[370,410,130,150,"noClimb"],
      "obstacle7":[0,100,300,320,"cantPass"],
      "obstacle8":[110,130,100,250,"noClimb"],
      "obstacle9":[0,50,180,200,"noClimb"],
      "obstacle10":[70,120,230,250,"noClimb"],
      "obstacle11":[70,120,130,150,"noClimb"],
      "obstacle12":[0,50,80,100,"noClimb"],
      "obstacle13":[0,50,30,50,"passable"],
      "obstacle14":[100,180,5,25,"passable"],
      "obstacle15":[280,300,50,70,"cantPass"],
      "goal":[450,480,440,460,"goal"],
    },
    "respawnPoint" : [50,400],
    "stageName" : "1124WeeklyChallenge",
  },
  "1128PatientStage" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      "rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[40,350,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],
      "deadCube":[100,120,435,455,"dead"],
      "deadCube2":[170,190,460,480,"dead"],
      "deadCube3":[170,190,370,390,"dead"],
      "deadCube4":[250,270,435,455,"dead"],
      "obstacle1":[330,350,400,480,"cantPass"],
      "obstacle2":[470,490,400,480,"cantPass"],
      "deadCube5":[400,420,440,460,"dead"],
      "obstacle3":[470,490,320,340,"passable"],
      "obstacle4":[400,450,250,270,"noClimb"],
      "obstacle5":[260,280,250,270,"passable"],
      "obstacle6":[50,110,370,390,"noClimb"],
      "deadCube6":[40,60,330,350,"dead"],
      "obstacle7":[10,30,280,350,"cantPass"],
      "obstacle8":[70,90,200,220,"cantPass"],
      "obstacle9":[130,150,200,220,"noClimb"],
      "obstacle10":[200,220,150,170,"noClimb"],
      "obstacle11":[300,320,150,170,"noClimb"],
      "deadCube7":[250,270,150,170,"dead"],
      "obstacle12":[370,500,150,170,"noClimb"],
      "obstacle13":[480,500,100,150,"cantPass"],
      "obstacle14":[385,405,45,65,"noClimb"],
      "deadCube8":[430,450,130,150,"dead"],
      "obstacle15":[250,270,45,65,"cantPass"],
      "kabe1":[240,250,45,65,"noClimb"],
      "kabe2":[270,280,45,65,"noClimb"],
      "kabe3":[240,280,65,75,"noClimb"],
      "obstacle17":[120,140,30,50,"noClimb"],
      "goal":[10,40,30,50,"goal"],
    },
    "respawnPoint" : [50,420],
    "jumpDistance" : 50,
    "stageName" : "1128PatientStage",
  },
  "1129BumpBumpJump" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      "rightfloor":[480,500,-9999,500,"noClimb"],      
      "upfloor":[-100,600,0,20,"noClimb"],

      "obstacle1":[0,20,0,500,"noClimb"],
      "start":[420,480,110,130,"noClimb"],
      "upCube1":[120,140,60,80,"spring"],
      "upCube2":[190,210,100,120,"spring"],
      "upCube3":[290,310,130,150,"spring"],
      "deadLine1":[60,480,160,180,"dead"],
      "upCube5":[65,85,270,290,"spring"],
      "upCube4":[120,140,250,270,"spring"],
      "deadCube1":[120,140,270,290,"dead"],      
      "upCube6":[200,220,265,285,"spring"],
      "protectBlue":[110,150,180,200,"noClimb"],
      "deadCube2":[260,280,280,300,"dead"],
      "upCube7":[330,350,265,285,"spring"],
      "deadLine2":[20,420,320,340,"dead"],
      "restBlue":[400,440,480,500,"noClimb"],      
      "obstacle4":[370,390,430,450,"cantPass"],
      "D1":[330,350,450,470,"dead"],
      "D2":[350,370,470,490,"dead"],
      "D3":[330,350,490,500,"dead"],
      "D4":[310,330,450,500,"dead"],
      "X1":[290,310,490,500,"dead"],
      "X2":[290,310,450,470,"dead"],
      "X3":[270,290,470,490,"dead"],
      "X4":[250,270,450,470,"dead"],
      "X5":[250,270,490,500,"dead"],
      "upCube8":[220,240,450,470,"spring"],
      "upCube9":[180,200,470,490,"spring"],
      "restBlue2":[130,160,390,410,"noClimb"], 
      "goal":[20,40,450,470,"goal"],
      
    },
    "respawnPoint" : [440,60],
    "stageName" : "1129BumpBumpJump",
  },
  "1130IceMelted" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[0,20,-9999,500,"noClimb"],
      "rightfloor":[480,500,-9999,500,"noClimb"],
      //"downfloor":[20,700,480,500,"noClimb"],
      "upfloor":[-100,600,0,20,"noClimb"],

      "start":[20,70,480,500,"noClimb"],
      "goal":[20,50,350,370,"goal"],
      "goalside":[50,70,320,370,"noClimb"],
      "goalside2":[50,100,300,320,"noClimb"],
      "obstacle1":[100,120,450,470,"ice"],
      "obstacle2":[170,190,450,470,"ice"],
      "obstacle3":[240,260,450,470,"ice"],
      "obstacle4":[310,330,450,470,"ice"],
      "obstacle5":[380,400,450,470,"ice"],
      "rest1":[450,480,480,500,"noClimb"],

      "climb1":[450,480,350,370,"cantPass"],
      "obstacle6":[380,400,300,320,"ice"],
      "deadcube1":[340,360,280,300,"dead"],
      "obstacle7":[300,320,250,270,"ice"],
      "deadline1":[260,280,150,350,"dead"],
      "deadline3":[140,280,130,150,"dead"],
      "rest2":[380,400,170,190,"noClimb"],

      "obstacle8":[440,460,60,80,"ice"],
      "obstacle9":[280,400,60,80,"noClimb"],

      "deadline2":[20,110,200,220,"dead"],

      "obstacle10":[220,240,60,80,"cantPass"],
      "obstacle11":[100,120,100,120,"ice"],
      "obstacle12":[30,50,130,150,"ice"],
      "obstacle13":[70,90,170,190,"ice"],
      "obstacle14":[130,150,200,220,"cantPass"],
      "obstacle15":[210,230,200,220,"ice"],
      "obstacle16":[210,230,270,290,"ice"],
    },
    "respawnPoint" : [50,420],
    "stageName" : "1130IceMelted",
  },
  "1204Move.gif" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      "rightfloor":[500,520,-9999,500,"noClimb"],
      "start":[0,60,480,500,"noClimb"],
      "upfloor":[-100,600,-20,0,"noClimb"],
      "deaTi":[200,460,60,80,"noClimb",0,100,3],
      
      "black1":[180,200,400,480,"cantPass"],
      
      //"obstacle3":[50,150,340,360,"noClimb"],
      "obstacle31":[150,170,300,360,"noClimb"],
      "obstacle32":[150,230,280,300,"noClimb"],
      "obstacle33":[210,230,300,360,"cantPass"],

      "deadline":[230,400,340,360,"dead"],

      "obstacle6":[270,290,460,480,"spring"],
      "obstacle61":[360,380,460,480,"spring"],

      "obstacle8":[470,490,300,320,"spring"], 
      "deadline2":[150,500,180,200,"dead"], 

      "black2":[0,20,180,280,"cantPass"], 
      //"blue2":[0,20,100,180,"noClimb"], 

      "org":[100,120,120,140,"spring"],
      "blue3":[160,180,50,180,"noClimb"],

      "dead1":[240,260,40,100,"dead"],
      "dead11":[240,260,160,180,"dead"],
      "dead2":[260,280,40,80,"dead"],
      "dead21":[260,280,140,180,"dead"],
      "dead3":[280,300,40,60,"dead"],
      "dead31":[280,300,120,180,"dead"],

      //"dead4":[320,340,40,60,"dead"],
      //"dead41":[320,340,120,180,"dead"],
      "dead5":[340,360,40,80,"dead"],
      "dead51":[340,360,150,180,"dead"],
      "dead6":[360,380,40,100,"dead"],
      //"dead61":[360,380,160,180,"dead"],
      "dead7":[380,400,40,80,"dead"],
      //"dead71":[390,400,140,180,"dead"],
      "dead8":[400,420,40,60,"dead"],
      "dead81":[410,430,120,180,"dead"],

      "dead9":[460,475,40,100,"dead"],
      "goal":[460,500,160,180,"goal"],
      
      "openDoorRed":[80,140,360,380,"dead",0,100,2],
      "obstacle7":[400,420,380,400,"cantPass",80,0,1],
      "obstacle71":[390,410,460,480,"cantPass",90,0,1],
      "obstacle101":[390,410,250,270,"cantPass",0,60,0.8],
      //"obstacle102":[360,380,230,250,"noClimb",0,60,1],
      "obstacle103":[330,350,220,240,"cantPass",0,80,0.8],
      //"obstacle104":[290,320,220,240,"noClimb",0,80,1],
      "obstacle105":[260,280,230,250,"cantPass",0,80,1.1],
      "obstacle110":[60,80,40,60,"dead",0,200,1],
      "obstacle120":[0,40,0,40,"noClimb",460,0,5],      
    },
    "respawnPoint" : [30,440],
    //"respawnPoint" : [180,350],
    "stageName" : "1204Move.gif",
  },
  "1205TryToUnlock" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[0,20,-9999,500,"noClimb"],
      "rightfloor":[480,500,-9999,500,"noClimb"],
      //"downfloor":[40,700,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],

      "obstacle11":[60,80,330,350,"ice"],
      "obstacle12":[20,40,330,350,"ice"],
      "obstacle13":[40,60,330,350,"ice"],
      "obstacle14":[60,80,310,330,"ice"],
      "obstacle15":[40,60,310,330,"ice"],
      "obstacle16":[60,80,290,310,"ice"],
      "obstacle17":[20,40,290,310,"ice"],
      "obstacle18":[40,60,290,310,"ice"],

      "obstacle21":[440,460,330,350,"ice"],
      "obstacle22":[460,480,330,350,"ice"],
      "obstacle23":[420,440,330,350,"ice"],
      "obstacle24":[440,460,310,330,"ice"],
      "obstacle25":[420,440,310,330,"ice"],
      "obstacle26":[440,460,290,310,"ice"],
      "obstacle27":[460,480,290,310,"ice"],
      "obstacle28":[420,440,290,310,"ice"],

      "deadDoorL":[60,220,200,220,"dead"],
      "deadDoorR":[280,480,200,220,"dead"],

      "goal":[20,60,200,220,"goal"],

      "blueDoor":[200,220,40,200,"noClimb"],
      "blueDoor2":[200,400,40,60,"noClimb"],

      "wish1":[20,40,50,70,"dead",160,0,3],
      "wish2":[20,40,100,120,"dead",160,0,4],
      "wish3":[20,40,150,170,"dead",160,0,5],
      
      "sitdown":[20,80,440,460,"cantPass",400,0,3],
      "sitdownUp":[240,260,140,160,"spring",200,0,3],
      "hoLiBe":[460,480,40,80,"cantPass"],

      "lock1":[20,40,310,330,"lock"],
      "lock2":[460,480,310,330,"lock"],
      "lock3":[200,220,400,420,"lock"],
      "lock4":[280,300,340,360,"lock"],
      "lock5":[220,240,280,300,"lock"],
      "lock6":[260,280,220,240,"lock"],
    },
    "respawnPoint" : [50,430],
    "stageName" : "1205TryToUnlock",
  },
  "1206PurpleStars" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[150,170,-9999,500,"noClimb"],
      "rightfloor":[330,350,-9999,500,"noClimb"],
      //"downfloor":[40,700,300,320,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],

      "upfloor":[-100,600,-20,0,"noClimb"],

      "standStone":[205,225,380,400,"cantPass"],
      "standStone2":[170,190,300,320,"cantPass"],
      "standStone3":[240,260,300,320,"cantPass"],
      "standStone4":[310,330,300,320,"cantPass"],
      "standStone5":[275,295,380,400,"cantPass"],
      "standStone6":[170,190,460,480,"cantPass"],
      "standStone7":[240,260,460,480,"cantPass"],
      "standStone8":[310,330,460,480,"cantPass"],

      "star1":[170,220,-20,0,"dead",0,1000,5,,"once"],
      "star2":[280,330,-20,0,"dead",0,1000,5,,"once"],
      "star3":[200,300,-240,-220,"dead",0,1000,5,,"once"],
      "star4":[170,250,-440,-420,"dead",0,1000,5,,"once"],
      "star5":[250,330,-640,-620,"dead",0,2000,12,,"once"],
      "star6":[170,190,-840,-820,"dead",0,2000,12,,"once"],
      "star7":[190,210,-890,-870,"dead",0,2000,12,,"once"],
      "star8":[210,230,-940,-920,"dead",0,2000,12,,"once"],
      "star9":[230,250,-990,-970,"dead",0,2000,12,,"once"],
      "star10":[250,270,-1040,-1020,"dead",0,2000,12,,"once"],
      "star11":[270,290,-1090,-1070,"dead",0,2000,12,,"once"],
      "star12":[290,330,-1240,-1220,"dead",0,2000,12,,"once"],

      "star13":[270,290,-1440,-1420,"dead",0,3000,18,,"once"],
      "star14":[250,270,-1490,-1470,"dead",0,3000,18,,"once"],
      "star15":[230,250,-1540,-1520,"dead",0,3000,18,,"once"],
      "star16":[210,230,-1590,-1570,"dead",0,3000,18,,"once"],
      "star17":[195,210,-1640,-1620,"dead",0,3000,18,,"once"],
      "star18":[290,330,-1690,-1670,"dead",0,3000,18,,"once"],
      "star19":[170,190,-1790,-1770,"dead",0,3000,18,,"once"],

      "star20":[240,350,-1990,-1970,"dead",0,3000,18,,"once"],
      "star21":[170,200,-1990,-1970,"dead",0,3000,18,,"once"],

      "star22":[290,350,-2290,-2270,"dead",0,3000,18,,"once"],
      "star23":[170,250,-2290,-2270,"dead",0,3000,18,,"once"],

      "star24":[230,350,-2590,-2570,"dead",0,3000,18,,"once"],
      "star25":[170,270,-2890,-2870,"dead",0,3000,18,,"once"],

      "star26":[255,275,-2890,-2870,"spring",0,3120,18.72,,"once"],
      "star27":[310,330,-2970,-2950,"spring",0,3120,18.72,,"once"],
      "goal":[270,290,80,100,"goal"],
    },
    "respawnPoint" : [250,250],
    "stageName" : "1206PurpleStars",
  },
  "1208TheTruePath" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[0,20,-9999,500,"noClimb"],
      "rightfloor":[480,500,-9999,500,"noClimb"],
      "downfloor":[440,490,480,500,"noClimb"],
      "upfloor":[-100,3600,0,20,"noClimb"],
      "goal":[20,60,60,80,"goal"],
      "obs":[400,420,430,450,"cantPass"],
      "obs2":[320,340,430,450,"cantPass"],
      "obs3":[240,260,430,450,"cantPass"],
      "obs4":[160,180,430,450,"cantPass"],
      "obs5":[80,100,430,450,"cantPass"],

      "lock1":[80,100,300,320,"lock"],
      "lock2":[160,180,300,320,"lock"],
      "lock3":[240,260,300,320,"lock"],
      "lock4":[400,420,300,320,"lock"],
      "lock5":[320,340,300,320,"lock"],
      
      "obs6":[320,340,200,250,"cantPass"],
      "ice1":[360,380,180,200,"ice"],
      "ice2":[460,480,180,200,"ice"],
      "ice3":[460,480,80,100,"ice"],
      "ice4":[360,380,80,100,"ice"],
      "ice5":[460,480,130,150,"ice"],
      "ice6":[360,380,130,150,"ice"],

      "road":[250,440,60,80,"noClimb"],  
      "kabe":[200,220,20,160,"noClimb"],
      "kabe2":[300,320,80,250,"noClimb"], 
      "deadRoad":[200,270,160,180,"dead"],
      "ice7":[230,250,140,160,"ice"],  
      "deadRoad2":[20,180,230,250,"dead"],
      "danger":[250,270,250,270,"noClimb"],

      "spring":[160,180,210,230,"spring"],

      "dead":[20,40,350,370,"dead",210,0,4],
      "dead2":[460,480,350,370,"dead",-210,0,4],
      "dead3":[100,120,20,40,"dead",0,180,2],
      "danTi":[100,120,200,220,"noClimb",0,-180,2],
    },
    "respawnPoint" : [450,420],
    //"respawnPoint" : [170,200],
    "stageName" : "1208TheTruePath★★★☆☆",
  },
  "1212AWallIsBehindYouAndItsAngry" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[0,20,-9999,500,"noClimb"],
      //"rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[0,490,480,500,"noClimb"],
      "upfloor":[-100,3600,0,20,"noClimb"],

      "obstacle1":[150,170,300,480,"cantPass"],
      "obstacle2":[230,250,250,480,"cantPass"],
      "obstacle3":[310,330,200,480,"cantPass"],
      "obstacle4":[390,410,150,480,"cantPass"],
      "obstacle5":[470,490,100,480,"cantPass"],

      "obstacle6":[550,570,250,270,"spring"],
      "obstacle7":[620,640,400,420,"spring"],
      "obstacle8":[790,810,300,320,"spring"],
      "obstacle9":[700,720,220,340,"cantPass"],
      "obstacle10":[680,700,200,300,"dead"],
      "obstacle11":[900,920,200,300,"cantPass"],
      "obstacle12":[1150,1170,100,400,"cantPass"],
      "obstacle13":[1100,1120,400,420,"spring"],
      "obstacle14":[1300,1320,20,400,"cantPass"],
      "obstacle14.5":[1320,1340,20,400,"noClimb"],
      "obstacle15":[1600,1620,100,460,"noClimb"],
      "obstacle16":[1300,1430,400,420,"cantPass"],
      "obstacle17":[1470,1620,440,460,"cantPass"],
      "obstacle18":[1360,1380,480,500,"spring"],
      "obstacle19":[1540,1620,100,120,"noClimb"],
      "ices1":[1360,1380,100,120,"ice"],
      "ices2":[1420,1440,100,120,"ice"],
      "ices3":[1480,1500,100,120,"ice"],
      "ices4":[1360,1380,180,200,"ice"],
      "ices5":[1420,1440,180,200,"ice"],
      "ices6":[1480,1500,180,200,"ice"],
      "ices7":[1540,1560,180,200,"ice"],
      "ices8":[1360,1380,260,280,"ice"],
      "ices9":[1420,1440,260,280,"ice"],
      "ices10":[1480,1500,260,280,"ice"],
      "ices11":[1540,1560,260,280,"ice"],
      "ices12":[1360,1380,340,360,"ice"],
      "ices13":[1420,1440,340,360,"ice"],
      "ices14":[1480,1500,340,360,"ice"],
      "ices15":[1540,1560,340,360,"ice"],

      "lock1":[1700,1720,340,360,"lock"],
      "lock2":[1770,1790,240,260,"lock"],
      "lock3":[1850,1870,340,360,"lock"],
      "lock4":[1940,1960,240,260,"lock"],
      "lock5":[2040,2060,340,360,"lock"],
      "lock6":[2140,2160,240,260,"lock"],

      "obstacle20":[2200,2220,40,60,"cantPass",0,300,4],
      "obstacle21":[2280,2320,100,120,"cantPass"],//safe

      "obstacle22":[2320,2360,120,140,"cantPass"],
      "obstacle23":[2360,2400,140,160,"cantPass"],
      "obstacle24":[2400,2440,160,180,"cantPass"],
      "obstacle25":[2440,2480,180,200,"cantPass"],
      "obstacle26":[2480,2520,200,220,"cantPass"],
      "obstacle27":[2520,2560,220,240,"cantPass"],
      "obstacle28":[2560,2600,240,260,"cantPass"],
      "obstacle29":[2600,2640,260,280,"cantPass"],
      "obstacle30":[2640,2680,280,300,"cantPass"],

      "deadMoving1":[2330,2350,80,100,"tele",0,400,4],
      "deadMoving2":[2370,2390,80,100,"tele",0,400,3.5],
      "deadMoving3":[2410,2430,80,100,"tele",0,400,3],
      "deadMoving4":[2450,2470,80,100,"tele",0,400,2.5],
      "deadMoving5":[2490,2510,80,100,"tele",0,300,4],
      "deadMoving6":[2530,2550,80,100,"tele",0,300,3.5],
      "deadMoving7":[2570,2590,80,100,"tele",0,300,3],
      "deadMoving8":[2610,2630,80,100,"tele",0,300,2.5],
      "deadMoving9":[2650,2670,80,100,"tele",0,400,2],

      "obstacle31":[2720,2760,300,320,"cantPass"],//safe

      "obstacle32":[2760,2800,280,300,"cantPass"],
      "obstacle33":[2800,2840,260,280,"cantPass"],
      "obstacle34":[2840,2880,240,260,"cantPass"],
      "obstacle35":[2880,2920,220,240,"cantPass"],
      "obstacle36":[2920,2960,200,220,"cantPass"],
      "obstacle37":[2960,3000,180,200,"cantPass"],
      "obstacle38":[3000,3040,160,180,"cantPass"],
      "obstacle39":[3040,3080,140,160,"cantPass"],

      "deadMoving11":[3060,3080,270,290,"tele",-300,0,4],
      //"deadMoving12":[3060,3080,250,270,"tele",-300,0,3.5],
      "deadMoving13":[3060,3080,230,250,"tele",-300,0,3],
      //"deadMoving14":[3060,3080,210,230,"tele",-300,0,2.5],
      "deadMoving15":[3060,3080,190,210,"tele",-400,0,4],
      //"deadMoving16":[3060,3080,170,190,"tele",-400,0,3.5],
      "deadMoving17":[3100,3120,150,170,"tele",-400,0,3.5],
      "deadMoving18":[3120,3140,130,150,"tele",-400,0,2.5],
     
      "goal":[3060,3100,360,380,"goal"],
      "goalKabe":[3300,3600,20,500,"noClimb"], 

      "deadWall":[20,40,0,480,"dead",2220,0,60,,"once"],
    },
    "respawnPoint" : [100,420],
    //"respawnPoint" : [2740,40],
    //"respawnPoint" : [2300,40],
    "telePoint" : [2300,40],
    "stageName" : "1212AWallIsBehindYouAndItsAngry",
    "chasing" : "true",
  },
  "1208AttackOnTitan" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[0,20,-9999,500,"noClimb"],
      //"rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[0,2500,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],
      "wallSina":[160,180,160,480,"cantPass"],
      //"wallRose":[160,180,160,480,"cantPass"],
      //"wallMaria":[160,180,160,480,"cantPass"],

      //"normalWall":[500,520,400,480,"cantPass"],

      "ManeverGear1":[200,220,100,120,"spring"],
      "ManeverGear2":[340,360,220,240,"spring"],
      "ManeverGear3":[450,470,240,260,"spring"],
      "ManeverGear4":[550,570,330,350,"spring"],

      "titan1body":[240,300,240,480,"dead"],
      "titan1neck":[260,280,160,240,"dead"],
      "titan1head":[240,300,100,160,"dead"],
      "titan1yoko":[200,340,260,300,"dead"],
      "titan1lh":[200,220,200,300,"dead"],
      "titan1rh":[320,340,300,400,"dead"],
      //"titan1labor":[280,300,220,240,"lock"],
      

      "titan2head":[400,440,350,390,"dead"],
      "titan2headr":[440,460,330,370,"dead"],
      "titan2headl":[400,420,330,390,"dead"],
      "titan2neck":[440,460,370,440,"ice"],
      "titan2body":[420,480,440,480,"dead"],
      "titan2hand":[400,500,420,440,"cantPass"],
      "titan2labor":[420,440,400,420,"lock"],

      "titan3head":[590,630,330,390,"dead"],
      "titan3headt":[570,630,330,350,"dead"],
      "titan3headd":[570,630,370,390,"dead"],
      "titan3neck":[590,610,390,450,"ice"],
      "titan3body":[610,670,430,460,"cantPass"],
      "titan3hand":[590,610,450,480,"dead"],
      "titan3foot":[650,670,430,480,"dead"],
      "titan3foot2":[670,710,460,480,"dead"],
      "titan3labor":[610,630,410,430,"lock"],

      "titan100labor":[1000,1020,400,420,"lock"],

      //"deadWall":[20,40,0,480,"dead",3000,0,60,,"once"],
    },
    "respawnPoint" : [100,420],
    //"respawnPoint" : [480,400],
    "stageName" : "1208AttackOnTitan",
    "chasing" : "true",
  },
  /*
  "WorkingStage" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      //"rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[40,700,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],
    },
    "respawnPoint" : [50,420],
    "stageName" : "WorkingStage",
    "chasing" : "true",
  },*/
  /*
  "Lodi" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[00,20,-9999,500,"noClimb"],
      //"rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[20,700,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],

      "lodiCirEdge1":[80,100,220,420,"cantPass"],
      "lodiCirEdge2":[100,280,220,240,"cantPass"],
      "lodiCirEdge3":[100,280,400,420,"cantPass"],
      "lodiCirEdge4":[260,280,220,420,"cantPass"],

      "lodiCir2Line1":[240,260,380,400,"passable"],
      "lodiCir2Line11":[220,240,360,380,"passable"],
      "lodiCir2Line12":[200,220,340,360,"passable"],
      "lodiCir2Line13":[180,200,320,340,"passable"],
      "lodiCir2Line17":[260,280,400,420,"passable"],
      "lodiCir2Line14":[280,300,420,440,"passable"],
      "lodiCir2Line15":[300,320,440,460,"passable"],
      "lodiCir2Line16":[320,340,460,480,"passable"],     
      "lodiCir2Line2":[100,120,380,400,"passable"],
      "lodiCir2Line21":[120,140,360,380,"passable"],
      "lodiCir2Line22":[140,160,340,360,"passable"],
      "lodiCir2Line23":[160,180,320,340,"passable"],
      "lodiCir2Line27":[80,100,400,420,"passable"],
      "lodiCir2Line24":[60,80,420,440,"passable"],
      "lodiCir2Line25":[40,60,440,460,"passable"],
      "lodiCir2Line26":[20,40,460,480,"passable"],
      "lodiCir2Line3":[170,190,160,320,"passable"],


      "lodiCirLine11":[220,240,260,280,"dead"],
      "lodiCirLine12":[200,220,280,300,"dead"],
      "lodiCirLine13":[180,200,300,320,"dead"],
      "lodiCirLine14":[220,240,260,280,"dead"],
      "lodiCirLine15":[200,220,280,300,"dead"],
      "lodiCirLine16":[180,200,300,320,"dead"],
      "lodiCirLine17":[180,200,300,320,"dead"],
      "lodiCirLine21":[120,140,260,280,"dead"],
      "lodiCirLine22":[140,160,280,300,"dead"],
      "lodiCirLine23":[160,180,300,320,"dead"],
      "lodiCirLine3":[170,190,300,420,"dead"],      
    },
    "respawnPoint" : [50,460],
    "stageName" : "Lodi",
    "chasing" : "true",
  },*/  
}