class Section {
    static counter = 0;

    static increaseId() {
        this.counter += 1;
    }

    constructor(title, txt, startYear, endYear, id, spacing) {

        this.title = title;
        this.txt = txt;
        this.startYear = startYear;
        this.endYear = endYear;
        this.id = id;

        this.start = this.id * spacing;
        this.end = (this.id + 1) * spacing;

        this.isVisible = false;

        this.per = 0;
        this.h = 250;
        this.y = height + this.h + 10;
        this.w = width - 200;


        this.dots = [];
        for (let i = 0; i < 150; i++) {
            this.dots[i] = { x: random(width), y: random(height), r: random(5, 20) };
        }

    }



    display() {
        // if (this.isVisible) {
        this.displayScene();
        this.displayText();
        // this.displayDate();
        // }  
    }

    checkClick() { }


    checkDrag() {

    }

    displayScene() {
        // background(backgroundCol);
        drawBK();

        displayTraffic(1, 3500);


    }

    displayText() {
        push();
        translate(50, this.y);
        // fill(0);
        // stroke(255);
        // rect(0, 0, 400, 100, 10);
        // fill(255);
        // textSize(20);
        // text(this.title, 10, 10, this.w - 20, 20);
        // textSize(14);
        // text(this.txt, 10, 40, this.w - 20, this.h - 60);

        // translate(50, height - 250);
        stroke(255);
        strokeWeight(3);
        fill(0, 210);
        rect(0, 0, this.w, this.h, 30);

        const buffer = 35;
        translate(buffer, buffer);
        noStroke();
        fill(255);
        textFont(fontText);
        textSize(50);
        text(this.title, 0, 35); //, this.w - buffer*2, this.h-2*buffer


        fill(235);
        noStroke();
        textSize(24);
        text(this.txt, 0, 60, this.w - 2*buffer, this.h - 2*buffer);


        textFont(font);
        pop();
    }

    displayDate() {
        fill(255);
        stroke(255);
        textSize(40);
        text(this.getYear(scrollPos), 100, 100);
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
                this.y = map(this.per, 0, .3, height + 100, height / 2 - this.h / 2);
            }
            else if (this.per < .6) {
                this.y = height / 2 - this.h / 2;
            }
            else {
                this.y = map(this.per, .6, 1, height / 2 - this.h / 2, -this.h - 10);
            }
        }
        else {
            this.isVisible = false;

        }
    }

    displayPollution(alpha) {

        fill(0, alpha);
        noStroke();

        for (const dot of this.dots) {
            ellipse(dot.x, dot.y, dot.r);
            dot.x += random(-2, 2);
            dot.y += random(-2, 2);
        }
    }
}