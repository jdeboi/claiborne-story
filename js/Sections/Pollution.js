class Pollution extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
      
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

        this.displayPollution();
    }

    
}