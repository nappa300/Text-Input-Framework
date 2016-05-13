var global_textHandler = {
    ///////////////////////////
    // Replication function
    ///////////////////////////
    new : function(){
        return Object.create(this);   
    },
    ///////////////////////////
    ///////////////////////////
    
    
    ////////////////////
    // Constants Defined in init.js
    ////////////////////
    classes : {},
    /*
    classes : {
        inputElement : {
            default : ...,
            valid : ....,
            invalid : .....,
        }
    },
    */
    
    
    ////////////////////
    // Constants defined externally
    ////////////////////
    inputValidationFunction : null,
    DOM : {}, // used also with coordination of classes, if defined in classes must be defined in DOM
    
    ////////////////////
    // Internally defined constants
    ////////////////////
    currentStatus : "default",
    
    
    get value () {
        return this.DOM.inputElement.value;
    },
    
    initialize : function(){
        this.DOM.inputElement.onfocus = (function(){ this.determineStatusOnActivity(); }).bind(this);
        this.DOM.inputElement.onkeyup = (function(){ this.determineStatusOnActivity(); }).bind(this);
        this.DOM.inputElement.onblur = (function(){ this.determineStatusOnBlur(); }).bind(this);
    },
    
    determineStatusOnBlur : function(){
        var value = this.value;
        if(value.length > 0){
            // If there is input, validate it
            this.validateTheInput();
        } else if (this.required == true){
            // If its empty and required, show invalid
            this.displayThatInputIs("invalid");  
        } else {
            // If its empty and not required, show default
            this.displayThatInputIs("default");  
        }
    },
    
    determineStatusOnActivity : function(){
        var value = this.value;
        if(value.length > 0){
            // If there is input, validate it
            this.validateTheInput();
        } else {
            // If its empty and key the input is active, just show valid
            this.displayThatInputIs("valid"); 
        }
    },
    
    validateTheInput : function(){
       if(this.inputValidationFunction == null){
            this.displayThatInputIs("valid"); 
       } else if(this.inputValidationFunction()){
            this.displayThatInputIs("valid"); 
       } else {   
            this.displayThatInputIs("invalid");  
       }
    },
    
    displayThatInputIs : function(status){
        
        if(this.currentStatus == status){
            return;   
        }
        
        keys = Object.keys(this.classes);
        total = keys.length;
        currentStatus = (this.currentStatus);
        for(index = 0; index < total; index++){
            thisKey = keys[index];
            //console.log(thisKey);
            currentClass = this.classes[thisKey][currentStatus];
            newClass = this.classes[thisKey][status];
            if(currentClass == newClass) { continue; }; // if they're equal, dont do anything
            thisElement = this.DOM[thisKey];
            elementClassContainsExpectedClass = (thisElement.className.indexOf(currentClass) > -1);
            if(!elementClassContainsExpectedClass){
                // If the element does not have the expected class inside its class name, warn client and skip
                console.log("Warning : input element without current class name, not changing class"); 
                continue;
            }
            thisElement.className = thisElement.className.replace(currentClass, newClass); // replace the old class with new class 
        }   
        
        
        this.currentStatus = status;
    },
    
}