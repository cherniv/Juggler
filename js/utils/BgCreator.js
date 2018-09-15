function randomColor () {
	// FFFFFF = 16777215
	return '#'+Math.floor(3355443 + Math.random()*13421772).toString(16);
}

var h = 4;
var w = 800;
var cols = 1;
var rows = 200;

document.querySelector('canvas') && document.querySelector('canvas').remove()
var c = document.createElement('canvas');
c.width = (cols * w);
c.height = (rows * h);
document.body.appendChild(c);

var ctx=c.getContext("2d");

for (var y=0; y<rows; y++) {
	for (var x=0; x<cols; x++) {
		ctx.fillStyle=randomColor();
		ctx.fillRect(x * w, y * h, w, h);
	}
}

var a = document.createElement('a'); 
a.href = c.toDataURL() // png is much smaller! //('image/jpeg');
document.body.appendChild(a);