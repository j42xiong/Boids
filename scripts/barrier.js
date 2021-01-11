class Barrier{
    constructor(){
        this.position = createVector(mouseX, mouseY);
    }

    show(){
        
        
        strokeWeight(15);
        stroke(245, 191, 127);

        point(this.position.x, this.position.y);
        //this.detection();
    }
}