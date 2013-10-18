var spritesheetData = { 
	images: [map.tilesets[0].image],
	frames: {
		width:map.tilesets[0].tilewidth, 
		height:map.tilesets[0].tileheight
	}	
};

function initMap(){
	console.debug('initMap');

	spriteSheet = new createjs.SpriteSheet(spritesheetData);
	spriteSheet.addEventListener("complete", buildMap );
}

function buildMap(){
	console.debug('buildMap');
	
	for(n in map.layers){
		console.debug( n + ' >> layer.type : ' + map.layers[n].type );
		if( map.layers[n].type == 'tilelayer' ){
			addTiles(n);
		}
	}
	
	console.debug('--- buildMap');	
	initChar();
}

function addTiles(n){

	var x = 0;
	var y = 0;
	var counter = 0;
	
	for(i in map.layers[n].data){
		// identifica imagem baseada no tile set
		var tid = map.layers[n].data[i];

		var tile = new createjs.BitmapAnimation(spriteSheet);
		tile.gotoAndStop(tid -1);
		tile.x = x;
		tile.y = y;	
		main.addChild(tile);
		
		x += map.tilewidth;
		
		counter ++;
		if( counter >= map.layers[n].width ){
			counter = 0;
			y = y + map.tileheight;
			x = 0;
		}
	}
	
}
