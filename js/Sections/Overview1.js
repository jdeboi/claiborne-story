

class Overview1 extends Section {


    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

    display() {
        this.displayScene();
    }

    displayScene() {
        if (this.per < .3) {
            push();
            // const { w, h, x, y, factor } = getCoverBackground(bkImg, 1);
            let zoom0 = map(this.per, 0, .3, 2, .5 * .7);
            let zoom1 = map(this.per, 0, .3, 8, 2 * .7);

            var { w, h, x, y, factor } = getCoverBackground(bkBig, zoom1);
            let dx = map(this.per, 0, .3, 0, 300);
            let dy = map(this.per, 0, .3, 0, -300);
            translate(dx * factor, dy * factor);


            push();
            translate(-326 * factor, 280 * factor);
            this.displayAtZoom2(zoom1);
            pop();


            this.displayAtZoom(zoom0);
            pop();

            if (pastOn) {
                displayDestinations(x + dx * factor, y + dy * factor, factor);
                displayDestinationImage();
            }

        }
        else if (this.per < .6) {
            // this.displayAtZoom(1);
            // displayDestinations();
            push();

            let start = .3;
            let end = .6;

            let zoom0 = map(this.per, start, end, .5 * .7, 1);
            let zoom1 = map(this.per, start, end, 2 * .7, 4);
            const { w, h, x, y, factor } = getCoverBackground(bkBig, zoom1);

            let dx = map(this.per, start, end, 300, 500);
            let dy = map(this.per, start, end, -300, -620);
            translate(dx * factor, dy * factor);


            push();
            translate(-326 * factor, 280 * factor);
            this.displayAtZoom2(zoom1);
            pop();

            this.displayAtZoom(zoom0);
            pop();

            if (pastOn) {
                displayDestinations(x + dx * factor, y + dy * factor, factor);
                displayDestinationImage();
            }
          

        }
        else if (this.per < .8) {
            // this.zoomIn();
            push();
            // const { w, h, x, y, factor } = getCoverBackground(bkImg, 1);
            let zoom0 = 1;
            let zoom1 = 4;

            var { w, h, x, y, factor } = getCoverBackground(bkBig, zoom1);
            let dx = 500;
            let dy = -620;
            translate(dx * factor, dy * factor);


            push();
            translate(-326 * factor, 280 * factor);
            this.displayAtZoom2(zoom1);
            pop();


            this.displayAtZoom(zoom0);
            pop();

            if (pastOn) {
                displayDestinations(x + dx * factor, y + dy * factor, factor);
                displayDestinationImage();
            }
            document.getElementById("pastButton").style.display = "block";

        }
        else {
            noStroke();
            let alpha = map(this.per, .8, 1, 0, 255);
            fill(0, alpha);
            rect(0, 0, width, height);
            document.getElementById("pastButton").style.display = "none";
        }


    }

    displayMap() {
        
    }

    riseUp() {
        let zoom = 1;
        const { w, h, x, y, factor } = getCoverBackground(bkImg, 1);
        let yOver = map(this.per, 0, .3, height, 0);

        push();
        translate(x, y);
        image(bkImg, 0, 0, w, h);

        displaySmallCars(factor);
        image(bkImgOverpass, 830 * factor, 680 * factor, bkImgOverpass.width * factor, bkImgOverpass.height * factor);

        push();
        translate(0, yOver);
        if (pastOn)
            image(overviews[0], 680 * factor, 430 * factor, overviews[0].width * factor, overviews[0].height * factor);
        pop();

        pop();
    }

    zoomIn() {
        let zoom = map(this.per, .5, .8, 1, 2);
        this.displayAtZoom(zoom);
    }



    displayAtZoom2(zoom) {
        const { w, h, x, y, factor } = getCoverBackground(bkImg, zoom);
        push();
        translate(x, y);
        image(bkBig, 0, 0, w, h);

        pop();
    }

    displayAtZoom(zoom) {
        const { w, h, x, y, factor } = getCoverBackground(bkImg, zoom);
        push();
        translate(x, y);
        image(bkImg, 0, 0, w, h);

        displaySmallCars(factor);
        image(bkImgOverpass, 830 * factor, 680 * factor, bkImgOverpass.width * factor, bkImgOverpass.height * factor);

        if (pastOn) {
            image(overviews[0], 680 * factor, 430 * factor, overviews[0].width * factor, overviews[0].height * factor);
            image(overviews[1], -1550 * factor, 2370 * factor, overviews[1].width * factor, overviews[1].height * factor);
        }

        pop();



    }

}