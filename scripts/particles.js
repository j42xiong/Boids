class particle {
    
    constructor(){
        this.s = 1;
        this.x = mouseX;
        this.y = mouseY;
        this.done = false;
    }    
    

    show(){
        if(this.s > 20){
            stroke(52, 189, 200, (1 - this.s/100)*100);
        }else{
            stroke(52, 189, 200, 100);
        }

        noFill();
        circle(this.x, this.y, 60*this.s/100);
        strokeWeight(10 - this.s/10);
        if(this.s <= 20) this.s += 5;
        else if(this.s <= 70) this.s += 3;
        else{this.s += 1;}
        
        if(this.s > 100){
            return true;
        }
        return false;
    }
}