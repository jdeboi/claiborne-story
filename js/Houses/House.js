class House {

    constructor(x, y, factor, img) {
        this.x = x;
        this.y = y;
        this.factor = factor;
        this.isSelected = false;
        this.img = img;
      

    }

    display() {
        if (this.img) {
            const w = this.factor  * this.img.width;
            const h = this.factor * this.img.height;
            image(this.img, this.x, this.y, w, h);
            
        }
    }

    displayColor(col) {
        this.display();
        // noFill();
        // stroke(col);
        noStroke();
        let c = color(red(col), blue(col), green(col), 50);
        fill(c);
        const w = this.factor  * this.img.width;
        const h = this.factor * this.img.height;
        rect(this.x, this.y, w, h);
    }

    mouseOver() {
        if (this.overRect())
            return true;
        else if (this.overTri())
            return true;
        return false;
    }

    overTri() {
        return false;
    }

    overRect() {
        const w = this.factor  * this.img.width;
        const h = this.factor * this.img.height;
        const triH = 40;
        const yRect = this.y + triH;
        return mouseX > this.x && mouseX < this.x + w && mouseY > yRect && mouseY < h;
    }
}