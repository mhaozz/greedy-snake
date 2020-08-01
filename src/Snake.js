export default class Snake {
  body = [];
  direction = 2;
  directionLock = false;
  foodLocation = [];
  score = 0;

  constructor() {
    this.body = [[0, 0]];
    this.generateFood();
  }

  checkIfHitIntoBody = (location) => {
    const firstPart = location || this.body[0];

    return !this.body.every((bodyPart, index) => {
      if (index === 0) return true;
      return !ifPairEqual(bodyPart, firstPart);
    });
  };

  setDirection = (newDirection) => {
    if (this.directionLock) return;
    if (Math.abs(newDirection - this.direction) !== 2) {
      this.direction = newDirection;
      this.directionLock = true;
    }
  };

  getDirection = () => this.direction;

  setDirectionLock = (lock) => {
    this.directionLock = lock;
  };

  getDirectionLock = () => this.directionLock;

  setFoodLocation = (food) => {
    this.foodLocation = food;
  };

  getFoodLocation = () => this.foodLocation;

  getScore = () => this.score;

  updateBody(speedLevel) {
    let firstPart = this.body[0];
    switch (this.direction) {
      case 2: {
        firstPart = [firstPart[0] + 1, firstPart[1]];
        break;
      }
      case 3: {
        firstPart = [firstPart[0], firstPart[1] + 1];
        break;
      }
      case 4: {
        firstPart = [firstPart[0] - 1, firstPart[1]];
        break;
      }
      case 1: {
        firstPart = [firstPart[0], firstPart[1] - 1];
        break;
      }
      default:
        break;
    }
    if (
      firstPart[0] < 0 ||
      firstPart[0] > 29 ||
      firstPart[1] < 0 ||
      firstPart[1] > 29 ||
      this.checkIfHitIntoBody()
    ) {
      throw new Error("您失败了");
    }
    if (ifPairEqual(firstPart, this.foodLocation)) {
      this.generateFood();
      this.score = this.score + speedLevel;
    } else {
      this.body.pop();
    }
    this.body.unshift(firstPart);
  }

  generateFood() {
    const x = Math.floor(Math.random() * 30); // 0 - 29随机数
    const y = Math.floor(Math.random() * 30);
    if (this.checkIfHitIntoBody([x, y])) {
      this.generateFood();
    }
    this.setFoodLocation([x, y]);
  }
}

function ifPairEqual(pair1, pair2) {
  return pair1[0] === pair2[0] && pair1[1] === pair2[1];
}
