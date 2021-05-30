

class Timeline {

    constructor(numSections) {
        this.h = 500;
        
        this.numSections = numSections;
        this.numSelected = 0;
    }

    display() {
        this.x = width -100;
        this.y = (height - this.h)/2;
        
        let dy = this.h/(this.numSections);
        dy += 1;
        for (let  i = 0; i  < this.numSections; i++) {
            stroke(255);
            strokeWeight(3);
            noFill();
            ellipse(this.x, this.y + dy*i, 20);
            if (i === this.numSelected) {
                noStroke();
                fill(255);
                ellipse(this.x, this.y + dy*i, 12);
            }
        }
    }

    setSelected(num) {
       
        this.numSelected = num;
    }
}