class Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        this.title = title;
        this.txt = txt;
        this.txt = txt;
        this.startYear = startYear;
        this.endYear = endYear;
        this.id = id;

        this.start = this.id * spacing;
        this.end = (this.id+1) * spacing;

        this.isVisible = false;

        this.per = 0;
        this.y = height + 100;
        this.w = 400;
        this.h = 100;

        this.dots = [];
        for (let i = 0; i < 50; i++) {
            this.dots[i] = { x: random(width), y: random(height), r: random(5, 20) };
        }
    }

    display() {
        // if (this.isVisible) {
            this.displayScene();
            this.displayText();
        // }  
    }

    displayScene() {
        push();
        translate(0, 100);  
        houses.displayAbove();
       
        translate(0, 200);
        highway.display();
        highway.updateTraffic(3500);

        translate(0, 200);
        houses.displayBelow();
        pop();
    }

    displayText() {
        push();
        translate(0, this.y);
        fill(0);
        stroke(255);
        rect(0, 0, 400, 100, 10);
        fill(255);
        textSize(20);
        text(this.title, 10, 10, this.w - 20, 20);
        textSize(14);
        text(this.txt, 10, 40, this.w - 20, this.h - 60);
        pop();
    }

    isSection(scrollPer) {
        return (scrollPer >= this.start && scrollPer < this.end);
    }

    getYear(scrollPer) {
        if (this.startYear === this.endYear)
        return this.startYear;
        return floor(map(scrollPer, this.start, this.end, this.startYear, this.endYear));
    }

    update(scrollPer) {
        if (scrollPer >= this.start && scrollPer < this.end) {
            this.isVisible = true;

            this.per = map(scrollPer, this.start, this.end, 0, 1);

            let y;
            if (this.per < .3) {
                this.y = map(this.per, 0, .3, height + 100, height / 2);
            }
            else if (this.per < .6) {
                this.y = height / 2;
            }
            else {
                this.y = map(this.per, .6, 1, height / 2, -400);
            }
        }
        else {
            this.isVisible = false;

        }
    }

    displayPollution() {
        let alpha = constrain(map(this.per, 0, .5, 0, 255), 0, 255);
        if (this.per > .8)
            alpha = map(this.per, .8, 1, 255, 0);
        fill(0, alpha);
        noStroke();

        for (const dot of this.dots) {
            ellipse(dot.x, dot.y, dot.r);
            dot.x += random(-2,2);
            dot.y += random(-2,2);
        }
    }
}