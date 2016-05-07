describe("Puzzle Test", function() {

  var PuzzleField = require('../js/puzzle_class');
  var mytest;
 
  describe("find wrong cell", function() {
    
    beforeEach(function() {
    
      mytest = new PuzzleField(3,3,50);
      
    });
  
    it("should be null", function() {
      
      expect(mytest.find_cell(3,3)).toEqual(null);

    });
    
  });

});
