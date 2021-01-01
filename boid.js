class Boid {
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.radians = 0;
    }    

    align(boids){
        let desired = createVector();
        let radius = 50;
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
        fill(255, 255, 255, 20);
        stroke(0, 0, 0, 0);
        circle(this.position.x, this.position.y, 100);
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