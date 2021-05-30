

class Map0 extends Section {


    constructor(title, txt, startYear, endYear, id, spacing) {
        super(title, txt, startYear, endYear, id, spacing);

 

    }

    displayScene() {
        let zoom = map(this.per, 0, 1, 2, 1);
        const {w, h, x, y, factor} = getCoverBackground(bkImg, zoom);
        push();
        translate(x, y);
        image(bkImg, 0, 0, w, h);
        image(overviews[0], 350*zoom, 220*zoom, overviews[0].width * factor, overviews[0].height * factor);
        pop();
    }

}

function getCoverBackground(img, zoom) {
    const imgRatio = (img.height / img.width);     
    const containerRatio = (height / width)  
    
    // set h to canvas height, find w 
    if (containerRatio > imgRatio) {
        var h = height*zoom;
        var y = (height - h)/2;
        var factor = h/img.height;
        var w = factor * img.width;
        var x = (width - w) / 2;
    }
    // set width 
    else {
        var w = width*zoom;
        var x = (width - w)/2;
        var factor = w/ img.width;
        var h = img.height * factor;
        var y = (height - h)/2;
    }

    return {w, h, x, y, factor};

}