let player;
let pImg;
let oImg;
let bgImg;
let obstacles=[]; 
let wordClassifier;




function preload()
{
  pImg =loadImage("player.png")
  oImg =loadImage("obstcle.png")
  bgImg =loadImage("bg.jpg")
  let options = {
    probabilityThreshold: 0.85
  };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w",options);
}
 

function setup() {
  createCanvas(1500 , 720);
  player = new Player();
  wordClassifier.classify(heardWord)
}

function heardWord(error, results)
{
  if(results[0].label =="up"){
   player.jump()
  }
}



function keyPressed(){
  if(key == " ")
  {
    player.jump();
  }
}

function draw() {
  background(bgImg);
  player.show();
  player.move();

  if(random(1) < 0.01) {
    obstacles.push(new Obstacle())
  }

  for (let obs of obstacles){
    obs.show()
    obs.move()
    if(player.collided(obs)==true){
      noLoop();
    }
  } 
 }