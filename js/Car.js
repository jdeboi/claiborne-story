class Car {

    constructor(car, factor, y, goesRight) {
        if (goesRight)
            this.x = -340;
        else
            this.x = width;
        this.y = y;
        this.img = car;
        this.speed = random(2, 5);
        this.factor = factor;
        this.started = false;
        this.startTime = millis();
        this.goesRight = goesRight;
    }

    move(prevCar) {
        if (this.started) {
            if (this.goesRight)
                this.moveRight(prevCar);
            else
                this.moveLeft(prevCar);
        }
    }

    moveRight(prevCar) {

        this.x += this.speed;

        if (this.x > width) {
            this.started = false;
        }
        else if (prevCar.startTime < this.startTime) {
            if (prevCar.started && this.x + this.getW() > prevCar.x) {
                this.x = prevCar.x - this.getW();
            }
        }
    }

    moveLeft(prevCar) {
        this.x -= this.speed;
       
        if (this.x < 0 - this.getW()) {
            this.started = false;
        }
        else if (prevCar.startTime < this.startTime) {
            if (prevCar.started && this.x < prevCar.x + prevCar.getW()) {
                this.x = prevCar.x + prevCar.getW();
            }
        }
    }

    getW() {
        if (!this.img)
            return 0;
        return this.img.width * this.factor;
    }

    getH() {
        if (!this.img)
            return 0;
        return this.img.height * this.factor;
    }

    display() {
        if (this.img) {
            if (this.goesRight) {
                image(this.img, this.x, 120- this.getH(), this.getW(), this.getH());
            }
            else {
    
                push();
                translate(this.x, 120 - this.getH());
                scale(-1, 1);
                image(this.img, -this.getW(), 0, this.getW(), this.getH());
                pop();
            }
        }
    }

    start() {
        if (this.goesRight) {
            this.x = -this.getW() - 100;
        }
        else {
          
            this.x = width + this.getW();
        
        }

        this.started = true;
        this.startTime = millis();
    }
}