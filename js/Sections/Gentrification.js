class Gentrification extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

    displayScene() {
        drawBK();
        
        push();
  
        
        let y  = constrain(map(this.per , 0, .3,  0, 800), 0, 500);
        if (this.per >  .8) {
            y = map(this.per, .8, 1, 500, 0);
        }
        translate(0, -y);

        displayTraffic(1, 3500);

        translate(0, 800);
        let gent = constrain(map(this.per, .3, .6, 0, 1), 0, 1);
        houses.displayGentrification(gent);
        translate(0, 300);
        houses.displayGentrification(gent);

        pop();

    }

    // update(scrollPer) {
    //     super.update(scrollPer);
    //     // highway.updateTraffic(2000);
    // }
}