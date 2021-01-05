const flock = [];
const barriers = [];

let alignmentSlider, cohesionSlider, separationSlider;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    /*
    alignmentSlider = createSlider(0, 5, 1.2, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1.5, 0.1);
    */
    for(let i = 0; i<60; i++) flock.push(new Boid(true));
    
}
function draw(){
    background(51);
    for (let boid of flock){
        boid.flocking(flock);
        boid.show();
        boid.update();
    }
    for (let barrier of barriers){
        barrier.show();
    }
}

function mouseClicked(){
    flock.push(new Boid(false));
}

function keyPressed(){
    if(key == ' '){
        
        let mindist = Infinity;
        for(let barrier of barriers){
            let d = dist(mouseX, mouseY, barrier.position.x,barrier.position.y);
            mindist = min(mindist, d);
        }
        if(mindist > 10) barriers.push(new Barrier());
        
        
        
    }
}