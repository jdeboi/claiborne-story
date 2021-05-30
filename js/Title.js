

class Title extends Section {


    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);

        this.lastCar = 0;
        this.timeDiff = random(200, 2000);



        this.w = 800;
        this.x = (width - this.w) / 2;
        this.y = 200;
        this.spacing = 50;

        this.arrowX = this.x + this.w / 2 + this.spacing;
        this.arrow = new Arrow(this.arrowX, this.y + 120, this.w / 2 + 30, 30);

        this.monsterImages = new Frame(this.x, this.y, this.w / 2, this.w / 2);

        this.startButton = createButton('start');
        this.startButton.position(this.arrowX, 500);
        this.startButton.mousePressed(() => startAnimation());

        this.fadeStarted = false;
        this.fadeDirection = 1;
    }


    display() {
        this.displayScene();

        this.startSmallCar();
    }

    startSmallCar() {
        if (millis() - this.lastCar > this.timeDiff) {
            this.lastCar = millis();
            this.timeDiff = random(200, 2000);
            startNewSmallCar();
        }
    }

    displayScene() {
        if (this.isFading()) {
            this.fade();
        }
        else  {
            this.displayStart();
        }


    }

    startFade(dir) {
        this.fadeStarted = true;
        this.fadeDirection = dir;
    }

    fade() {
        if (this.fadeDirection === 1)
            this.displayFadeIn();
        else
            this.displayFadeOut();
    }

    isFading() {
        if (this.fadeStarted) {
            if (millis() - startTime > 2000) {
                hasStarted = true;
            }
            return true;
        } 
        return false;
    }

    displayFadeOut() {
        const dt = constrain(millis() - startTime, 0, 2000);
        const alpha = map(dt, 0, 2000, 0, 200);
        this.displayFade(dt, alpha, 1);
    }

    displayFadeIn() {
        const dt = constrain(millis() - startTime, 0, 2000);
        const alpha = map(dt, 0, 2000, 200, 0);
        this.displayFade(dt, alpha, -1);
    }

    displayFade(dt, alpha, dir) {
        this.displayMap();

        this.displayBlackRect(alpha);

        let dy = map(dt, 0, 2000, 0, -800);
        if (dir > 0)
            dy = map(dt, 0, 2000, -800, 0);

        push();
        translate(0, dy);
        this.monsterImages.display(0, this.getOscillation());
        this.displayMonsterText();
        this.arrow.display(0, this.getOscillation());

        this.startButton.position(this.arrowX, 500 + this.getOscillation() + dy);
        pop();
    }

    displayStart() {
        this.displayMap();

        this.displayBlackRect(200);

        push();
        translate(0, this.getOscillation());

        this.monsterImages.display(0, this.getOscillation());


        this.displayMonsterText();


        // this.displayBegin(0, this.getOscillation());
        this.arrow.display(0, this.getOscillation());

        pop();
        this.startButton.position(this.arrowX, 500 + this.getOscillation());
    }

    getOscillation() {
        return 5 * sin(millis() / 300);
    }

    checkClick() {
        if (this.arrow.isOver(0, this.getOscillation())) {
            document.getElementById("highwaySound").play();
        }
    }

    checkDrag() {
        this.arrow.updateTractor(0, this.getOscillation());
    }

    displayBegin(dx, dy) {
        push();
        translate(this.x + this.w / 2 + this.spacing, 550);
        stroke(255);
        strokeWeight(3);
        fill(0, 100);
        rect(0, 0, 240, 80, 30);

        textSize(30);
        strokeWeight(0);
        fill(155, 255, 0);
        text("begin", 70, 30);
        pop();
    }

    displayBlackRect(alpha) {
        noStroke();
        fill(0, alpha);
        rect(0, 0, width, height);
    }


    displayMonsterText() {
        push();
        translate(this.x + this.w / 2 + this.spacing, 240);

        strokeWeight(1);
        fill(255);
        stroke(255);

        const tBoxW = this.w - this.spacing;
        const title = "the monster";
        const fSz = tBoxW / title.length;
        textSize(fSz * .8);
        text(title, 0, 0, tBoxW, this.h);

        translate(0, 80);
        strokeWeight(5);
        // line(0, 0, textWidth(title), 0);

        translate(0, 60);
        textSize(fSz * .3);
        strokeWeight(1);
        text("an animated history of the", 0, 0, tBoxW, this.h);

        translate(0, 30);
        textSize(fSz * .4);
        text("Claiborne Overpass", 0, 0, tBoxW, this.h);
        translate(0, 30);
        text("1940-2021", 0, 0, tBoxW, this.h);

        pop();
    }

    displayOG() {

        if (this.per < .3) {
            this.displayTitle(map(this.per, 0, .3, 0, 1));
        }
        else if (this.per < .5) {
            this.displayTitle(1);
            this.displaySubtitle(map(this.per, .3, .5, 0, 1));
        }

        else if (this.per < .8) {
            this.displayTitle(1);
            this.displaySubtitle(1);
        }

        else {
            let dp = map(this.per, .8, 1, 1, 0);
            this.displayTitle(dp);
            this.displaySubtitle(dp);
        }
    }


    overTractor(x, y, w, h) {
        return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    }

    displayMap() {
        const { w, h, x, y, factor } = getCoverBackground(bkImg, 1);
        push();
        translate(x, y);
        image(bkImg, 0, 0, w, h);

        displaySmallCars(factor);
        image(bkImgOverpass, 830 * factor, 680 * factor, bkImgOverpass.width * factor, bkImgOverpass.height * factor);

        pop();
    }

    displaySubtitle(per) {
        stroke(255);
        fill(255);

        textSize(40);
        push();
        let dx = map(per, 0, 1, -300, 500);
        text("an animated history of the Claiborne overpass", dx, 500, 300, 400);
        // text("", dx, 580);
        pop();
    }

    displayTitle(per) {
        stroke(255);
        fill(255);
        textSize(140);
        let str0 = "the";
        let x0 = 100
        let dx0 = map(per, 0, 1, -textWidth(str0) - x0, 0);

        push();
        translate(dx0, 0);
        text(str0, x0, 180);
        pop();

        let str1 = "monster";
        let x1 = 100
        let dx1 = map(per, 0, 1, width - x1, 0);

        push();
        translate(dx1, 0);
        text(str1, x1, 300);
        pop();
    }

}

let startTime;
function startAnimation() {
    document.getElementById("highwaySound").play();
    startTime = millis();
    titleSection.startFade(1);
}

function startReverseAnimation() {
    startTime = millis();
    titleSection.startFade(-1);
    titleSection.fadeStarted = false;
}