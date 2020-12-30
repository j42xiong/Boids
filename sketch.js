const flock = [];

function setup(){
    createCanvas(1280, 720);
    for(let i = 0; i<100; i++) flock.push(new Boid());
    
}
function draw(){
    background(51);
    for (let boid of flock){
        boid.show();
        boid.update();
    }
}