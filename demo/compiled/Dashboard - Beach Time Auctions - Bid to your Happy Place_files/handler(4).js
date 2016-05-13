///////////////////////
// Change Tab and Enter to list through the form, change shift enter to submit function
///////////////////////

var global_formMovementManager = {
    //console.log(window["textHandlersOrdered"]);
    
    elements : null,
    textInputs : {},
    keyMap : [],
    makingAMoveForward: false,
    
    
    initialize : function(){
        this.elements = window["textHandlersOrdered"];
        elements = this.elements;
        total = elements.length;
        for(index = 0; index < total; index++){
            thisTextElement = elements[index].DOM.inputElement;
            //this.keyBindingHandler(event).bind(this)
            //console.log(index);
            (function(index, thisTextElement){
                thisTextElement.addEventListener("keydown", function(){ global_formMovementManager.mapKey(event, index); }, true);
                thisTextElement.addEventListener("keydown", function(){ global_formMovementManager.keyBindingHandler(event, index, thisTextElement); }, true);
                thisTextElement.addEventListener("keyup", function(){ global_formMovementManager.mapKey(event, index); }, true);
            })(index, thisTextElement);
        }
    },
    
    keyBindingHandler : function(event, index, thisTextElement){
        /////////
        // Detect Shift Codes first 
        /////////
        thisMap = this.keyMap;
        if(event.keyCode == 8 && thisTextElement.selectionStart == 0 && thisTextElement.selectionEnd == 0){
            goTo = parseInt(index) - 1;
            this.goToElement(goTo);
            event.preventDefault(); // prevent from deleting all content due to backspace press, and goToElement .select()'ing the input
        } else if(thisMap[16]){
            if(thisMap[13] || thisMap[9]){
                goTo = parseInt(index) - 1;
                this.goToElement(goTo);
            }
        } else {
            if(thisMap[13] || thisMap[9]){
                goTo = parseInt(index) + 1;
                var moved = this.goToElement(goTo);
                if(moved){
                    this.makingAMoveForward = true;   
                }
            }
        }
        
        //console.log(index);
    },
        
    mapKey : function(event, index){
        keyCode = event.keyCode;
        trackKey = keyCode == 13 || keyCode == 9 || keyCode == 16;
        if(!trackKey){ //only run if its a special key
            return;
        }
        this.makingAMoveForward = false;
        event.preventDefault(); // prevent tab from working
        this.keyMap[keyCode] = event.type == 'keydown';
        //console.log(index + " - " + keyCode + " - " + this.keyMap[keyCode]);
    },
    
    goToElement : function(index){
        //console.log(this.elements[goTo]);
        if(this.elements[goTo] !== undefined){
            var element = this.elements[goTo].DOM.inputElement;
            element.select();
            return true;
        }
        return false;
    },
    
}