var scoreHTML = document.getElementById("score")
var canvas = document.getElementById("canvas")
    canvas.width = 600
    canvas.height = 600
var ctx = canvas.getContext("2d")
var direction = "right"
var changingDirection = false
var score = 0
var snake = [
    { x: 90, y: 250 },
    { x: 80, y: 250 },
    { x: 70, y: 250 },
]
var snakeHead = [snake[0].x, snake[0].y]

var foodPosition = [250, 250]

var oldkey
var keyPress

function clearCanvas() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "yellow"
    snake.forEach(drawEachPartSnake)

}

function drawEachPartSnake(snakePart) {
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function drawFood() {
    if ((foodPosition[0] % 10 != 0 && foodPosition[1] % 10 != 0)) {
        foodPosition[0] = Math.round((Math.random() * (canvas.width-10)) / 10) * 10;
        foodPosition[1] = Math.round((Math.random() * (canvas.height-10)) / 10) * 10;
    }

    checkSpaceFood()
    ctx.fillStyle = "red"
    ctx.fillRect(foodPosition[0], foodPosition[1], 10, 10)
}

function checkSpaceFood() {
    for (let i = 1; i < snake.length; i++) {
        if (foodPosition[0] == snake[i].x && foodPosition[1] == snake[i].y) {
            foodPosition[0] = -1
            foodPosition[1] = -1
            drawFood()
        }
    }
}

function moveSnake(direction) {

    if (direction == "up") {
        snakeHead[1] -= 10
    }
    else if (direction == "left") {
        snakeHead[0] -= 10
    }
    else if (direction == "down") {
        snakeHead[1] += 10
    }
    else if (direction == "right") {
        snakeHead[0] += 10
    }
    snake.pop(snakeHead)
    snake.unshift({ x: snakeHead[0], y: snakeHead[1] })
    changingDirection = false

}

function checkCollisionBorder() {
    if (snakeHead[0] == canvas.width || snakeHead[1] == canvas.height || snakeHead[0] < 0 || snakeHead[1] < 0)
        gameOver()
}

function checkCollisionFood() {
    if (snakeHead[0] == foodPosition[0] && snakeHead[1] == foodPosition[1]) {
        snake.push(snakeHead)
        score++
        scoreHTML.innerHTML = `Score: ${score}`
    }
}

function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snakeHead[0] == snake[i].x && snakeHead[1] == snake[i].y) {
            gameOver();
        }
    }
}

const game = setInterval(() => {
    clearCanvas()

    moveSnake(direction)
    drawSnake()
    drawFood()

    checkSelfCollision()
    checkCollisionBorder()
    checkCollisionFood()
}, 70)

function gameOver() {
    
    resetGame()
    ctx.font = "normal 26px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
}

function resetGame() {
    snake = [
        { x: 90, y: 250 },
        { x: 80, y: 250 },
        { x: 70, y: 250 },
    ]
    snakeHead = [snake[0].x, snake[0].y]
    foodPosition = [250, 250]
    direction = "right"
    score = 0
    scoreHTML.innerHTML = "Score: 0"
    keyPress = ''
}

document.querySelector("body").addEventListener("keydown", (event) => {
    oldkey = keyPress
    keyPress = event.key

    if (!changingDirection && keyPress != oldkey) {
        changingDirection = true

        if (direction != "down" && (keyPress == 'w' || keyPress == "ArrowUp")) {
            direction = "up"
        }
        else if (direction != "right" && (keyPress == 'a' || keyPress == "ArrowLeft")) {
            direction = "left"
        }
        else if (direction != "up" && (keyPress == 's' || keyPress == "ArrowDown")) {
            direction = "down"
        }
        else if (direction != "left" && (keyPress == 'd' || keyPress == "ArrowRight")) {
            direction = "right"
        }
    }
})