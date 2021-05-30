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
            image(this.img, this.x, this.y+100-h, w, h);
            
        }
    }

    displayBlack(isBlackOwned) {
        this.display();
        // noFill();
        // stroke(col);

        if (!isBlackOwned) {
            stroke(0);
            strokeWeight(3);
            // let c = color(red(col), blue(col), green(col), 50);
            fill(255);
            const w = this.factor  * this.img.width;
            // const h = this.factor * this.img.height;
            rect(this.x+w*.1, this.y, w*.8, 50);
    
            noStroke();
            fill(0);
            textSize(18);
            const x = this.x + w/2 - textWidth("white owned")/2 ;
            text("white owned", x, this.y+30);
        }
       
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