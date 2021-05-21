

class Beginning extends Section {


    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);
        this.treeImg = loadImage("assets/tree1.png");
    }

    displayScene() { push();
       
        push();
        translate(0, 100);  
        houses.displayAbove();
       
        translate(0, 200);
        
        if (this.per > .8) {
            // let val = map(this.per, .8, 1, 0, 255);
            // fill(backgroundCol, val);
            // noStroke();
            // rect(0, 0, width, this.treeImg.height * .3);

            let numTrees = map(this.per, .8, 1, 1, 0);
            this.displayTrees(numTrees);
        }
        else {
            this.displayTrees(1);
        }

        translate(0, 200);
        houses.displayBelow();
        pop();
    }

    displayTrees(per) {
        let numTrees = floor(map(per, 0, 1, 0, 10));
        for (let i = 0; i < numTrees ; i++) {
            image(this.treeImg, (9-i) * 200, 0, this.treeImg.width * .3, this.treeImg.height * .3);
        }

      
    }
}