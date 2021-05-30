const START_YEAR = 1940;
const END_YEAR = 2021;

let hasStarted = false;

let canvas;

let highwaySound, peopleSound;

let highway1, highway2;

let sections = [];
let currentSection;

let scrollPos = 0, scrollPer = 0, currentYear = START_YEAR;

let backgroundCol = 40;

let houseImgs = [];
let housesAbove = [];
let housesBelow = [];
let houses;
let housePercentage = 1;

let bkImg;
let bkBig;
let bkImgOverpass;
let overviews = [];

let smallCars = [];
let smallCarIndex = 0;
let smallCarImg;

let camera;
let destinations = [];

let titleSection;

let timeline;
// let mappaObj;

let font, fontText;

function preload() {

    font = loadFont("assets/fonts/BaksoSapi.otf"); //simplicity.ttf");
    fontText = loadFont("assets/fonts/simplicity.ttf");

    bkImg = loadImage("assets/overview/background.png");
    bkBig = loadImage("assets/overview/background2.png");
    bkImgOverpass = loadImage("assets/overpass.png");

    overviews = [];
    overviews[0] = loadImage("assets/overview/overlay0.png");
    overviews[1] = loadImage("assets/overview/overview_long2.png");

    smallCarImg = loadImage("assets/cars/smallCar.png");

    camera = loadImage("assets/camera.png");

    // soundFormats('mp3');
    // highwaySound = loadSound('assets/sounds/highway');

    loadJSON("assets/past/images.json", loadDestinations);

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);


    textFont(font);

    // mappaObj = new Map(canvas);

    highway1 = new Highway(true);
    highway2 = new Highway(false);
    houses = new Houses();

    for (let i = 0; i < 40; i++) {
        smallCars[i] = new CarSmall();
    }

    let sectionID = 0;
    let spacing = 1 / 10;

    // sections[++sectionID] = new Map("map", "txt", 1940, 1940, sectionID, spacing, canvas);
    // sections[sectionID] = new Title("title", "txt", 1940, 1940, sectionID, spacing);

    titleSection = new Title("title", "txt", 1940, 1940, sectionID, spacing);
    sections[sectionID] = new Overview0("The Monster", "Once a bustling, tree-lined corridor of Black-owned businesses and ", 1940, 1940, sectionID, spacing);
    sections[++sectionID] = new Overview1("map0", "txt", 1940, 1940, sectionID, spacing);

    sections[++sectionID] = new Beginning("1940s: What came before", "A gathering space, lined with 200 live oak trees, all nearly 100 years old. Homes, restaurants, bars, a pharmacy, funeral homes, insurance company offices, an ice cream shop, Louis Armstrong’s favorite spot to eat red beans. A corridor that supported the culture and life of the historic Black neighborhood that surrounds it. The parade grounds for Black Mardi Gras during the segregation era.", 1940, 1968, sectionID, spacing);
    sections[++sectionID] = new Overpass("1966, Ash Wednesday", "Backhoes arrive to take down the live oak trees, clearing the longest strand of oak trees in the country for construction of the overpass.", 1968, 1968, sectionID, spacing);
    sections[++sectionID] = new Business("1960-2000: Declining Business", "In 1960 there were 132 businesses registered on Claiborne Avenue according to Polk’s New Orleans City Directories. By 2000, after decades of steady decline, there were only 35.", 1968, 2020, sectionID, spacing);
    // sections[++sectionID] = new Traffic("Traffic Flow", "Residents within the Claiborne Corridor are in the top 95th to 100th percentiles in the state terms of traffic proximity.", 2020, 2021, sectionID, spacing);
    sections[++sectionID] = new Pollution("Pollution", "According to the EPA's National Air Toxics Assessment (NATA), the Claiborne Corridor ranks in the 90-95th percentile for diesel particulate matter. This pollution has been linked to cardiovascular and respiratory diseases.", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("Removing the Overpass", "The Claiborne Expressway is reaching its age limit. The Claiborne Avenue Alliance is calling for the removal of the overpass. Restoring the beauty, paying reparations for economic and racial injustice, and protecting the cultural heritage of the Treme neighborhood should be the city (and nation's) top priority.", 2021, 2021, sectionID, spacing);
    // sections[++sectionID] = new Section("site of preserving culture bearers", "an opportunity to elevate and preserve culture  bearers", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Gentrification("Equitable Futures", "Equitable solutions, however, aren't as easy as removing the overpass. The Treme neighborhood has already been subjected to significant gentrification as increased rent has forced Black households to move.", 2021, 2021, sectionID, spacing);
    // sections[++sectionID] = new Section("solutions?", "guided by community leaders, groups, and residents", 2021, 2021, sectionID, spacing);
    // sections[++sectionID] = new Section("affordable housing", "critical to prevent the displacement of Black households", 2021, 2021, sectionID, spacing);
    // sections[++sectionID] = new Section("public transportation", "replace the overpass", 2021, 2021, sectionID, spacing);
    // sections[++sectionID] = new Section("green infrastructure", "concrete = flooding", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("Get Involved", "Reach out to get involved.", 2021, 2021, sectionID, spacing);

    currentSection = sections[0];

    timeline = new Timeline(sectionID);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {

    if (!hasStarted) {
        titleSection.display();
    }
    else {
        currentSection.display();
        currentSection.update(scrollPos);
        timeline.display();
    }


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function displaySmallCars(factor) {
    for (const car of smallCars) {
        car.move();
        car.display(factor);
    }
}

function loadDestinations(images) {

    for (let i = 0; i < images.length; i++) {
        const { x, y, path, year, description } = images[i];
        const url = 'assets/past/destinations/' + path;
        destinations[i] = new Destination(x, y, year, description, url);
    }
}

function displayDestinations(dx, dy, factor) {
    for (const d of destinations) {
        // d.updateCoords(myMap);
        d.display(dx, dy, factor);
    }
}

function displayDestinationImage() {
    for (const d of destinations) {
        // d.updateCoords(myMap);
        d.displayImage();
    }
}

function mouseDragged() {
    currentSection.checkDrag();
}

function mouseWheel(event) {
    // print(event.delta);
    //move the square according to the vertical scroll amount
    // const maxScrollPos = 2000;

    if (hasStarted) {
        scrollPos += event.delta / 50000;
        if (scrollPos < 0) {
            scrollPos = 0;
            hasStarted = false;
            startReverseAnimation();
        }

        else if (scrollPos > 1)
            scrollPos = 1;

        currentSection = getCurrentSection();
        timeline.setSelected(currentSection.id);
    }


    // if (scrollPos < .2) {
    //     currentYear = map(scrollPos, 0, .2, START_YEAR, 1968);
    // }
    // else if (scrollPos < .4) {
    //     currentYear = map(scrollPos, .2, .4, 1968, 1969);
    // }
    // else if (scrollPos < .6) {
    //     currentYear = map(scrollPos, 0, .2, 1968, 1968);
    // }

    // scrollPer = scrollPos / 1000;
    // if (scrollPer > 1)
    //     scrollPer = 1;
    // else if (scrollPer < 0)
    //     scrollPer = 0;

    //uncomment to block page scrolling


    return false;
}

function getCurrentSection() {
    for (const s of sections) {
        if (s.isSection(scrollPos)) {
            return s;
        }
    }
    return sections[sections.length - 1];
}


function mousePressed() {
    startNewSmallCar();
    // if (highwaySound.isLoaded()) {
    //     highwaySound.play();
    //     highwaySound.loop();
    // }
    if (!hasStarted)
        titleSection.checkClick();
    else
        currentSection.checkClick();
}

function startNewSmallCar() {
    if (smallCars[smallCarIndex]) {
        smallCars[smallCarIndex].started = true;
        smallCarIndex++;
        smallCarIndex %= smallCars.length;
    }

}

function drawBK() {
    // clear();
    // noStroke();
    // fill(255, 100);
    // rect(0, 0, width, height);
    background(backgroundCol);
}

let pastOn = true;
function togglePast() {
    pastOn = !pastOn;
    document.getElementById("pastButton").innerHTML = (pastOn ? "past" : "present");
}