function PuzzleCell(posX, posY, text) {
    
    this.x = posX;
    this.y = posY; 
    this.text = text;
    
    this.style = {  "width" : PuzzleCell.width + "px", "height": PuzzleCell.height + "px", "line-height":  PuzzleCell.height + "px" };

    this.calc_style();

}

 PuzzleCell.prototype.calc_style = function() {
     
     this.style.top = this.y * PuzzleCell.height + "px";
     this.style.left = this.x * PuzzleCell.width + "px";
     
     if(this.text === '') {
         this.style.border = 'none';
         this.style['background-color'] = 'rgba(0,0,0,0)';
     }
     
 }

function PuzzleField(w, h, size) {
    
  //  console.log("constructor");
    
    this.width = w;
    this.height = h;
    
    PuzzleCell.width = size;
    PuzzleCell.height = size;
    
    this.cells = [];
    
    for(var i=0; i < this.height; i++)
        for(var j=0; j < this.width; j++) {
            var nc = new PuzzleCell(j, i, '' + (i*this.width + j + 1) );
            this.cells.push(nc);
        }
  
    this.free_cell = this.cells[this.cells.length - 1];
    
    this.free_cell.text = '';
    
    this.free_cell.calc_style();
    
    this.style = {};
    this.style.width = this.width * PuzzleCell.width + "px";
    this.style.height = this.height * PuzzleCell.height + "px";
    
    this.reactivate_cells();
    
    this.moves_count = 0; 
    
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
    
    this.moves_count++;
    
    if(cell.x == this.free_cell.x) {
        
        console.log("Move by Y");
        
        if(cell.y < this.free_cell.y) {
            console.log("Move down");
            
            var t = cell.y;
            
            for(i = (this.free_cell.y - 1); i >= t; i--) {
                var cc = this.find_cell(cell.x, i);
                if(!cc) {
                    console.log("Cannot find cell");
                    return;
                }
                cc.y = i + 1;
                cc.calc_style();
            }
           
            this.free_cell.y = t;           
            this.free_cell.calc_style();
            
            this.reactivate_cells();
            
            return;
        }
        
        if(cell.y > this.free_cell.y) {
            console.log("Move up");
            
            var t = cell.y;
            
            for(i = (this.free_cell.y + 1); i <= t; i++) {
                var cc = this.find_cell(cell.x, i);
                if(!cc) {
                    console.log("Cannot find cell");
                    return;
                }
                cc.y = i - 1;
                cc.calc_style();
            }
           
            this.free_cell.y = t;           
            this.free_cell.calc_style();
            
            this.reactivate_cells();
            
            return;
        }
        
    }
    
    if(cell.y == this.free_cell.y) {
        
        console.log("Move by X");
        
        if(cell.x < this.free_cell.x) {
            console.log("Move to the right");
            
            var t = cell.x;
            
            for(i = (this.free_cell.x - 1); i >= t; i--) {
                var cc = this.find_cell(i, cell.y);
                if(!cc) {
                    console.log("Cannot find cell");
                    return;
                }
                cc.x = i + 1;
                cc.calc_style();
            }
           
            this.free_cell.x = t;           
            this.free_cell.calc_style();
            
            this.reactivate_cells();
            
            return;
        }
        
        if(cell.x > this.free_cell.x) {
            
            console.log("Move to the left");
            
            var t = cell.x;
            
            for(i = (this.free_cell.x + 1); i <= t; i++) {
                var cc = this.find_cell(i, cell.y);
                if(!cc) {
                    console.log("Cannot find cell");
                    return;
                }
                cc.x = i - 1;
                cc.calc_style();
            }
           
            this.free_cell.x = t;           
            this.free_cell.calc_style();
            
            this.reactivate_cells();
            
            return;
        }
        
        return;
    }
    
}


PuzzleField.prototype.find_cell = function(posX, posY) {
    
    for(var i=0; i < this.cells.length; i++) {
        if(this.cells[i].x === posX && this.cells[i].y === posY) {
            return this.cells[i];
        }
    }
    return null;
    
}

PuzzleField.prototype.shuffle = function() {
    
    console.log("shuffle");
    
    for (var i = this.cells.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempX = this.cells[i].x;
        var tempY = this.cells[i].y;
        this.cells[i].x = this.cells[j].x;
        this.cells[i].y = this.cells[j].y;
        this.cells[j].x = tempX;
        this.cells[j].y = tempY;
        this.cells[i].calc_style();
        this.cells[j].calc_style();
    }
    
    var lastcell = this.find_cell(this.width - 1, this.height - 1);
    
    if(lastcell != this.free_cell) {
        var tempX = lastcell.x;
        var tempY = lastcell.y;
        lastcell.x = this.free_cell.x;
        lastcell.y = this.free_cell.y;
        this.free_cell.x = tempX;
        this.free_cell.y = tempY; 
        lastcell.calc_style();
        this.free_cell.calc_style();
    }
    
    this.moves_count = 0;
    
    this.reactivate_cells();
    
}

PuzzleField.prototype.solve = function() {
    
    for(i=0; i < this.cells.length; i++) {
        if(this.cells[i].text !== '') {
           // var num = parseInt(this.cells[i].text);
            this.cells[i].x = i % this.width;
            this.cells[i].y = Math.floor( i / this.height );
            
            this.cells[i].calc_style();
        }
        else {
            //free cell
            this.cells[i].x = this.width - 1;
            this.cells[i].y = this.height - 1;
            this.cells[i].calc_style();
        }
    }
    
    this.moves_count = 0;
    
    this.reactivate_cells();
}

PuzzleField.prototype.reactivate_cells = function() {
    
    var all_in = true;
    
    for(i=0; i < this.cells.length; i++) {
        if(this.cells[i] === this.free_cell) continue;
        if(this.cells[i].x === this.free_cell.x || this.cells[i].y === this.free_cell.y) this.cells[i].active = 1;
        else this.cells[i].active = 0;
        
        var num = parseInt(this.cells[i].text) - 1;
        var cx = num % this.height;
        var cy = Math.floor(num / this.width);
        
        if( cx == this.cells[i].x &&  cy == this.cells[i].y ) this.cells[i].inplace = 1;
        else this.cells[i].inplace = 0;
        
        if(this.cells[i].inplace !== 1) all_in = false;
    }
    
    if(all_in === true && this.moves_count > 0) {
        alert("Congratulations! You've solved the puzzle within " + this.moves_count + " moves.");
        this.moves_count = 0;
    }
    
}

if(typeof(module) !== "undefined") module.exports = PuzzleField;