function global_textHandler (){
    ////////////////////
    // Constants defined externally
    ////////////////////
    this.inputValidationFunction = null;
    this.DOM = {}; // used also with coordination of classes, if defined in classes must be defined in DOM
    this.labelManager = null;
    
    ////////////////////
    // Internally defined constants
    ////////////////////
    this.currentStatus = "default";
}

global_textHandler.prototype = {
 
    ////////////////////
    // Constants Re-Defined in init.js
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
    
    get status(){
        return this.currentStatus;   
    },
    
    get value () {
        return this.DOM.inputElement.value;
    },
    
    initialize : function(){
        // console.log(this.DOM.inputElement);
        this.DOM.inputElement.onfocus = (function(){ this.determineStatusOnActivity(); }).bind(this);
        this.DOM.inputElement.onkeyup = (function(){ this.determineStatusOnActivity(); }).bind(this);
        this.DOM.inputElement.onblur = (function(){ this.determineStatusOnBlur(); }).bind(this);
    },
    
    determineStatusOnBlur : function(){
        var value = this.value;
        if(value.length > 0 || this.inputValidationFunction !== null){
            // If there is input, validate it or a specified validation function
            this.validateTheInput(true);
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
        if(value.length > 0 || this.inputValidationFunction !== null){
            // If there is input, validate it or a specified validation function
            this.validateTheInput();
        } else {
            // If its empty and key the input is active, just show valid
            this.displayThatInputIs("valid"); 
        }
    },
    
    validateTheInput : function(boolOnBlur){
       if(this.inputValidationFunction == null){
            this.displayThatInputIs("valid"); 
       } else { 
           var status = this.inputValidationFunction(boolOnBlur);
           if(status == null){
                this.displayThatInputIs("default"); 
           } else if(status == true){
                this.displayThatInputIs("valid"); 
           } else {   
                this.displayThatInputIs("invalid");  
           }
      }
    },
    
    displayThatInputIs : function(status){
        if(status == null){
            status = "default";   
        } else if (status == true){
            status = "valid";   
        } else if (status == false){
            status = "invalid";   
        }
        if(this.currentStatus == status){
            return;   
        }
        
        if(status == "default" && this.required == true){
            // if this is a required field, it should never go back to default, it should go to invalid 
            status = "invalid";
        }
        
        keys = Object.keys(this.classes);
        total = keys.length;
        currentStatus = (this.currentStatus);
        for(index = 0; index < total; index++){
            thisKey = keys[index];
            if(thisKey == "labelHolder"){
                console.log("Warning : labelHolder was set in DOM");
            } else {
                this.changeDisplayStatusFromTo(thisKey, currentStatus, status);
            }
        }   
        this.currentStatus = status;
        
        
        ///////////////////////
        // LabelHolder is parsed seperately due to cases when multiple inputs fall under the same label
        ///////////////////////
        this.labelManager.changeDisplayStatusFromTo(status);
    },
    
    changeDisplayStatusFromTo : function(thisKey, fromStatus, toStatus){
        currentStatus = fromStatus;
        status = toStatus;

        //console.log(thisKey);
        currentClass = this.classes[thisKey][currentStatus];
        newClass = this.classes[thisKey][status];
        if(currentClass == newClass) { return; }; // if they're equal, dont do anything
        thisElement = this.DOM[thisKey];
        if(thisElement == undefined){
            // if the DOM element was never defined, warn user and skip;
            //console.log("Warning : element for " + thisKey + " was never defined or does not exist, skipping"); 
            return;
        }
        elementClassContainsExpectedClass = (thisElement.className.indexOf(currentClass) > -1);
        if(!elementClassContainsExpectedClass){
            // If the element does not have the expected class inside its class name, warn client and skip
            console.log("Warning : input element without current class name, not changing class"); 
            return;
        }
        // Action
        thisElement.className = thisElement.className.replace(currentClass, newClass); // replace the old class with new class 
    },
    
    
}