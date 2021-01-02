class Boid {
    constructor(spawned){
        if(spawned){
            this.position = createVector(random(width), random(height));
        }else{
            this.position = createVector(mouseX, mouseY);
        }
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.radians = 0;
        this.maxForce = 0.3;
        this.maxSpeed = 4;
        this.radius = 65;
    }    

    flocking(boids){
        let a = this.align(boids);
        let c = this.cohesion(boids);
        let s = this.separation(boids);
        let p = this.predator();
        a.mult(1.2);
        c.mult(1);
        s.mult(1.3);
        p.mult(2);

        this.acceleration.add(a);
        this.acceleration.add(c);
        this.acceleration.add(s);
        this.acceleration.add(p);
        //this.acceleration.limit(this.maxForce);
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

        }
        return desired;
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

        }
        return desired;
    }

    separation(boids){
        let desired = createVector();
        
        let total= 0;
        for(let boid of boids){
            let d = dist(this.position.x, this.position.y, boid.position.x,boid.position.y);
            
            if(boid != this && d < this.radius){
                let diff = p5.Vector.sub(this.position, boid.position);
                
                    diff.div(max(d^2, 10e-20));
                
                desired.add(diff);
                total ++;
            }
        }
        if(total > 0){
            desired.div(total);
            desired.setMag(this.maxSpeed);
            desired.sub(this.velocity);
            desired.limit(this.maxForce);

        }
        return desired;
    }
    predator(){
        let desired = createVector();
        let d = dist(this.position.x, this.position.y, mouseX, mouseY);
        
        if( d < this.radius*5){
            let diff = p5.Vector.sub(this.position, createVector(mouseX, mouseY));
            diff.div(max(d^2, 10e-20));
            desired.add(diff);
        

        desired.setMag(this.maxSpeed);
        desired.sub(this.velocity);
        desired.limit(this.maxForce);
        }
        return desired;
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
        fill(52, 189, 235, 3);
        stroke(0, 0, 0, 0);
        for(let x = 0; x<=2*this.radius; x += this.radius/2){
            circle(this.position.x, this.position.y, x);
        }
        //circle(this.position.x, this.position.y, 2*this.radius);
        
    }
    show(){
        
        push();
        strokeWeight(10);
        stroke(52, 189, 235);
        noFill();
        translate(this.position.x, this.position.y);
        this.radians = this.velocity.heading();
        rotate(this.radians);
        

        triangle(-1, 0.5, -1, -0.5, 0.5, 0);
        pop();
        //point(this.position.x, this.position.y);
        //this.detection();
    }
}