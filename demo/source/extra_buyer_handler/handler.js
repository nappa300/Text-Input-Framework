 var extraBuyerHandler = {
                                activeExtras : 0,
                                buyerRoot : "buyerID_",
                                quantRoot : "quantities_",
                                buyerFunc : buyerValidationFunction, // globally defined, included in custom_validation_functions/index.js
                                quantFunc : quantitiesValidationFunction, // globally defined, included in custom_validation_functions/index.js
                                
                                initialize : function(){
                                    index = 0;
                                    
                                    thisRoot = this.buyerRoot;
                                    id = thisRoot + index;
                                    (function(id, index){
                                        document.getElementById(id+"_inputElement").addEventListener("keyup", function(){ this.checkIfNeedNew(event, index); }.bind(this), true);
                                    }.bind(this))(id, index);
                                    
                                    thisRoot = this.quantRoot;
                                    id = thisRoot + index;
                                    (function(id, index){
                                        document.getElementById(id+"_inputElement").addEventListener("keyup", function(){ this.checkIfNeedNew(event, index); }.bind(this), true);
                                    }.bind(this))(id, index);
                                },
                                
                                addExtra : function(){
                                    var index = this.activeExtras = this.activeExtras + 1;
                                    var thisRoot = this.buyerRoot;
                                    var thisFunc = this.buyerFunc;
                                    this.addNewLine(index, thisRoot, thisFunc);
                                    var thisRoot = this.quantRoot;
                                    var thisFunc = this.quantFunc;
                                    this.addNewLine(index, thisRoot, thisFunc);
                                    (function(id, index){
                                        document.getElementById(id+"_inputElement").addEventListener("keyup", function(){ this.checkIfNeedNew(event, index); }.bind(this), true);
                                    }.bind(this))(this.quantRoot+index, index);
                                    var thisRoot = this.buyerRoot;
                                    window["textHandlers"][thisRoot+index].DOM.inputElement.focus();
                                    global_formMovementManager.initialize();
                                },
                                
                                checkIfNeedNew : function(event, index){
                                    if(event.keyCode == 13 && index == this.activeExtras && global_formMovementManager.makingAMoveForward == false){
                                        //console.log("add an extra");
                                        this.addExtra();   
                                    }
                                },
                                
                                removeExtra : function(index){
                                    // dont actually remove active extras count, that way we can remove elements from mid field. 
                                    //      just handle having fully empty extraBuyers as not having the line
                                    var thisRoot = this.buyerRoot;
                                    var thisFunc = this.buyerFunc;
                                    this.removeLine(index, thisRoot);
                                    var thisRoot = this.quantRoot;
                                    var thisFunc = this.quantFunc;
                                    this.removeLine(index, thisRoot);
                                    
                                    var thisRoot = this.quantRoot;
                                    var prevIndex = parseInt(index) - 1;
                                    window["textHandlers"][thisRoot+prevIndex].DOM.inputElement.focus();
                                    
                                },
                                
                                addNewLine : function(index, root, func){
                                    var newLine = new global_textNewLineHandler(root+index, root+"0");
                                    newLine.inputValidationFunction = func;
                                    newLine.appendLineToParent();
                                },
                                removeLine : function(index, root){
                                    //console.log(root+index);
                                    window["textNewLineHandler"][root+index].removeLineFromParent();
                                    if(index == this.activeExtras){
                                        this.activeExtras --;   
                                    }
                                }
                                
                                
                            };