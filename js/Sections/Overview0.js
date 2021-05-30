

class Overview0 extends Section {


    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
        this.arrow =  loadImage("assets/downarrow.png");
    }

    display() {
        this.displayScene();
    }

    displayScene() {
        if (this.per < .2) {
            this.riseUp();
            // image(this.arrow, width/2- 100, height - 100);
        }
        else if (this.per < .4) {
            this.displayAtZoom(1);
        }
        else if (this.per < .7) {
            this.zoomIn(.4, .7);
        }
        else {
            this.displayAtZoom(2);
        }
    }

    riseUp() {
        let zoom = 1;
        const { w, h, x, y, factor } = getCoverBackground(bkImg, 1);
        let yOver = map(this.per, 0, .3, height, 0);

        push();
        translate(x, y);
        image(bkImg, 0, 0, w, h);

        displaySmallCars(factor);
        image(bkImgOverpass, 830*factor, 680*factor, bkImgOverpass.width*factor, bkImgOverpass.height*factor);
       
        translate(0, yOver);
        image(overviews[0],  680 * factor, 430 * factor, overviews[0].width * factor, overviews[0].height * factor);
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
        image(bkImgOverpass, 830*factor, 680*factor, bkImgOverpass.width*factor, bkImgOverpass.height*factor);
       
        image(overviews[0], 680 * factor, 430 * factor, overviews[0].width * factor, overviews[0].height * factor);
       
       
        pop();
    }

}