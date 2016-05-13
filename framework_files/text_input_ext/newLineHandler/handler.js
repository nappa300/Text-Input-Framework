function global_textNewLineHandler (ID, parentID){
    this.thisID = ID;
    this.parentID = parentID;
    this.textHandler = null;
    this.inputValidationFunction = null;
}


global_textNewLineHandler.prototype = {
    removeLineFromParent : function(){
        indexToRemove = window["textHandlersOrdered"].indexOf(this.textHandler);
        window["textHandlersOrdered"].splice(indexToRemove, 1);
        
        parentNode = document.getElementById(this.parentID +  "_mainHolder");
        thisNode = document.getElementById(this.thisID + "_" + "newLineHolder");
        parentNode.removeChild(thisNode);
    },
    appendLineToParent : function(){
        theID = this.thisID;
        
        newLineTemplate = global_textInputExtension_newLineTemplate;
        node = newLineTemplate.returnNode(theID);
        document.getElementById(this.parentID+"_mainHolder").appendChild(node);
        
        //////////////////////
        // Initialize Text Handler
        //////////////////////
        var thisHandler = new global_textHandler();
        thisHandler.DOM.inputElement = document.getElementById(theID + "_"+"inputElement");
        thisHandler.DOM.inputHolder = document.getElementById(theID + "_"+"inputHolder");   
        thisHandler.DOM.labelHolder = document.getElementById(this.parentID + "_"+"labelHolder");
        thisHandler.inputValidationFunction = this.inputValidationFunction;
        thisHandler.labelManager = window["labelManagers"][this.parentID];
        thisHandler.initialize();
        
        //////////////////////
        // Attach textHandler to newLineHandler
        //////////////////////
        this.textHandler = thisHandler;
        
        //////////////////////
        // Add this textHandler to labelManager
        //////////////////////
        window["labelManagers"][this.parentID].textHandlers.push(thisHandler);
        
        //////////////////////
        // Initialize Display of Elements
        //////////////////////
        document.getElementById(theID + "_" + "inputElement").className += " " + thisHandler.classes.inputElement.default;
        document.getElementById(theID + "_" + "inputHolder").className += " " + thisHandler.classes.inputHolder.default;
        
        //////////////////////
        // globalize the elements
        //////////////////////
        if(window["textHandlers"] == undefined){
            window["textHandlers"] = {};   
        }
        window["textHandlers"][theID] = thisHandler;
        if(window["textHandlersOrdered"] == undefined){
            window["textHandlersOrdered"] = [];   
        }
        window["textHandlersOrdered"].push(thisHandler);
        if(window["textNewLineHandler"] == undefined){
            window["textNewLineHandler"] = {};   
        }
        window["textNewLineHandler"][theID] = this;   
    },
    
}