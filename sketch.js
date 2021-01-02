const flock = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
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