class Map {

    constructor(canvas) {
        const mKey = "pk.eyJ1IjoiamRlYm9pIiwiYSI6ImNraTlqZjI5dzBiczcyeW12b3JqczVqcjQifQ.Ixa9kxflypCdfdL289pPiA";

        const options = {
            lat: 29.96,
            lng: -90.08,
            minzoom: 13,
            maxzoom: 16,
            zoom: 15,
            studio: true, // false to use non studio styles
            //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
            style: 'mapbox://styles/mapbox/satellite-v9'
            // streets 'mapbox://styles/mapbox/satellite-streets-v11'
            // no stsreets mapbox://styles/mapbox/satellite-v9',
        };

        // Create an instance of Mapbox
        const mappa = new Mappa('Mapbox', mKey);

        // Create a tile map and overlay the canvas on top.
        this.myMap = mappa.tileMap(options);
        this.myMap.overlay(canvas);
        this.myMap.onChange(() => this.drawMapImage());

        this.overviews = [];

        this.overviews[0] = loadImage("assets/overview/Claiborne Overview 1947.jpg");
        this.overviews[1] = loadImage("assets/overview/Overview2.jpg");

        this.drawMapImage();
    }

    drawMapImage() {
        clear();
        console.log("test");
        this.drawOverview2();//this.overviews[0], { lat: 29.9647, lng: -90.0741 }, 18.02, 38);
        this.drawOverview2(); //this.overviews[1], { lat: 29.974, lng: -90.0624 }, 19, 90);

    }

    drawOverview2() {
        console.log("over")
    }

    flyTo(lat, lng, zoom) {
        this.myMap.map.flyTo([lat, lng], zoom);
    }

    drawOverview(img, startCoord, startZoom, rotDeg) {
        if (!img) return;

        const pixels = this.myMap.latLngToPixel(startCoord.lat, startCoord.lng);

        const { w, h } = this.getImageSize(img, startZoom);

        if (w > 20 && height > 20) {
            push();
            translate(pixels.x, pixels.y);
            rotate(radians(rotDeg));
            noFill();
            stroke(255, 0, 255);
            strokeWeight(3);
            rect(0, 0, w, h);

            image(img, 0, 0, w, h);
            pop();
        }
        else {
            noStroke();
            fill(255, 0, 255);
            ellipse(pixels.x, pixels.y, 10);
        }
    }

    getImageSize(img, zoomDefault) {
        let zoomDiff = this.myMap.zoom() - zoomDefault;
        let factor = 1;
        if (zoomDiff !== 0) {
            factor = pow(2, -abs(zoomDiff));
        }
        let w = img.width * factor;
        let h = img.height * factor;
        return { w, h };
    }
}