function global_textLabelHandler(){
    ////////////////////
    // Constants defined externally
    ////////////////////
    this.textHandlers = []; // text handlers will be used to get status
    this.element = null;
    
    ////////////////////
    // Constants defined internally
    ////////////////////
    this.status = "default";
    
    
}


global_textLabelHandler.prototype = {
    ////////////////////
    // Constants Re-Defined in init.js
    ////////////////////
    classes : {},
    /*
    classes : {
        default : ...,
        valid : ....,
        invalid : .....,
    },
    */
    rank : [null, "default", "valid", "invalid"],
    
    
    initialize : function(){
        this.element.className += " " + this.classes[this.status];
    },
    
    
    getHighest : function(statusA, statusB){
        rankA = this.rank.indexOf(statusA);
        rankB = this.rank.indexOf(statusB);
        highest = null;
        if(rankA < rankB){
            highest = statusB;   
        } else {
            highest = statusA;   
        }
        //console.log("return " + highest);
        return highest;
    },
    
    
    changeDisplayStatusFromTo : function(setStatus){
        // Highest level = invalid
        // Mid level = valid
        // Lowest level = default
        // Run through all textHandlers and determine highest level - status level

        lowestStatus = setStatus;
        total = this.textHandlers.length;
        for(index = 0; index < total; index++){
            thisHandler = this.textHandlers[index];
            thisStatus = thisHandler.status;
            lowestStatus = this.getHighest(lowestStatus, thisStatus);
        }
        
        currentClass = this.classes[this.status];
        nextClass = this.classes[lowestStatus];
        if(currentClass == nextClass){
            //console.log("already set");
            return; // not going to change a thing
        }
        
        //console.log(currentClass + " VS " + nextClass);
        //console.log(this.element.className);
        this.element.className = this.element.className.replace(currentClass, nextClass); // replace the old class with new class 
        //console.log(this.element.className);
        
        this.status = lowestStatus;
    },
    
}