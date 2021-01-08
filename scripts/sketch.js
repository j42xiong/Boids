const flock = [];
const barriers = [];
const particles = [];
let first = true;
let alignmentSlider, cohesionSlider, separationSlider;

function setup(){
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('sketch01');
    first = true;
    // by default this sets position relative to window...
    /*
    alignmentSlider = createSlider(0, 5, 1.2, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1.5, 0.1);
    */
    //for(let i = 0; i<0; i++) flock.push(new Boid(true));
    
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
    /*
    for (let [i, particle] of particles.entries()){
        if(particle.show()){
            
        }
    }
    */
}

function mouseClicked(){
    if(first == true){
        for(let i = 0; i<40; i++) flock.push(new Boid(false));
        first = false;
    }else{
        flock.push(new Boid(false));
    }
    /*
    particles.push(new particle());
    */
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