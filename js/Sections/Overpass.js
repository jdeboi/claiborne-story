class Overpass extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

    displayScene() {
        push();
        translate(0, 100);
        houses.displayAbove();

        translate(0, 200);

        if (this.per < .2) {
            // let val = map(this.per, 0, .2, 255, 0);
            // fill(backgroundCol, val);
            // noStroke();
            // rect(0, -100, width, 400);
            highway.display(map(this.per, 0, .2, 0, 1));
        }
        else {
            highway.display(1);
        }

        translate(0, 200);
        houses.displayBelow();
        pop();
    }

    // update(scrollPer) {
    //     super.update(scrollPer);
    //     // highway.updateTraffic(2000);
    // }
}