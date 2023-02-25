
(function(){
    try
    {
        String.prototype.forEach = function(lambda)
        { 
            this.split(' ').forEach( item => lambda(item) ); 
        }            

        DOMTokenList.prototype.forEach = Array.prototype.forEach;
        HTMLCollection.prototype.forEach = Array.prototype.forEach;            
        HTMLElement.prototype.getElementSize = function(){
            var rect = this.getBoundingClientRect();
            return Math.min(rect.bottom - rect.top, rect.right - rect.left);            
        };
        HTMLElement.prototype.setSquareDimensions = function(){
            var size = this.getElementSize();
            this.style.height = size + "px";
            this.style.width = size + "px";
        }
    }
    catch(e) {}
    
})();


// function getPixelSizeByGridUnits(screen_units)
// {
//     var cssSize = Math.round(100/screen_units);
//     var sizetest = document.createElement("div");
//     sizetest.id = "sizetest";
//     sizetest.style = `height:${cssSize}vh;width:${cssSize}vw`;
//     document.body.append(sizetest);
//     size = sizetest.getElementSize();
//     document.getElementById("sizetest").remove();
//     return size;
// }

const CHESS_PIECES = 
{
    'white' : 
    {
        'king' : "&#9812;",
        'queen' : "&#9813;",
        'rook' : "&#9814;",
        'bishop' : "&#9815;",
        'knight' : "&#9816;",
        'pawn' : "&#9817;"        
    },
    'black' :
    {
        'king' : "&#9818;",
        'queen' : "&#9819;",
        'rook' : "&#9820;",
        'bishop' : "&#9821;",
        'knight' : "&#9822;",
        'pawn' : "&#9823;"        
    },
    'empty' :
    {
        'cell' : "&#32;"
    },
    'reverse' :
    {
        'white' : 'black',
        'black' : 'white'
    }


};

class ChessPiece extends TileElement
{
    constructor()
    {
        super();
        if (this.classList.length != 2)
        {
            throw "invalid class list in HTML";
        }            
        this.color = this.classList[0];
        this.rank = this.classList[1];        
        
        if (Object.keys(CHESS_PIECES).indexOf(this.color) < 0)
        {
            throw "invalid chess piece color";
        }
        if (Object.keys(CHESS_PIECES[this.color]).indexOf(this.rank) < 0)
        {
            throw "invalid chess piece name";
        }

        this.layers = {
            back : this.layerAdd("chess-piece-layer back"),
            front : this.layerAdd("chess-piece-layer front")
        }        
        
        var oppositeColor = CHESS_PIECES['reverse'][this.color];
        this.layers.back.innerHTML = CHESS_PIECES[this.color][this.rank];        
        this.layers.back.setSquareDimensions();
        
        this.layers.front.innerHTML = CHESS_PIECES[this.color][this.rank];            
        this.layers.front.setSquareDimensions();
        this.setSquareDimensions();    
        return this;
    }         

}

/*
    const prefix = "&#98";
    const colors = ['WHITE','BLACK'];
    const ranks = ['KING','QUEEN','ROOK','BISHOP','KNIGHT','PAWN'];

    white chess king	♔	U+2654	&#9812;	&#x2654;
    white chess queen	♕	U+2655	&#9813;	&#x2655;
    white chess rook	♖	U+2656	&#9814;	&#x2656;
    white chess bishop	♗	U+2657	&#9815;	&#x2657;
    white chess knight	♘	U+2658	&#9816;	&#x2658;
    white chess pawn	♙	U+2659	&#9817;	&#x2659;

    black chess king	♚	U+265A	&#9818;	&#x265A;
    black chess queen	♛	U+265B	&#9819;	&#x265B;
    black chess rook	♜	U+265C	&#9820;	&#x265C;
    black chess bishop	♝	U+265D	&#9821;	&#x265D;
    black chess knight	♞	U+265E	&#9822;	&#x265E;
    black chess pawn	♟︎	 U+265F	 &#9823; &#x265F;
*/

customElements.define('chess-piece', ChessPiece);



