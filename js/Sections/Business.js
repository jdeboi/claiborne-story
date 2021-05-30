class Business extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

    displayScene() {
        // background(backgroundCol);
        drawBK();
        
        if (this.per >= .4) {
            housePercentage = map(this.per, .4, 1, 1, 0);
        } 
        else {
            housePercentage = 1;
        }
       
        displayTraffic(1, 3500);


    }

    // update(scrollPer) {
    //     super.update(scrollPer);
    //     // highway.updateTraffic(2000);
    // }
}