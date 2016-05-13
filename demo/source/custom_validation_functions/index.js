buyerValidationFunction = function(boolOnBlur){
    //console.log(this.DOM.inputElement.id);
    var id = this.DOM.inputElement.id;
    var data = id.split("_");
    var index = data[1];

    var activeRoot = data[0];
    var buyerRoot = "buyerID_"+index;
    var quantitiesRoot = "quantities_"+index;
    var buyerHandler = window["textHandlers"][buyerRoot];
    var quantHandler = window["textHandlers"][quantitiesRoot];


    if(boolOnBlur){
        /////////////////
        // If just blurred off 
        /////////////////
        if(quantHandler.value.length > 0 && buyerHandler.value.length > 0){
            quantHandler.displayThatInputIs(true);  
            setBuyerStatus = true;
        } else if (quantHandler.value.length > 0){
            quantHandler.displayThatInputIs(true);  
            setBuyerStatus = false;
        } else if (buyerHandler.value.length > 0){
            quantHandler.displayThatInputIs(false);  
            setBuyerStatus = true;
        } else {
            quantHandler.displayThatInputIs(null);  
            setBuyerStatus = null;
            if(index != 0){
                // if the fields are extra fields, and user left the field empty, remove the fields
                extraBuyerHandler.removeExtra(index);
            }
        }
        return setBuyerStatus;
    }


    quantHandler.displayThatInputIs(true);  
    return true;
};

quantitiesValidationFunction = function(boolOnBlur){
    //console.log(this.DOM.inputElement.id);
    var id = this.DOM.inputElement.id;
    var data = id.split("_");
    var index = data[1];

    var activeRoot = data[0];
    var buyerRoot = "buyerID_"+index;
    var quantitiesRoot = "quantities_"+index;
    var buyerHandler = window["textHandlers"][buyerRoot];
    var quantHandler = window["textHandlers"][quantitiesRoot];

    if(boolOnBlur){
        /////////////////
        // If just blurred off 
        /////////////////
        if(quantHandler.value.length > 0 && buyerHandler.value.length > 0){
            buyerHandler.displayThatInputIs(true);  
            setQuantStatus = true;
        } else if (quantHandler.value.length > 0){
            buyerHandler.displayThatInputIs(false);  
            setQuantStatus = true;
        } else if (buyerHandler.value.length > 0){
            buyerHandler.displayThatInputIs(true);  
            setQuantStatus = false;
        } else {
            buyerHandler.displayThatInputIs(null);  
            setQuantStatus = null;   
            if(index != 0){
                // if the fields are extra fields, and user left the field empty, remove the fields                                   
                extraBuyerHandler.removeExtra(index);
            }
        }
        return setQuantStatus;
    }


    if(buyerHandler.value.length == 0){
        buyerHandler.displayThatInputIs(false);  
    } else {
        buyerHandler.displayThatInputIs(true); 
    }
    return true;
};