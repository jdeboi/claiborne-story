class Frame {


    constructor(x, y, w, h, rot) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rot = rot;

        this.monsters = [];
        this.monsters[0] = loadImage("assets/monster.png");
        this.monsters[1] = loadImage("assets/frames/trees.png");
        this.monsters[2] = loadImage("assets/frames/ursuline.png");

        this.currentMonster = 0;

        this.imgs = [
            { r: 0, x: 0, y: 0 },
            { r: -20, x: -100, y: -40 }, //
            { r: 40, x: 100, y: 40 }, // 

        ]
    }

    display(dx, dy) {
        push();
        translate(this.x, this.y);
        for (let i = 0; i < 3; i++) {
            const { r, x, y } = this.imgs[i];
            push();
            translate(x, y);
            rotate(radians(r));
            image(this.monsters[i], 0, 0, this.w, this.w);
            pop();
        }
        this.displayTop();
        this.setCurrent(dx, dy);
        pop();
    }

    displayTop() {
        const { x, y, r } = this.imgs[this.currentMonster];
        push();
        translate(x, y);
        rotate(radians(r));
        image(this.monsters[this.currentMonster], 0, 0, this.w, this.w);
        pop();
    }

    setCurrent(dx, dy) {
        for (let i = 0; i < 3; i++) {
            let { r, x, y } = this.imgs[i];
            if (x > 0)
                x = -1;
            if (this.isOver(this.x + x, this.y + y, dx, dy)) {
                this.currentMonster = i;
                return;
            }
        }
    }

    isOver(x, y, dx, dy) {
        return mouseX > x + dx && mouseX < x + dx + this.w && mouseY > y + dy && mouseY < y + dy + this.h;
    }


}
