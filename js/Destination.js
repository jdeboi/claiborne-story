class Destination {


    constructor(x, y, imgPath) {
        this.x = x;
        this.y = y;
        this.img = loadImage(imgPath);
        this.showImage = false;
    }

    display(factor) {
        push();
        translate(this.x* factor, this.y*factor);
        image(camera, 0, 0, camera.width*.1, camera.height*.1);
        if (this.showImage) {
            const ratio = 400/this.img.width;
            // image(this.img, this.x, this.y, 400, this.img.height*ratio);
        }
        pop();
    }

    update(factor, callback) {
       
        if (this.mouseOver(this.x, this.y, factor)) {
            if (!this.showImage) {
                this.showImage = true;
                callback();
            }
        }
        else {
            if (this.showImage) {
                this.showImage = false;
                callback();
            }
        }

    }

    mouseOver(x, y, factor) {
        if (!x || !y)
            return false;

        let d = dist(x, y, mouseX, mouseY);
        return d < 5;
    }
}