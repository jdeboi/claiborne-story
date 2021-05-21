const START_YEAR = 1940;
const END_YEAR = 2021;

let canvas;


let houseImgs = [];
let housesAbove = [];
let housesBelow = [];

let highway;

let sections = [];
let currentSection;

let scrollPos = 0, scrollPer = 0, currentYear = START_YEAR;

let backgroundCol = 40;
let houses;

let  housePercentage = 1;

function preload() {

    font = loadFont("assets/simplicity.ttf");

    highway = new Highway();
    houses = new Houses();
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    textFont(font);



    let sectionID = 0;
    let spacing = 1 / 14;
   
    sections[sectionID] = new Beginning("the beginning", "a bustling corridor for Black-owned entrepreneurs. 200 Live oaks, longest in the country.", 1940, 1968, sectionID, spacing);
    sections[++sectionID] = new Overpass("construction of the overpass", "began in 1968", 1968, 1968, sectionID, spacing);
    sections[++sectionID] = new Business("business decline", "109 businesses in 1949 in claiborne corridor. 35 by 2020.", 1968, 2020, sectionID, spacing);
    sections[++sectionID] = new Traffic("traffic flow","this much traff", 2020, 2021, sectionID, spacing);
    sections[++sectionID] = new Pollution("pollution", "90-95th percentile for Diesel PM", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("aging infrastructure","needs to come down", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("site of preserving culture bearers", "an opportunity to elevate and preserve culture  bearers", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Gentrification("gentrification", "but equitable solutions aren't as easy as removing the overpass", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("solutions?", "guided by community leaders, groups, and residents", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("affordable housing", "critical to prevent the displacement of Black households", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("public transportation", "replace the overpass", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("green infrastructure", "concrete = flooding", 2021, 2021, sectionID, spacing);
    sections[++sectionID] = new Section("the end", "reach out to ___ to get involved", 2021, 2021, sectionID, spacing);

    currentSection = sections[0];
}

// The draw loop is fully functional but we are not using it for now.
function draw() {
    background(backgroundCol);

    
    currentSection.display();
    currentSection.update(scrollPos);


    fill(255);
    stroke(255);
    textSize(40);
    text(currentSection.getYear(scrollPos), 100, 100);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function mouseWheel(event) {
    // print(event.delta);
    //move the square according to the vertical scroll amount
    // const maxScrollPos = 2000;
    scrollPos += event.delta / 50000;
    if (scrollPos < 0)
        scrollPos = 0;
    else if (scrollPos > 1)
        scrollPos = 1;

    currentSection = getCurrentSection();

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

}


