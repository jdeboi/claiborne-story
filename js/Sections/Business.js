class Business extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

    displayScene() {
        push();
        translate(0, 100); 
        if (this.per >= .4) {
            housePercentage = map(this.per, .4, 1, 1, 0);
            houses.displayAbove();
        } 
        else {
            housePercentage = 1;
            houses.displayAbove();
        }
       
        translate(0, 200);
        highway.display();
        highway.updateTraffic(3500);

        translate(0, 200);
        houses.displayBelow();
        pop();

    }

    // update(scrollPer) {
    //     super.update(scrollPer);
    //     // highway.updateTraffic(2000);
    // }
}