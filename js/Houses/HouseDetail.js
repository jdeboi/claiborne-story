class HouseDetail extends House {

    constructor(x, y, factor, img, des) {
        super(x, y, factor, img);

        this.div = createDiv(des);
        this.div.class("infoBox hidden");
    }

    display() {
        super.display();
        
        if (this.mouseOver()) {
            noFill();
            stroke(255, 0, 255);
            rect(this.x, this.y, this.w, this.h);
            this.div.class("infoBox")
        }
        else {
            this.div.class("infoBox hidden")
        }
    }
}