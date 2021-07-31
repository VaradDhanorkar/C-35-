//var ball;
var hypnoticBall;
var database;

function setup(){
    createCanvas(500,500);
    //ball = createSprite(250,250,10,10);
    //ball.shapeColor = "red";
    // connected Database
    database = firebase.database();
    console.log(database);
    //creating hypnoticBall and changing it's colour
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //Refering to the folder value 
    var hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
//setting position 
function writePosition(x,y){
    database.ref('ball/position').set({
      'x': position.x + x ,
      'y': position.y + y
    })
  }


//changing position of the ball
/*
function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
*/
//reading position 
function readPosition(data){
    position = data.val();
    console.log(position.x);
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
  }

function showError(){
    console.log("Error in writing to the database");
  }
