var soldier,soldierImg
var kingdom,kingdomI;
var enemy,enemyI,enemyImg;
var I;
var bullet,bulletI;
var enemyGroup;
var bulletGroup;
var message = "GAME OVER";
var gameState;

function preload(){
  soldierImg = loadImage("soldier.png");
  kingdomI = loadImage("bgimg.png");
  enemyI = loadImage("enemy1.png");
  enemyImg = loadImage("enemy2.png");
  bulletI = loadImage("bulletImg.jpg");
}
function setup(){
  createCanvas(400,400);

 kingdom = createSprite(200,200,400,400);
 //kingdom.setAnimation("bgimg.png_1");
 kingdom.addImage(kingdomI);
 kingdom.velocityX=-5;
 
  soldier = createSprite(70,mouseY,15,15);
  //soldier.setAnimation("soldier.png");
  soldier.addImage(soldierImg);
  soldier.scale=0.3;

  enemyGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  if(kingdom.x<0){
    kingdom.x = kingdom.width/2;
  }
  soldier.y = mouseY

  if(keyDown("space")){
    var tempBullet = spawnBullet();
    tempBullet.addImage(bulletI);
    tempBullet.y = soldier.y;
  }

  if(bulletGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
  }

  if(enemyGroup.isTouching(soldier)){
    soldier.visible = false;
    gameState = "End";
   }
  spawnEnemy();
  drawSprites(); 

  if(gameState === "End"){
    textSize(24);
    text(message,200,200);
    enemyGroup.destroyEach();
    kingdom.velocityX = 0;
  }
}

function spawnEnemy(){
  if(frameCount % 100 === 0){
      enemy = createSprite(400,random(50,200),20,20);
      enemy.velocityX = -3;
      I = Math.round(random(1,2));
      if(I == 1){
        enemy.addImage(enemyI);
        enemy.scale = 0.5;
      }
      else{
        enemy.addImage(enemyImg);
        enemy.scale = 0.2
      }
     // enemy.scale = 0.3
     enemyGroup.add(enemy);
  }
}

function spawnBullet(){
  bullet = createSprite(70,50,15,15);
  bullet.velocityX = 3;
  bullet.scale = 0.2;
  bulletGroup.add(bullet);
  return bullet;
  
}
