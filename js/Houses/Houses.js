class Houses {


    constructor() {
        const houseImgs =  [];
        houseImgs[0] = loadImage("assets/houses/House_3.png");
        houseImgs[1] = loadImage("assets/houses/House_2.png");
        houseImgs[2] = loadImage("assets/houses/building.png");
        houseImgs[3] = loadImage("assets/houses/building1.png");
        this.houses = loadImage("assets/houses/House_2.png");
        const numAcross = 15;
        this.housesAbove = [];
        this.housesBelow = [];
        let r = 0;
        for (let i = 0; i < numAcross; i++) {
            // this.housesAbove[i] = new House(i * 100 - 100, 0, .3, houseImgs[0]);
            let factor = .4;
            let w = 170;
            // if (i === 7 || i === 10) {
            //      //[i + numAcross]
            //     this.housesAbove[i] = new HouseDetail(i * w - w, 50, factor, houseImgs[0], "some info here");
            // }
            // else {
            //     //[i + numAcross]
            //     let r = floor(random(4));
            //     this.housesAbove[i] = new House(i * w - w, 50, factor, houseImgs[r]);
            // }
            r += floor(random(3));
            let h = houseImgs[i%4];
            this.housesAbove[i] = new House(i * w - w, 50, factor, h);
        }

        for (let i = 0; i < numAcross; i++) {
            let factor = .6;
            let w = 250;
            // if (i === 4 || i === 9) {
            //     this.housesBelow[i] = new HouseDetail(i * w - w, 0, factor, houseImgs[1], "some info goes here");
            // }
            // else {
            //     let r = floor(random(4));
            //     this.housesBelow[i] = new House(i * w - w, 0, factor, houseImgs[r]);
            // }
            // this.housesBelow[i + numAcross] = new House(i * 140 - 200, 100, .8, houseImgs[0]);
            r += floor(random(3));
            this.housesBelow[i] = new House(i * w - w, 50, factor, houseImgs[i%4]);
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
        let numHouses = floor(map(per, 0, 1, len*.85, len*.3));
       
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