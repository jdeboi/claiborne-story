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
    let spacing = 1 / 16;

    // sections[++sectionID] = new Map("map", "txt", 1940, 1940, sectionID, spacing, canvas);
    // sections[sectionID] = new Title("title", "txt", 1940, 1940, sectionID, spacing);

    titleSection = new Title("title", "txt", 1940, 1940, sectionID, spacing);
    sections[sectionID] = new Overview0("map0", "txt", 1940, 1940, sectionID, spacing);
    sections[++sectionID] = new Overview1("map0", "txt", 1940, 1940, sectionID, spacing);

    sections[++sectionID] = new Beginning("the beginning", "a bustling corridor for Black-owned entrepreneurs. 200 Live oaks, longest in the country.", 1940, 1968, sectionID, spacing);
    sections[++sectionID] = new Overpass("construction of the overpass", "began in 1968", 1968, 1968, sectionID, spacing);
    sections[++sectionID] = new Business("business decline", "109 businesses in 1949 in claiborne corridor. 35 by 2020.", 1968, 2020, sectionID, spacing);
    sections[++sectionID] = new Traffic("traffic flow", "this much traff", 2020, 2021, sectionID, spacing);
    sections[++sectionID] = new Pollution("pollution", "90-95th percentile for Diesel PM", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("aging infrastructure", "needs to come down", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("site of preserving culture bearers", "an opportunity to elevate and preserve culture  bearers", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Gentrification("gentrification", "but equitable solutions aren't as easy as removing the overpass", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("solutions?", "guided by community leaders, groups, and residents", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("affordable housing", "critical to prevent the displacement of Black households", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("public transportation", "replace the overpass", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("green infrastructure", "concrete = flooding", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("the end", "reach out to ___ to get involved", 2021, 2021, sectionID, spacing);

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
        const { x, y, path } = images[i];
        const url = 'assets/past/destinations/' + path;
        destinations[i] = new Destination(x, y, url);
    }
}

function displayDestinations(factor) {
    for (const d of destinations) {
        // d.updateCoords(myMap);
        d.display(factor);
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