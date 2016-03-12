var MaskBuilder = function(){
	this.layers = [];
	this.readyCounter = 0;

	this.onload = function(){
		// nothing.
	}

	this.addLayer = function(_name, _url){
		var foo = new Image();
		this.layers.push({name: _name, url: _url, ready: false, image: foo});

		foo.src = _url;
		foo.owner = this;
		foo.name = _name;

		foo.onload = function(){
			this.owner.countReady();
		}
	}

	this.countReady = function(){
		this.readyCounter ++;
		console.log( this.ready() );

		if( this.ready() ){
			this.onload();
		}
		console.log(this.readyCounter);
	}

	this.ready = function(){
		if( this.readyCounter === 0 ){
			return false;
		}
		return this.layers.length === this.readyCounter;
	}

	this.findLayer = function(name){
		for (var i = 0; i < this.layers.length; i++) {
			if( this.layers[i].name === name ){
				return this.layers[i];
			}
		}
		return false;
	}

	// data format [{ name: layername, color: layercolor }, ...]
	// 
	this.build = function(width, height, data){

		var resultCanvas = document.createElement("canvas");
		resultCanvas.width = width;
		resultCanvas.height = height;
		var ctx = resultCanvas.getContext('2d');
		ctx.imageSmoothingEnabled= true;
		
		console.log('data.length (1)', data.length);

		for (var i = 0; i < data.length; i++) {
			console.log('data[i]', data[i]);

			var layer = this.findLayer(data[i].name);
			if( layer ){
				var rgb = this.hexToRgb( data[i].color );
				console.log('rgb',  rgb );
				var img = this.tint(layer.image, rgb.red, rgb.green, rgb.blue );

				ctx.drawImage(img, 0, 0, width, height);
			} else {
				console.log('layer ' + data[i].name + ' not found');
			}

		}

		var image = new Image();
		image.src = resultCanvas.toDataURL("image/png");
		return image;
	}

	this.hexToRgb = function (hex) {
		if( hex.startsWith("#")){
			hex = hex.substring(1);
		}

    	var bigint = parseInt(hex, 16);
    	var _r = (bigint >> 16) & 255;
    	var _g = (bigint >> 8) & 255;
    	var _b = bigint & 255;
    	return {red:_r, green:_g, blue:_b};
	}

	this.tint = function(img, red, green, blue){
		var foo = document.createElement("canvas");
		foo.width = img.width;
		foo.height = img.height;
		var ctx = foo.getContext('2d');
		ctx.imageSmoothingEnabled= true;
		ctx.drawImage(img, 0, 0);

		var imageData = ctx.getImageData(0, 0, img.width, img.height);
		var data = imageData.data;

		var l = data.length;
		var counter = 0;
		for (var i=0; i<l; i+=4) {
			data[i] = data[i] + red;
			data[i+1] = data[i+1] + green;
			data[i+2] = data[i+2] + blue;
		}

		ctx.putImageData(imageData, 0, 0);

		var image = new Image();
		image.src = foo.toDataURL("image/png");
		return image;
 	}



}