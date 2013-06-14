	function Imagem(c,src){
		this.ctx = c;

		this.img = new Image();
		this.img.onload = function() {
			// adiciona novo atributo no objeto Image
			this.ready = true;
		}

		this.img.src = src;

		this.desenhar = function(x,y){
			if( this.img.ready ){
				this.ctx.drawImage(this.img,x,y);
			}
		}
	}
