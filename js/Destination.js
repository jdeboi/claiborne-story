class Destination {


    constructor(x, y, date, desc, imgPath) {
        this.x = x;
        this.y = y;
        this.date = date;
        this.desc = desc;
        this.img = loadImage(imgPath);
        this.showImage = false;
    }

    display(dx, dy, factor) {
        push();
        translate(dx + this.x* factor, dy + this.y*factor);
        image(camera, 0, 0, camera.width*.15, camera.height*.15);
      
        // noStroke();
        // fill(255);
        // text(floor(dx + this.x* factor) + " " + floor(dy + this.y* factor), 0, 0);
        pop();



        this.update(dx + this.x* factor + 15, dy + this.y*factor + 15);
    }

    displayImage() {
        if (this.showImage) {
            const w = 400;
            const ratio = w/this.img.width;
            const h = this.img.height*ratio;
            const x = width/2 - w/2;
            const y = height/2 - h/2;
            const buffer = 10;
            noStroke();
            fill(255);
            rect(x - buffer, y - buffer, w + 2*buffer, h + 2*buffer + 100);
            image(this.img, x, y, w, h);

            noStroke();
            fill(0);
            

            push();
           
            translate(0, y +  h + 30);
            textSize(30);
            text(this.date, x, 0);
            textSize(20);
            text(this.desc, x, 10, w  - 2*buffer, 100);
            pop();
        }
    }

    update(x, y) {
        if (mouseOverCircle(x, y, 30)) {
            if (!this.showImage) {
                this.showImage = true;
                // callback();
            }
        }
        else {
            if (this.showImage) {
                this.showImage = false;
                // callback();
            }
        }

    }

   
}

function  mouseOverCircle(x, y, r) {
    if (!x || !y)
        return false;

    let d = dist(x, y, mouseX, mouseY);
    return d < r;
}