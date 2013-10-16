    function tecladoStop(e) {
		p1.vx = 0;
		p1.vy = 0;
		p1.tile.gotoAndStop("idle");
	}
	
    function teclado(e) {

		// direita
		// @todo verificar paredes 
		if( e.keyCode == 39 ){
			p1.vx = config.horizontal;
		}

		// esquerda
		if( e.keyCode == 37 ){
			p1.vx = - config.horizontal;
		}

		// cima
		if( e.keyCode == 38 && p1.onStair ){
			p1.vy = - config.vertical;
		}

		// baixo
		if( e.keyCode == 40 && p1.onStair ){
			p1.vy = config.vertical;
		}

		if( e.keyCode == 32 && p1.jump_energy == 0 && p1.onGround ){
			p1.jump_energy = config.jump;
			//console.debug('jump = ' + p1.jump_energy );
		}

	}

    function intersect(a,b){
		c1 = Math.abs( (b.x+(b.width/2)) - (a.x+(a.width/2)) );
		c2 = Math.abs( (b.y+(b.height/2)) - (a.y+(a.height/2)) );

		d1 = (b.width/2) + (a.width/2);	
		d2 = (b.height/2) + (a.height/2);
		
		if( (c1 < d1) && (c2 < d2) ){
			return true;
		} else {
			return false;
		}
	}
	
    function checkGround(e){
		
		var jump = 0;
		var reduce = 0;
		
		if( p1.jump_energy > 0.1 ){
			jump = p1.jump_energy * e.delta;
			reduce = config.jump * e.delta;	
			p1.jump_energy -= reduce;
			
			//console.debug('jump energy= ' + p1.jump_energy );
		} else {
			p1.jump_energy = 0;
		}
		
		var a = { 
			x: p1.tile.x, 
			y: p1.tile.y + (p1.vy * e.delta), 
			width: p1.width, 
			height: p1.height };
			
		var b = null;	
			
		if( ! p1.onStair ){
			//console.debug('jump = ' + jump );			
			//console.debug('gravity = ' +  (p1.gravity * e.delta) );
			a.y += (p1.gravity * e.delta);
			a.y -= jump;
    	}						
    
    	// console.debug(a);
    	
		var hit = false;
		for(n in map.layers){
			if( map.layers[n].name == 'chao' ){
				for(i in map.layers[n].objects){
					
					if( intersect(a, map.layers[n].objects[i]) ){
						hit = true;
						b = map.layers[n].objects[i];
						break;
					}			
				}
			}
		
			if(hit){
				break;
			}
		}
		
		if( ! hit ){
			p1.tile.y += (p1.vy * e.delta);
			if( ! p1.onStair ){
				p1.tile.y += (p1.gravity * e.delta);
				p1.tile.y -= jump;
    		}
    		p1.onGround = false;
    		p1.tile.gotoAndStop("jump");

		} else {
			
			// mover para o mais proximo possivel
			// para simular a colisao
			if( a.y < b.y ){
				p1.tile.y = b.y - a.height;
			} else {
				p1.tile.y = b.y + b.height;
			}
			
			// bateu no chao desliga a energia do pulo
			p1.jump_energy = 0;
    		p1.onGround = true;
		}
    
    } 

function checkWall(e){
		
	if( p1.vx == 0 ){
		return;
	}

	var a = { 
		x: p1.tile.x + (p1.vx * e.delta), 
		y: p1.tile.y, 
		width: p1.width, 
		height: p1.height };
			
	var b = null;	
	var hit = false;

	for(n in map.layers){
		if( map.layers[n].name == 'parede' ){
			for(i in map.layers[n].objects){
				
				if( intersect(a, map.layers[n].objects[i]) ){
					hit = true;
					b = map.layers[n].objects[i];
					break;
				}			
			}
		}
	
		if(hit){
			break;
		}
	}
		
	if( ! hit ){
		p1.tile.gotoAndStop("run");
		p1.tile.x += (p1.vx * e.delta);
		shiftContainer(p1.vx * e.delta);
		if( p1.tile.x < 0 ){
			p1.tile.x = 0;
		}
	} else {
		p1.tile.gotoAndStop("idle");	
		// mover para o mais proximo possivel
		// para simular a colisao
		if( a.x < b.x ){
			p1.tile.x = b.x - a.width;
		} else {
			p1.tile.x = b.x + b.width;
		}
	}
    
} 

// desloca a tela para acompanhar o personagem
function shiftContainer(shiftX){

	var xScreen = p1.tile.x - Math.abs(main.x);
	var percentScreen = stage.canvas.width * 0.25;
	
	// andando para direita
	if( shiftX > 0 ){
		if( (stage.canvas.width - xScreen) < percentScreen){
			main.x -= shiftX;
		}
	} else {
		if( xScreen < percentScreen){
			main.x -= shiftX;
		}
	}
	
	if( main.x > 0 ){
		main.x = 0;
	}

}


