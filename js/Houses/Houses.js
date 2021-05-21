class Houses {


    constructor() {
        const houseImgs =  [];
        houseImgs[0] = loadImage("assets/house1.png");
        this.houses = loadImage("assets/houses.png");
        const numAcross = 15;
        this.housesAbove = [];
        this.housesBelow = [];
        for (let i = 0; i < numAcross; i++) {
            // this.housesAbove[i] = new House(i * 100 - 100, 0, .3, houseImgs[0]);

            if (i === 7 || i === 10) {
                 //[i + numAcross]
                this.housesAbove[i] = new HouseDetail(i * 100 - 100, 50, .4, houseImgs[0], "some info here");
            }
            else {
                //[i + numAcross]
                this.housesAbove[i] = new House(i * 100 - 100, 50, .4, houseImgs[0]);
            }
        }

        for (let i = 0; i < numAcross; i++) {
            if (i === 4 || i === 9) {
                this.housesBelow[i] = new HouseDetail(i * 140 - 200, 0, .6, houseImgs[0], "some info goes here");
            }
            else {
                this.housesBelow[i] = new House(i * 140 - 200, 0, .6, houseImgs[0]);
            }
            // this.housesBelow[i + numAcross] = new House(i * 140 - 200, 100, .8, houseImgs[0]);
        }

        this.indices = [];
        for (let i = 0; i < this.housesAbove.length; i++) this.indices[i] = i;
        this.shuffleArray(this.indices);
    }

    displayAbove() {
        let len = this.housesAbove.length; 
        let numHouses = map(housePercentage, 0, 1, len*.3, len);
        for (let i = 0; i < numHouses; i++) {
            this.housesAbove[this.indices[i]].display();
        }
    //    image(this.houses, 100, 0, this.houses.width*.35, this.houses.height*.35);
    }

    displayBelow() {
        let len = this.housesBelow.length; 
        let numHouses = map(housePercentage, 0, 1, len*.3, len);
        for (let i = 0; i < numHouses; i++) {
            this.housesBelow[this.indices[i]].display();
        }
    }

    displayGentrification(per) {
        const len = this.housesBelow.length;
        let numHouses = floor(map(per, 0, 1, len*.85, len*.15));
       
        for (let i = 0; i < numHouses; i++) {
            this.housesBelow[this.indices[i]].displayColor(color(255, 0, 255));
        }
        for  (let i = numHouses; i < this.housesBelow.length; i++) {
            this.housesBelow[this.indices[i]].displayColor(color(0, 255, 0));
        }
        // translate(0, 100);
        // this.housesBelow
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}