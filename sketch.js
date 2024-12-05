var table;
var rows;
var seaLevel = [0];
var seaHeight = 0;
var i = 0;
let yoff = 0;

function preload() {
    table = loadTable("sea.csv", "header");
    lato = loadFont("fonts/Lato-Bold.ttf");
    rows = table.getRows();
}

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(180);

    if (i < rows.length) {
        seaHeight = lerp(seaHeight, parseFloat(rows[i].get("Value")) * 5, 0.1);
        i++;
    }

    push();
    fill("#001F3F");
    noStroke();
    beginShape();
    vertex(0, height);
    let xoff = 0;
    for (let x = 0; x <= width; x += 10) {
        let y = map(noise(xoff, yoff), 0, 1, -50, 50);
        vertex(x, -seaHeight + y + 600);
        xoff += 0.01;
    }
    let y = map(noise(xoff, yoff), 0, 1, -50, 50);
    vertex(width, -seaHeight + y + 600);
    vertex(width, height);
    endShape();
    pop();

    yoff += 0.08;

    push();
    if (i == rows.length) {
        stroke(255, 255, 255, 80);
        strokeWeight(5);
        noFill();
        line(250, 0 + 600, width - 250, 0 + 600);
        line(250, i, width - 250, i);
        line(250, -seaHeight + 600, width - 250, -seaHeight + 600);
    }
    for (let i = 600; i > 0; i -= 50) {
        stroke(255, 255, 255, 80);
        strokeWeight(5);
        noFill();
        line(250, 0 + 600, width - 250, 0 + 600);
        line(250, i, width - 250, i);
        fill("#FFFFFF");
        noStroke();
        textSize(50);
        textFont(lato);
        textAlign(LEFT, CENTER);
        text(60 - (i / 10) + "mm", width - 200, i);
    }
    pop();

    push();
    fill("#FFFFFF");
    noStroke();
    textSize(50);
    textFont(lato);
    textAlign(LEFT, CENTER);
    text(i < rows.length ? rows[i].get("Date") : rows[i - 1].get("Date"), 200, -seaHeight + 600);
    textAlign(RIGHT, CENTER);
    text("1992", 200, 600);
    if (i >= rows.length) {
        text("2024", 200, -seaHeight + 600);
        stroke(255, 255, 255, 80);
        strokeWeight(5);
        noFill();
        line(250, -seaHeight + 600, width - 250, -seaHeight + 600);
    }
    pop();
}
