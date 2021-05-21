class Car {

    constructor(car, factor, y) {
        this.x = -340;
        this.y = y;
        this.img = car;
        this.speed = random(2, 5);
        this.factor = factor;
        this.started = false;
        this.startTime = millis();
    }

    move(prevCar) {
        if (this.started) {
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
        if (this.img)
            image(this.img, this.x, this.y, this.getW(), this.getH());
    }

    start() {
        this.started = true;
        this.x = -this.getW() - 100;
        this.startTime = millis();
    }
}