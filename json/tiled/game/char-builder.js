
var p1spritesheetData = { 
	images: [p1.name],
		frames: {
			width:p1.width, 
			height:p1.height,
			count:11
		},
		animations: {
			idle:{frames:[9]},
			jump:{frames:[10]},
			run:{frames:[0,1,2,3,4,5,6,7,8,9], frequency:4}					
		}
	};


function initChar(){	
	console.debug('initChar');
	console.debug(p1spritesheetData);

	p1.spritesheet = new createjs.SpriteSheet(p1spritesheetData);
	p1.spritesheet.addEventListener("complete", buildChar);
	console.debug('--- initChar');
}

// encontra posicao inicial do personagem no a partir do objeto do tipo 'start'
//
function buildChar(){
	console.debug('buildChar');

	p1.tile = new createjs.BitmapAnimation(p1.spritesheet);
	
	p1.tile.gotoAndStop("idle");
	main.addChild(p1.tile);

	setStartPosition();
	init();
}

function setStartPosition(){

	var found = false;
	
	for(n in map.layers){
		console.debug( n + ' >> layer.name : ' + map.layers[n].name );
		if( map.layers[n].type == 'objectgroup' ){
			for(i in map.layers[n].objects){
				if(map.layers[n].objects[i].type == 'start'){
					
					found = true;
					
					p1.tile.regX = p1.width /2;
					p1.tile.regY = p1.height /2;
					
					p1.tile.x = map.layers[n].objects[i].x; 
					p1.tile.y = map.layers[n].objects[i].y;

					p1.startX = p1.tile.x;
					p1.startY = p1.tile.y;
					
					// ajuste para colocar personagem acima da posicao de start
					p1.tile.y = p1.tile.y - p1.height;

					console.debug('**start found:');
					console.debug( 'x='+ p1.tile.x );
					console.debug( 'y='+ p1.tile.y );
					
					break;
				}
			}
		}
		
		if(found){
			break;
		}
	}

}
