class CarSmall {

    constructor() {

        this.started = false;
        this.dir = random([-1, 1]);
        this.setXY();
        this.lane = random([0, 1]);
        this.speed = 1;
    }

    setXY() {
        if (this.dir > 0) {
            let start = 555;
            this.x = random([start, start+20]);
            this.y = 1200;
            
        }
        else {
            let start = 1520;
            this.x = random([start, start+20]);
            this.y = -10;
        }
    }

    move() {
        if (this.started) {
            if (this.dir > 0) {
                this.x += .76;
                this.y--;
                if (this.y < -10) {
                    this.setXY();
                }
                // this.moveUp();
            }
            else {
                this.x -= .76;
                this.y++;
                if (this.y > 2000) {
                    this.setXY();
                }
                // this.moveDown();
            }
            
        }

    }


    display(factor) {
        image(smallCarImg, this.x*factor, this.y*factor, smallCarImg.width * .5, smallCarImg.height * .5);
    }
}