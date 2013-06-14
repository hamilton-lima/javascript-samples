	function ImagemXY(c,src,x,y){
		this.ctx = c;
		this.x = x;
		this.y = y;

		this.img = new Image();
		this.img.onload = function() {
			// adiciona novo atributo no objeto Image
			this.ready = true;
		}

		this.img.src = src;

		this.desenhar = function(){
			if( this.img.ready ){
				this.ctx.drawImage(this.img,this.x,this.y);
			}
		}
	}
