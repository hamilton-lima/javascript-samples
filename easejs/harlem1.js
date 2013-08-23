var harlem1 = new createjs.Container();
var corpo = new createjs.Bitmap("corpo.png");
corpo.y = 50;

var cabeca = new createjs.Bitmap("cabeca.png");
cabeca.x = 25; 
cabeca.y = 25; 
cabeca.regX = 25; 
cabeca.regY = 25; 

harlem1.addChild(corpo);
harlem1.addChild(cabeca);

createjs.Ticker.addEventListener("tick", harlem1Tick);

function harlem1Tick() {
	cabeca.rotation += 10;
}
