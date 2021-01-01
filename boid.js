class Boid {
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 5));
        this.acceleration = createVector();

    }    

    align(boids){
        let desired = createVector();
        let radius = 80;
        let total= 0;
        for(let boid of boids){
            let d = dist(this.position.x, this.position.y, boid.position.x,boid.position.y);
            
            if(boid != this && d < radius){
                desired.add(boid.velocity);
                total ++;
            }
        }
        if(total > 0){
            desired.div(total);
            desired.sub(this.velocity);
        }else{
            desired = 0;
        }
        this.acceleration = desired;
    }


    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }
    show(){
        strokeWeight(8);
        stroke(255, 204, 0);
        point(this.position.x, this.position.y);
    }
}