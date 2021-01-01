class Boid {
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.radians = 0;
        this.maxForce = 0.2;
        this.maxSpeed = 4;
        this.radius = 50;
    }    

    flocking(boids){
        this.align(boids);
        this.cohesion(boids);
    }
    align(boids){
        let desired = createVector();
        let total= 0;
        for(let boid of boids){
            let d = dist(this.position.x, this.position.y, boid.position.x,boid.position.y);
            
            if(boid != this && d < this.radius){
                desired.add(boid.velocity);
                total ++;
            }
        }
        if(total > 0){
            desired.div(total);
            desired.setMag(this.maxSpeed);
            desired.sub(this.velocity);
            desired.limit(this.maxForce);

        }else{
            desired = 0;
        }
        this.acceleration.add(desired);
    }

    cohesion(boids){
        let desired = createVector();
        
        let total= 0;
        for(let boid of boids){
            let d = dist(this.position.x, this.position.y, boid.position.x,boid.position.y);
            
            if(boid != this && d < this.radius){
                desired.add(boid.position);
                total ++;
            }
        }
        if(total > 0){
            desired.div(total);
            desired.sub(this.position);
            desired.setMag(this.maxSpeed);
            desired.sub(this.velocity);
            desired.limit(this.maxForce);

        }else{
            desired = 0;
        }
        this.acceleration.add(desired);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
        if(this.position.x > width){
            this.position.x = 0;
        }
        if(this.position.y > height){
            this.position.y = 0;
        }
        if(this.position.x < 0){
            this.position.x = width;
        }
        if(this.position.y < 0){
            this.position.y = height;
        }
    }
    detection(){
        fill(255, 255, 255, 5);
        stroke(0, 0, 0, 0);
        circle(this.position.x, this.position.y, 2*this.radius);
    }
    show(){
        push();
        strokeWeight(10);
        stroke(255, 255, 255);
        noFill();
        translate(this.position.x, this.position.y);
        this.radians = this.velocity.heading();
        rotate(this.radians);
        

        triangle(-4, 2, -4, -2, 2, 0);
        pop();
        //point(this.position.x, this.position.y);
        this.detection();
    }
}