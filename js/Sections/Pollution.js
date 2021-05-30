class Pollution extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
      
    }

    displayScene() {
        // const col = map(this.per, 0, 1, backgroundCol, 0);
        // background(col);
        drawBK();
    
        displayTraffic(1, 3500);

        let alpha = constrain(map(this.per, 0, .8, 0, 255), 0, 255);
        if (this.per > .8)
            alpha = map(this.per, .8, 1, 255, 0);
        this.displayPollution(alpha);
    }

    
}