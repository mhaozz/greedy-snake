import React, { useEffect, useState } from "react";
import Snake from "./Snake";

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;
const RECT_SIZE = 20;
const SPEED = [1, 2, 3, 4, 5, 6, 10, 15, 20];

function App() {
  const [snake, setSnake] = useState(new Snake());
  const [speedLevel, setSpeedLevel] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = document.getElementById("greedy");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0, 0, 0)";

    let counter = 0;
    const frame = 60 / SPEED[speedLevel];

    const handleFrame = function () {
      if (counter === frame) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        try {
          snake.updateBody(speedLevel + 1);
        } catch (error) {
          alert(error.message);
          cancelAnimationFrame(timer);
          return;
        }

        setScore(snake.getScore());

        drawSnake();
        snake.setDirectionLock(false);

        counter = 0;
      } else {
        counter += 1;
      }
      timer = requestAnimationFrame(handleFrame);
    };

    const handleKeyPress = (evt) => {
      switch (evt.keyCode) {
        case 37: {
          snake.setDirection(4);
          break;
        }
        case 38: {
          snake.setDirection(1);
          break;
        }
        case 39: {
          snake.setDirection(2);
          break;
        }
        case 40: {
          snake.setDirection(3);
          break;
        }
      }
    };

    const drawSnake = function () {
      ctx.fillStyle = "rgb(0, 0, 0)";
      for (const bodyPart of snake.body) {
        ctx.fillRect(
          bodyPart[0] * RECT_SIZE,
          bodyPart[1] * RECT_SIZE,
          RECT_SIZE,
          RECT_SIZE
        );
      }

      const foodLocation = snake.getFoodLocation();

      ctx.fillStyle = "rgb(255, 0, 0)";
      ctx.fillRect(
        foodLocation[0] * RECT_SIZE,
        foodLocation[1] * RECT_SIZE,
        RECT_SIZE,
        RECT_SIZE
      );
    };

    document.onkeydown = handleKeyPress;

    let timer = requestAnimationFrame(handleFrame);

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [speedLevel, snake]);

  const speedUp = () => {
    setSpeedLevel((pre) => {
      if (pre + 1 < SPEED.length) {
        return pre + 1;
      }
      return pre;
    });
  };

  const speedDown = () => {
    setSpeedLevel((pre) => {
      if (pre - 1 >= 0) {
        return pre - 1;
      }
      return pre;
    });
  };

  const resetGame = () => {
    setSnake(new Snake());
    setScore(0);
    setSpeedLevel(0);
  };

  return (
    <div className="App">
      <canvas
        id="greedy"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ outline: "1px solid green" }}
      ></canvas>
      <div id="button-area">
        <button onClick={speedUp}>speed up</button>
        <span style={{ padding: "0 5px" }}>{speedLevel + 1}</span>
        <button onClick={speedDown}>speed down</button>

        <button onClick={resetGame}>重置游戏</button>
      </div>
      <div id="score-area">
        <span>分数：</span>
        <span>{score}</span>
      </div>
    </div>
  );
}

export default App;
