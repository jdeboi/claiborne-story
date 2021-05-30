class Overpass extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

    displayScene() {
        // background(backgroundCol);
        drawBK();

       
        if (this.per < .2) {
       

            displayTraffic(map(this.per, 0, .2, 0, 1), 3500);

            highway1.noCars();
            highway2.noCars();
        }
        else {
            displayTraffic(1, 3500);

            highway1.goCars();
            highway2.goCars();
        }

      
    }

    // update(scrollPer) {
    //     super.update(scrollPer);
    //     // highway.updateTraffic(2000);
    // }
}