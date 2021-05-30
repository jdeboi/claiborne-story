

class Overview0 extends Section {


    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
        this.arrow = loadImage("assets/downarrow.png");
    }

    display() {
        this.displayScene();
    }

    displayScene() {
        if (this.per < .2) {
            document.getElementById("pastButton").style.display = "none";
            this.riseUp(0, .2);
            // image(this.arrow, width/2- 100, height - 100);
        }
        else if (this.per < .4) {
            document.getElementById("pastButton").style.display = "block";
            this.displayAtZoom(1);
        }
        else if (this.per < .7) {
            this.zoomIn(.4, .7);
        }
        else {
            this.displayAtZoom(2);
        }
    }

    riseUp(start, end) {
        let zoom = 1;
        const { w, h, x, y, factor } = getCoverBackground(bkImg, 1);
        let yOver = map(this.per, start, end, height, 0);

        push();
        translate(x, y);

        image(bkImg, 0, 0, w, h);

        displaySmallCars(factor);
        image(bkImgOverpass, 830 * factor, 680 * factor, bkImgOverpass.width * factor, bkImgOverpass.height * factor);

        translate(0, yOver);
        this.displayTextBox();
        if (pastOn)
            image(overviews[0], 680 * factor, 430 * factor, overviews[0].width * factor, overviews[0].height * factor);
        pop();
    }

    displayTextBox() {
        push();
        translate(0, -500);

        const x = (width - 100 - this.w)/2;
        translate(x, 0);

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
        text("Although a cacophonous concrete expressway (colloquially referred to as the 'Monster') currently cuts through Claiborne Avenue, the corridor was once a bustling economic and cultural hub for the Black community in New Orleans. An issue of racial justice, this story examines the history of the Claiborne Expressway and hopes to build a case for reparations.", 0, 60, this.w - buffer*2, this.h - 2*buffer);


        textFont(font);

        pop();
    }

    zoomIn(start, end) {
        let zoom = map(this.per, start, end, 1, 2);
        this.displayAtZoom(zoom);
    }


    displayAtZoom(zoom) {
        const { w, h, x, y, factor } = getCoverBackground(bkImg, zoom);
        push();
        translate(x, y);
        image(bkImg, 0, 0, w, h);

        displaySmallCars(factor);
        image(bkImgOverpass, 830 * factor, 680 * factor, bkImgOverpass.width * factor, bkImgOverpass.height * factor);

        if (pastOn)
            image(overviews[0], 680 * factor, 430 * factor, overviews[0].width * factor, overviews[0].height * factor);


        pop();
    }

}