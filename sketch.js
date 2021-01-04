const flock = [];

let alignmentSlider, cohesionSlider, separationSlider;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    /*
    alignmentSlider = createSlider(0, 5, 1.2, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1.5, 0.1);
    */
    for(let i = 0; i<100; i++) flock.push(new Boid(true));
    
}
function draw(){
    background(51);
    for (let boid of flock){
        boid.flocking(flock);
        boid.show();
        boid.update();
    }
}

function mouseClicked(){
    flock.push(new Boid(false));
}