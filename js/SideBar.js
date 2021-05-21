class SideBar {

    display() {
        push();
        translate(width - 200, 0);
        fill(0);
        noStroke();
        rect(0, 0, 200, height);
    
        const startY = 50;
        const endY = height - 100;
    
        for (let i = START_YEAR; i < END_YEAR; i += 10) {
            const y = map(i, START_YEAR, END_YEAR, startY, endY);
    
            fill(255);
            stroke(255);
            textSize(16);
            text(i, 20, y - 15);
        }
    
        const perY = map(scrollPer, 0, 1, startY, endY);
        triangle(100, perY, 110, perY - 10, 110, perY + 10);
    
        pop();
    }
}