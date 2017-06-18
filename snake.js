var score=0;
var draw;
var length=1;
var snake = [
	{x: 0,
	y: 0}
]
var foodx = 50,foody =50;
var key ='';
function startGame(){
    var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
    ctx.clearRect(foodx,foody,20,20);
    clearInterval(draw);
	drawFood();
    score=0;
    printScore();
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

    //checks if the food is created where the snake is and then recreates food
    for(var i=0;i<length;i++){
        if(snake[i].x === foodx && snake[i].y === foody)
            drawFood();
    }
    ctx.fillRect(foodx,foody,20,20);
}

function moveSnake(X,Y) {
	var canvas = document.getElementById('canvas'); 
    var ctx = canvas.getContext('2d');
	for (var i = 0; i < length; i++) {
		ctx.clearRect(snake[i].x,snake[i].y,20,20);
	}
    //adds a square object at the head of snake
	snake.unshift({x: snake[0].x+20*X, y: snake[0].y+20*Y});
    //removes the last object
	snake.pop();
    checkCollision();
    drawSnake(X,Y);
}

function checkCollision(){
         
        //checks if the snake collided with the food i.e score increases
        if(snake[0].x === foodx && snake[0].y === foody){
            if(length >= 2){
                var a = snake[length-1].x - snake[length-2].x;
                var b = snake[length-1].y - snake[length-2].y;
            }
            snake.push({x: snake[length-1].x+a, y: snake[length-1].y+b});
            length++;
            score++;
            printScore();
            drawFood();
        }
        
        //checks if the snake collided with the canvas border i.e game over
        if(snake[0].x === 500 || snake[0].y === 500 || snake[0].x === -20 || snake[0].y === -20){
            alert("game over");
            clearInterval(draw);
            startGame();
        }
        
        //check if the snake collided with itself i.e. game over
        for(var i=3;i<length;i++){
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                alert("game over");
                clearInterval(draw);
                startGame();
            }

        }
}

function printScore(){
        document.getElementById('score').innerHTML = score;
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
            if(key !== 'r'){
                clearInterval(draw);
                draw = setInterval(function(){moveSnake(-1,0);},100);
                key = 'l';
                
            }
            break;
        case 38:
            if(key!== 'd'){
                clearInterval(draw);
                draw = setInterval(function(){moveSnake(0,-1);}, 100);
                key = 'u';
            }
            break;
        case 39:
            if(key!== 'l'){
                clearInterval(draw);
                draw = setInterval(function(){moveSnake(1,0);},100);
                key = 'r';
            }
            break;
        case 40:
            if(key!== 'u'){
                clearInterval(draw);
                draw = setInterval(function(){moveSnake(0,1);},100);
                key = 'd';
            }
            break;
    }
};
    
});