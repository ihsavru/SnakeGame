var score=0;
var draw;
var length=1;
var snake = [
	{x: 0,
	y: 0}
]
var foodx = 50,foody =50;
function startGame(){
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.clearRect(foodx,foody,20,20);
    clearInterval(draw);
	drawFood();
    score=0;
    snake = [
    {x: 0,
    y: 0}
   ]   ;
   length = 1;

}

function drawSnake(X,Y){
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
    foodx = Math.floor(Math.random()*24)*20;
    foody = Math.floor(Math.random()*24)*20;
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
    checkFood();
    drawSnake(X,Y);
}

function checkFood(){

        if(snake[0].x === foodx && snake[0].y === foody){
            if(length >= 2){
                var a = snake[length-1].x - snake[length-2].x;
                var b = snake[length-1].y - snake[length-2].y;
            }
            snake.push({x: snake[length-1].x+a, y: snake[length-1].y+b});
            length++;
            drawFood();
        }

        if(snake[0].x === 500 || snake[0].y === 500 || snake[0].x === -20 || snake[0].y === -20){
            alert("game over");
            startGame();
        }
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
            draw = setInterval(function(){moveSnake(-1,0);},100);
            break;
        case 38:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(0,-1);}, 100);
            break;
        case 39:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(1,0);},100);
            break;
        case 40:
            clearInterval(draw);
            draw = setInterval(function(){moveSnake(0,1);},100);
            break;
    }
};
    
});