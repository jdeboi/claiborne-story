class Traffic extends Section {

    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
    }

  
    displayScene() {
        // background(backgroundCol);
        drawBK();
        
        displayTraffic(1, 500);
    }

    
}

function displayTraffic(per, updateSpeed) {
    push();
    translate(0, 100);
    houses.displayAbove();

    translate(0, 150);
    highway1.display(per);
    highway1.updateTraffic(updateSpeed);
    translate(0, 100);
    highway2.display(per);
    highway2.updateTraffic(updateSpeed);

    translate(0, 250);
    houses.displayBelow();
    pop();
}