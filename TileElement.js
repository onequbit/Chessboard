class TileElementLayer extends HTMLElement
{
    constructor()
    {
        super();

        return this;
    }
}

customElements.define('tile-element-layer', TileElementLayer);

class TileElement extends HTMLElement
{
    constructor()
    {
        super();
        this.draggable = true;                              
        this.pos1,this.pos2,this.pos3,this.pos4 = 0,0,0,0;

        this.onmousedown = this.startHandler;
        this.onmouseup = this.closeDragElement;            
        this.onmouseleave = this.closeDragElement;
        this.onmouseexit = this.closeDragElement;            
        
        this.addEventListener("touchstart", this.startHandler);            
        this.addEventListener("touchmove", this.moveHandler);
        this.addEventListener("touchend", this.closeDragElement);                        
        this.addEventListener("touchcancel", this.closeDragElement);            
        this.style.position = "absolute";
        this.style.cursor = "grab";
        this.style.userSelect = "none";
        return this;
    }

    layerAdd(classes)
    {
        var divLayer = document.createElement("tile-element-layer");
        this.appendChild(divLayer);
        divLayer.style.position = "absolute";
        this.classList.forEach(className => {
            divLayer.classList.add(className);
        });
        classes.forEach(className => {
            divLayer.classList.add(className);
        });
        return divLayer;       
    }

    closeDragElement()
    {                   
        this.onmousemove = null;         
        var tiles = document.getElementsByTagName(this.tagName);
        var frontZIndex = Math.max.apply(Math, tiles.map(function(t) { return t.style.zIndex; }))
        var behind = frontZIndex - 1;
        tiles.forEach((element) => {
            element.style.zIndex = behind--;
        });
        this.style.zIndex = frontZIndex;
    }

    moveToTop()
    {
        
    }

    setPosition(x, y, moving)
    {        
        if (moving && this.inbounds(x,y)) 
        {
            this.pos1 = this.pos3 - x;
            this.pos2 = this.pos4 - y;
            this.style.top = `${this.offsetTop - this.pos2}px`;
            this.style.left = `${this.offsetLeft - this.pos1}px`;
            this.style.zIndex++;
        }            
        if (x) this.pos3 = x;
        if (y) this.pos4 = y;        
    }        

    startHandler(e)
    {
        e = e || window.event;
        e.preventDefault();            
        if (e.type == "touchstart")
        {
            this.setPosition(e.touches[0].clientX, e.touches[0].clientY);                
        } 
        else if (e.type == "mousedown")
        {
            this.setPosition(e.clientX, e.clientY);
            this.onmousemove = this.moveHandler;                
        }
    }

    moveHandler(e)
    {
        e = e || window.event;
        e.preventDefault();            
        if (e.type == "touchmove")
        {
            this.setPosition(e.touches[0].clientX, e.touches[0].clientY, true);
        } 
        else if (e.type == "mousemove")
        {
            this.setPosition(e.clientX, e.clientY, true);
        }
    }

    inbounds(clientX, clientY)
    {            
        var bounds = this.getBoundingClientRect();
        var margin = Math.min(bounds.bottom - bounds.top, bounds.right - bounds.left);            
        var boundary_right = window.innerWidth - margin;
        var boundary_bottom = window.innerHeight - margin;        
        var in_left = clientX > margin;
        var in_right = clientX < boundary_right;
        var in_top = clientY > margin;
        var in_bottom = clientY < boundary_bottom;
        return in_left && in_right && in_top && in_bottom;        
    }
}

customElements.define('tile-element', TileElement);