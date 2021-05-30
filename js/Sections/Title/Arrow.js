class Arrow {

    constructor(x, y, w, h) {
        this.tri = 16;
        this.x = x;
        this.y = y;

        // this.h = 40;
        // this.w = width - this.x - this.tri * 3;
        this.isVertical = false;

        if (this.isVertical) {
            this.w = h;
            this.h = w - 3 * this.tri;
        }
        else {
            this.w = w - 3 * this.tri;
            this.h = h;
        }


        this.tractorX = this.x;
        this.tractorY = this.y - 20;
        this.tractor = loadImage("assets/cars/sports2.png");
        this.tractor2 = loadImage("assets/cars/sports.png");

    }

    updateTractor(dx, dy) {
        const tracX = dx + this.tractorX;
        const tracY = this.tractorY + dy;
        const tracW = this.tractor.width * .3;
        const tracH = this.tractor.height * .3;
        if (overRect(tracX, tracY, tracW, tracH)) {
            this.tractorX = constrain(mouseX - tracW / 2, this.x, this.x + this.w);
        }
        if (this.tractorX > width - 100) {
            hasStarted = true;
        }
    }

    display(dx, dy) {
        push();
        translate(this.x, this.y);

        noStroke();
        this.isOver(dx, dy) ? fill(150) : fill(255);

        rect(0, 0, this.w, this.h);
        this.displayLines();

        noStroke();
        textSize(20);
        this.isOver(dx, dy) ? fill(150) : fill(200);
        text("start", this.w + 50, 20);

        pop();

        const { x1, x2, x3, y1, y2, y3 } = this.getTriangle(0, 0);
        this.isOver(dx, dy) ? fill(150) : fill(255);
        triangle(x1, y1, x2, y2, x3, y3);



        // if (this.isOver(dx, dy))
        //     image(this.tractor2, this.tractorX, this.tractorY, this.tractor.width * .3, this.tractor.height * .3);
        // else
        //     image(this.tractor, this.tractorX, this.tractorY, this.tractor.width * .3, this.tractor.height * .3);
    }

    displayLines() {
        if (this.isVertical)
            this.displayLinesV();
        else
            this.displayLinesH();
    }

    displayLinesV() {
        stroke(0);
        strokeWeight(3);
        const x = this.w / 2 - 1;
        for (let y = 8; y < this.h; y += 20) {
            line(x, y, x, y + 10);
        }
    }

    displayLinesH() {
        stroke(0);
        strokeWeight(3);
        const y = this.h / 2 - 1;
        for (let x = 8; x < this.w; x += 20) {
            line(x, y, x + 10, y);
        }
    }


    isOver(dx, dy) {
        if (overRect(this.x + dx, this.y + dy, this.w + 3 * this.tri, this.h))
            return true;
        return false;
        // return this.overTri(dx, dy);
    }

    getTriangle(dx, dy) {
        if (this.isVertical) {
            var x1 = this.x + dx - this.tri;
            var x2 = this.x + dx + this.w + this.tri;
            var x3 = this.x + dx + this.w / 2;

            var y1 = this.y + this.h - 3 + dy;
            var y2 = y1;
            var y3 = y1 + this.tri * 3;
        }
        else {
            var x1 = this.x + dx + this.w - 3;
            var x2 = x1 + this.tri * 3;
            var x3 = x1;

            var y1 = this.y + dy - this.tri;
            var y2 = this.y + this.h / 2 + dy;
            var y3 = this.y + dy + this.h + this.tri;
        }
        return { x1, x2, x3, y1, y2, y3 };
    }

    overTri(dx, dy) {
        const { x1, x2, x3, y1, y2, y3 } = this.getTriangle(dx, dy);
        return isInside(x1, y1, x2, y2, x3, y3, mouseX, mouseY)
    }





}

function area(x1, y1, x2, y2, x3, y3) {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

// https://www.geeksforgeeks.org/check-whether-a-given-point-lies-inside-a-triangle-or-not/
/* A function to check whether point P(x, y) lies inside the triangle formed
by A(x1, y1), B(x2, y2) and C(x3, y3) */
function isInside(x1, y1, x2, y2, x3, y3, x, y) {
    /* Calculate area of triangle ABC */
    let A = area(x1, y1, x2, y2, x3, y3);

    /* Calculate area of triangle PBC */
    let A1 = area(x, y, x2, y2, x3, y3);

    /* Calculate area of triangle PAC */
    let A2 = area(x1, y1, x, y, x3, y3);

    /* Calculate area of triangle PAB */
    let A3 = area(x1, y1, x2, y2, x, y);

    /* Check if sum of A1, A2 and A3 is same as A */
    return (A == A1 + A2 + A3);
}

function overRect(x, y, w, h) {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}
