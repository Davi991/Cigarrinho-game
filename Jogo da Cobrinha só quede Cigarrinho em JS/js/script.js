const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [{ x: 0, y: 0 },]

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30 ) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(0, 570),
    y: randomPosition(0, 570),
    color: "red"
}

let direction
let loopId

const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "grey"
        }

        if (index == snake.length - 2) {
            ctx.fillStyle = "rgb(217, 186, 100)"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if(direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if(direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if(direction == "up") {
        snake.push({ x: head.x, y: head.y - size})
    }

    if(direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }


    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#181717"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }


}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            let x = randomPosition()
            let y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = "red"
    }
}


const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()

    loopId = setTimeout(() => {
        gameLoop()
    }, 100)

}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }

})

