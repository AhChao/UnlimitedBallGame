//關卡
var stageSet =
{
  "BasicStage" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
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
      "obstacle13":[0,50,30,50],
      "obstacle14":[100,180,5,25],
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
      "deadCube":[100,120,440,460,"dead"],
      "deadCube2":[170,190,460,480,"dead"],
      "deadCube3":[170,190,370,390,"dead"],
      "deadCube4":[250,270,440,460,"dead"],
      "obstacle1":[330,350,400,480,"cantPass"],
      "obstacle2":[470,490,400,480,"cantPass"],
      "deadCube5":[400,420,440,460,"dead"],
      "obstacle3":[470,490,300,320],
      "obstacle4":[400,450,250,270,"noClimb"],
      "obstacle5":[260,280,250,270],
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
    "stageName" : "1128PatientStage",
  },
  "WorkingStage" :
  {
    "obstacleSet" : //[x1,x2,y1,y2,特殊(option)]//碰到障礙物不要觸發重力
    {
      "leftfloor":[-10,0,-9999,500,"noClimb"],
      //"rightfloor":[500,510,-9999,500,"noClimb"],
      "downfloor":[0,500,480,500,"noClimb"],
      //"upfloor":[-100,600,-20,0,"noClimb"],
      "obstacle1":[0,20,0,500,"noClimb"],
      "obstacle2":[180,200,0,440,"noClimb"],
      "obstacle3":[20,40,40,60,"noClimb"],
      "deadCube1":[100,180,420,440,"dead"],
      "deadCube2":[20,100,350,370,"dead"],
      "upCube1":[30,50,200,250,"spring"],
    },
    "respawnPoint" : [40,0],
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