class Barrier{
    constructor(){
        this.position = createVector(mouseX, mouseY);
    }

    show(){
        
        
        strokeWeight(10);
        stroke(52, 189, this.colour);

        point(this.position.x, this.position.y);
        //this.detection();
    }
}