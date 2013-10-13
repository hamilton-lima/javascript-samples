// carrega o sprite sheet do personagem
var p1spritesheetData = { 
	images: [p1.name],
	frames: {
		width:p1.width, 
		height:p1.height
	},
	animations: {
		jump: 15,
		idle: 15,
		run:{ frames:[7,8,9,10,11,7]}
	}	
};
	
p1.spritesheet = new createjs.SpriteSheet(p1spritesheetData);
p1.spritesheet.addEventListener("complete", buildChar);

// encontra posicao inicial do personagem no a partir do objeto do tipo 'start'
//
function buildChar(){

	p1.tile = new createjs.BitmapAnimation(p1.spritesheet);
	p1.tile.gotoAndStop("idle");
	main.addChild(p1.tile);

	var found = false;
	for(n in map.layers){
		console.debug( n + ' >> layer.name : ' + map.layers[n].name );
		if( map.layers[n].type == 'objectgroup' ){
			for(i in map.layers[n].objects){
				if(map.layers[n].objects[i].type == 'start'){
					found = true;
					p1.tile.x = map.layers[n].objects[i].x;
					p1.tile.y = map.layers[n].objects[i].y;
						
					// ajusta posicao vertical inicial do personagem 
					// 
					if( p1.height > map.layers[n].objects[i].height ){
						p1.tile.y = p1.tile.y - ( p1.height - map.layers[n].objects[i].height);
					}

					console.debug('start found:');
					console.debug( map.layers[n].objects[i]);
					console.debug( p1 );

					break;
				}
			}
		}
		
		if(found){
			break;
		}
	}
	
	loading.character = true;
	
}
