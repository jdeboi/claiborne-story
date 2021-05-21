class Highway {

    constructor() {
        const carImgs = {};
        carImgs['truck'] = loadImage("assets/cars/truck.png");
        carImgs['sports'] = loadImage("assets/cars/sports.png");
        carImgs['sedan'] = loadImage("assets/cars/sedan.png");
        carImgs['delivery'] = loadImage("assets/cars/delivery.png");

        //////////////////////////
        // cars
        this.cars = {};
        this.cars.lastTrafficUpdate = 0;
        this.cars.lane0 = [];
        this.cars.lane1 = [];
        this.cars.lane0Index = 0;
        this.cars.lane1Index = 0;
        const carVals = [{ type: "truck", factor: .4, y: 0 }, { type: "delivery", factor: .37, y: 0 }, { type: "sports", factor: .3, y: 60 }, { type: "sedan", factor: .3, y: 50 }]
        for (let i = 0; i < 20; i++) {
            const cv = random(carVals);
            this.cars.lane0[i] = new Car(carImgs[cv.type], cv.factor, cv.y);
            this.cars.lane1[i] = new Car(carImgs[cv.type], cv.factor, cv.y);
        }

        this.highway = [];
        this.highway[0] = loadImage("assets/bridgebottom.png");
        this.highway[1] = loadImage("assets/street.png");

    }

    display(per = 1) {
        const dx = map(per, 0, 1, -width, 0);
        push();
        translate(dx, 0);
        image(this.highway[1], 0, 0, this.highway[1].width * .5, this.highway[1].height * .5);
        pop();

        push();

        translate(0, -50);
        this.displayCars(this.cars.lane0);

        translate(0, 50);
        this.displayCars(this.cars.lane1);
        pop();

        push();
        translate(dx, 0);
        image(this.highway[0], 0, 100, this.highway[1].width * .5, this.highway[1].height * .5);
        pop();

    }

    updateTraffic(rate) {
        if (millis() - this.cars.lastTrafficUpdate > rate) {
            this.cars.lastTrafficUpdate = millis();
            this.startCar();
        }
    }


    startCar() {
        const lane = random([0, 1]);
        if (lane === 0) {
            let nextCar = this.cars.lane0[this.cars.lane0Index];
            if (!nextCar.started) {
                nextCar.start();
                this.cars.lane0Index++;
                this.cars.lane0Index %= this.cars.lane0.length;
            }
        }
        else {
            let nextCar = this.cars.lane1[this.cars.lane1Index]
            if (!nextCar.started) {
                nextCar.start();
                this.cars.lane1Index++;
                this.cars.lane1Index %= this.cars.lane1.length;
            }
        }
    }

    displayCars(cars) {

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
            let prevCar;
            if (i > 0) {
                prevCar = cars[i - 1];
            }
            else {
                prevCar = cars[cars.length - 1];
            }
            car.display();
            car.move(prevCar);
        }
    }
}