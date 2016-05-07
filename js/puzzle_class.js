function PuzzleCell(posX, posY, text) {
    
    this.x = posX;
    this.y = posY; 
    this.text = text;
    
    this.style = {  "width" : PuzzleCell.width + "px", "height": PuzzleCell.height + "px", "line-height":  PuzzleCell.height + "px" };

    this.calc_style();

}

PuzzleCell.width = 50;
PuzzleCell.height = 50;

 PuzzleCell.prototype.calc_style = function() {
     
     this.style.top = this.y * PuzzleCell.height + "px";
     this.style.left = this.x * PuzzleCell.width + "px";
     
 }

function PuzzleField() {
    
    console.log("constructor");
    
    this.width = 4;
    this.height = 4;
    
    this.cells = [];
    
    for(var i=0; i < this.height; i++)
        for(var j=0; j < this.width; j++) {
            var nc = new PuzzleCell(j, i, '' + (i*this.width + j + 1) );
            this.cells.push(nc);
        }
    this.cells[this.cells.length - 1].text = '';    
    
    
    this.free_cell = this.cells[this.cells.length - 1]; //[this.width - 1, this.height - 1];
    
}

PuzzleField.prototype.get_free_cell = function () {
    
    console.log("get free cell");
    
    return this.free_cell;
       
}

PuzzleField.prototype.cell_click = function(cell) {
    
    if(cell == this.free_cell) {
        console.log("You have clicked on free cell");
        return;
    }
    
    if(cell.x != this.free_cell.x && cell.y != this.free_cell.y) {
        console.log("Cannot move from here!");
        return;
    }
    
    if(cell.x == this.free_cell.x) {
        
        console.log("Move by Y");
        
        if(cell.y < this.free_cell.y) {
            console.log("Move down");
            
            var t = cell.y;
            cell.y = this.free_cell.y;
            this.free_cell.y = t;
            
            cell.calc_style();
            this.free_cell.calc_style();
            
           // console.log("Free cell ", this.free_cell);
           // console.log("Moved cell ", cell);
           
          // console.log("All cells - ", this.cells);
            
            return;
        }
        
        if(cell.y > this.free_cell.y) {
            console.log("Move up");
        }
        
        return;
    }
    
    if(cell.y == this.free_cell.y) {
        
        console.log("Move by X");
        
        return;
    }
    
}
