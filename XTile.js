class XTile extends HTMLElement
{
    constructor(contents)
    {
        super();
        if (contents)
        {            
            this.innerText = contents;
        }        
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
        this.style.cursor = "move";
        this.style.position = "absolute";
        this.draggable = true;               
        this.addEventListener("mousedown", this.mouseDown);  
        this.addEventListener("mouseup", this.closeDragElement);
        this.addEventListener("touchstart", this.touchStart);
        this.addEventListener("touchmove", this.touchMove);
        this.addEventListener("touchend", this.closeDragElement); 
        this.addEventListener("touchenter", this.onMouseOver);                       
        this.addEventListener("mouseleave", this.closeDragElement);
        this.addEventListener("mouseexit", this.closeDragElement);
        this.distanceTo = [];        
    }

    setOnDragStart(e)
    {
        event.dataTransfer.setData('text/html', null); //cannot be empty string
    }

    isLastOne()
    {        
        var count = 0;
        var others = document.getElementsByTagName("x-tile");
        others.forEach((tile)=>{
            if (tile.innerText == this.innerText) count++;
        });
        return count == 1;
    }

    lock()
    {   
        this.draggable = false;     
        this.removeEventListener("mousedown", this.mouseDown);  
        this.removeEventListener("touchstart", this.touchStart);
        this.removeEventListener("touchmove", this.touchMove);
        this.removeEventListener("touchend", this.closeDragElement);                        
        this.removeEventListener("mouseleave", this.closeDragElement);
        this.removeEventListener("mouseexit", this.closeDragElement);
        this.classList.add("locked");
        this.style = "";           
    }

    closeDragElement()
    {                   
        this.onmousemove = null;         
        if (this.isOffPage())
        {
            console.log(this, "is off page");
            if (!this.isLastOne()) 
            {
                this.remove();
            }                   
        }
        this.pushOtherTilesBack();
        this.updateRadar();       
    }

    mouseDown(e) 
    {        
        e = e || window.event;
        if (e.which == 3) return;
        e.preventDefault();
        console.log(e);        
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;        
        this.onmousemove = this.mouseMove; 
        this.pushOtherTilesBack();
    }

    touchStart(e) 
    {        
        e = e || window.event;
        e.preventDefault();        
        this.pos3 = e.touches[0].clientX;
        this.pos4 = e.touches[0].clientY;        
        this.pushOtherTilesBack();
    }

    mouseMove(e) 
    {        
        e = e || window.event;
        e.preventDefault();         
        if (this.isLastOne())
        {
            var rect = this.getBoundingClientRect();
            var dragMargin = rect.width / 2;
            var inWidth = e.clientX >= dragMargin && e.clientX < (window.innerWidth - dragMargin);
            var inHeight = e.clientY >= dragMargin && e.clientY < (window.innerHeight - dragMargin);
            if (!inWidth || !inHeight) return;
        }
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;        
        this.style.top = (this.offsetTop - this.pos2) + "px";
        this.style.left = (this.offsetLeft - this.pos1) + "px";
        this.pushOtherTilesBack();
    }

    pushOtherTilesBack()
    {        
        var letters = document.getElementsByTagName("x-tile");    
        for (var i=letters.length - 1; i>=0; i--)
        {
            var tile = letters[i];
            if (tile.id != this.id) tile.style.zIndex=i;
        }
        this.style.zIndex = letters.length;
    }

    touchMove(e) 
    {        
        e = e || window.event;
        e.preventDefault();
        
        if (this.isLastOne())
        {
            var rect = this.getBoundingClientRect();
            var dragMargin = rect.width / 2;
            var inWidth = e.touches[0].clientX >= dragMargin && e.touches[0].clientX < (window.innerWidth - dragMargin);
            var inHeight = e.touches[0].clientY >= dragMargin && e.touches[0].clientY < (window.innerHeight - dragMargin);
            if (!inWidth || !inHeight) return;        
        }
        this.pos1 = this.pos3 - e.touches[0].clientX;
        this.pos2 = this.pos4 - e.touches[0].clientY;
        this.pos3 = e.touches[0].clientX;
        this.pos4 = e.touches[0].clientY;        
        this.style.top = (this.offsetTop - this.pos2) + "px";
        this.style.left = (this.offsetLeft - this.pos1) + "px";
        this.pushOtherTilesBack();
    }

    onMouseOver(e)
    {
        console.log(e);
    }

    updateRadar()
    {        
        var width = this.getBoundingClientRect().width;
        var middle = width/2;
        console.log(this.innerText + ":" + this.id + " middle:" + middle + ", width:" + width);  
        var x1 = this.offsetLeft + middle;
        var y1 = this.offsetTop + middle;        
        var letterTiles = document.getElementsByTagName("x-tile");
        letterTiles.forEach( (tile) => {
            if (tile.id != this.id)
            {
                var x2 = tile.offsetLeft + middle;
                var y2 = tile.offsetTop + middle;
                var angle = direction(x1,y1,x2,y2);
                var dist = distance(x1,y1,x2,y2);
                console.log(this.id, tile.id, dist, angle);
            }
        });  
    }
}
