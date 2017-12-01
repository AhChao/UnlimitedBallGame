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
      "obstacle1" : [150,350,480,500,"passable"],//stair
      "obstacle1" : [150,350,480,500,"passable"],//stair
      "obstacle1_2" : [250,350,460,480,"passable"],//stair2
      "obstacle1_3" : [300,350,440,460,"passable"],//stair3
      "obstacle2" : [0,150,430,450,"passable"],//layer2
      "obstacleV3" : [150,170,220,370,"cantPass"],
      "obstacleV4" : [210,230,220,370,"cantPass"],
      "obstacleV5" : [250,270,120,180,"noClimb"],
      "obstacle5" : [0,75,380,400,"noClimb"],
      "obstacle51" : [0,75,280,300,"noClimb"],
      "obstacle6" : [75,150,330,350,"passable"],
      "obstacle61" : [75,150,230,250,"passable"],
      "upCube1":[450,470,280,300,"spring"],
      "upCube2":[380,400,460,480,"spring"],
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
      "obstacle6":[380,400,100,250,"noClimb"],//
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
  "WorkingStage" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      //"rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[40,700,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],

      "obstacle1":[80,100,460,480,"cantPass",0,-100,1.5],

    },
    "respawnPoint" : [50,420],
    "stageName" : "WorkingStage",
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
}