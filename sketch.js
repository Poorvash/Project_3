const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//var bird2,bird3;
var engine, world;
var box1;
var backgroundImg,platform;
var bird, slingshot;
var bg="sprites/bg.png"
var gameState = "onSling";
var score=0;

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    GetBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
   
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    
    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
   // bird2 = new Bird(180,50);
   // bird3 = new Bird(160,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
        
    }
    text("score: "+score,width-300,50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
   
    log1.display();
    
    box3.display();
    box4.display();
    
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
   // bird2.display();
   // bird3.display();
   

    platform.display();
    //log6.display();
    slingshot.display();   
   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        bird.image= loadImage("sprites/Chuck.png");
    }
}
 
async function GetBackgroundImg(){
    var responce= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var JSON=await responce.json();
    var hour=JSON.datetime.slice(11,13) 
    console.log(hour);
    if(hour>=06&&hour<=19){
    bg="sprites/bg.png"
    }else{
        bg="sprites/bg2.jpg"
        
    }
    backgroundImg= loadImage(bg);
    
}