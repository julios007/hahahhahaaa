var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,blueBubbleImg, bulletImg, backBoardImg,redBubbleImg;
var gunAnime;
var blueBubbleGroup, redBubbleGroup, bulletGroup,greenfantGroup;
var greenfantImg,greenfant;
var laranja,laranjaImg;
var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("cowboy1.png");
  gunAnime = loadAnimation("cowboy2.png","cowboy3.png");
  bulletImg = loadImage("bullet1.png");
  blueBubbleImg = loadImage("fantasmaazul-removebg-preview.png");
  greenfantImg= loadImage("fantasmaverde.png");
  laranjaImg = loadImage("fantasmaLaranja.png");
  redBubbleImg = loadImage("fantasmavermelho.png");
  backBoardImg= loadImage("fundo velho oeste.jpg");
}
function setup() {
  createCanvas(windowWidth,windowHeight);


  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage("cowboy",gunImg);
  gun.addAnimation("cowboyA",gunAnime);
  gun.scale=0.3
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  greenfantGroup = createGroup();
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backBoardImg);
  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(width-200,20)

  scoreboard.html("Pontuação: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,50)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }
    if (frameCount % 200 === 0) {
      drawgreenfant();
    }
    if (frameCount % 120 === 0) {
      drawlaranja();
    }
    if(keyDown("space")){
      shootBullet();
      gun.changeAnimation("cowboyA",gunAnime);
    }

    if (blueBubbleGroup.collide(gun)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(gun)) {
      handleGameover(redBubbleGroup);
    }

    if (greenfantGroup.collide(gun)){
      handleGameover(greenfantGroup);
    }
  
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(greenfantGroup.collide(bulletGroup)){
      handleBubbleCollision(greenfantGroup);
    }
    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(1200,random(20,780),40,40);
  bluebubble.addImage("fantasmazul",blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -10;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(1200,random(20,780),40,40);
  redbubble.addImage("fantasmaver",redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -10;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}
function drawgreenfant(){
  greenfant = createSprite(1200,random(20,780),40,40);
  greenfant.addImage("fantasmaverde",greenfantImg);
  greenfant.scale = 0.1;
  greenfant.velocityX = -12;
  greenfant.lifetime = 400;
  greenfantGroup.add(greenfant);
}
function drawlaranja(){
  laranja = createSprite(1200,random(20,780),40,40);
  laranja.addImage("fantasmalaranja",laranjaImg);
  laranja.scale = 0.1;
  laranja.velocityX = -10;
  laranja.lifetime = 400;
 // greenfantGroup.add(greenfant);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage("bala",bulletImg);
  bullet.scale=0.09;
  bullet.velocityX= 7;
  bulletGroup.add(bullet);
 
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

     
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2;
      
      swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu o jogo!",
        text: "Sua pontuação é: " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      });
    }
  
}