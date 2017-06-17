var score=0;
var draw;
var length=1;
var snake = [
	{x: 0,
	y: 0}
]

function startGame(){
	drawFood();
    score=0;
}

function drawSnake(speedX,speedY){
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#cccccc'; 
	for (var i = 0; i < length; i++) {
		ctx.fillRect(snake[i].x,snake[i].y,20,20);
	}
	
}

function drawFood(){
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#48cec1';
    var foodx = Math.floor(Math.random()*240)*2;
    var foody = Math.floor(Math.random()*240)*2;
    ctx.fillRect(foodx,foody,20,20);
}

function moveSnake(X,Y) {
	var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
	for (var i = 0; i < length; i++) {
		ctx.clearRect(snake[i].x,snake[i].y,20,20);
	}
	snake.unshift({x: snake[0].x+20*X, y: snake[0].y+20*Y});
	snake.pop();
	drawSnake();
}



$(function(){
	$('#start').on('click', function(){
		startGame();
		$(this).hide();
		var canvas = document.getElementById('canvas'); 
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(snake[0].x,snake[0].y,20,20);

	})
	
	document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(-1,0);},200);
            break;
        case 38:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(0,-1);}, 200);
            break;
        case 39:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(1,0);},200);
            break;
        case 40:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(0,1);},200);
            break;
    }
};
    
});