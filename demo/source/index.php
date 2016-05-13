<?php 
/////////////////////////////////////////////
// Sets Global Variables and Functions
/////////////////////////////////////////////
require_once($_SERVER["DOCUMENT_ROOT"] . "/../notpublic/config.php");
//////////////
initializeScriptType("VIEW", "secure");
///////////////////////////////////////////// 
?>
<html>
    <head>
        <!-- load header and always required globals -->
        <title>Dashboard - Beach Time Auctions - Bid to your Happy Place</title>
        <?php require_once( PUBLIC_ROOT . "/mGlobal/header/header.php"); ?>
        
        <!-- due to using text_input -->
        <?php require_once( PUBLIC_ROOT . "/mGlobal/inputs/text/include.php"); ?>
        <script src = 'custom_validation_functions/index.js'></script>
        <script src = 'form_movement_manager/handler.js'></script>
        <script src = 'extra_buyer_handler/handler.js'></script>
    </head>

    
    
    <body>
        <div style = 'position:absolute; top:0; left:0; right:0; min-height:100%;' class = ''>
            
            
                <div class = 'flexme ' style = 'width:100%; padding:15px 0px;'>
                    <div style = 'margin:Auto;' class = ' '>
                        <div style = 'text-align:Center; font-size:21px;'>
                            Record Live Auction
                        </div>
                        <div style = 'margin-top:5px;'></div>
                        <div style = 'width:100%;' class = 'flexme unselectable'>
                            <div style = 'margin:auto;'>
                                <img src = '/img/recordWBandC.png' style = 'height:75px;'>
                            </div>
                        </div>
                    </div>
                </div>
            <div style = 'height:35px;'></div>
                

                
                <!-- Begin Input Form -->
                <div style = 'width:100%;' class = 'flexme'>
                    <div class = '' style = 'font-size:18px;max-width:700px; width:100%; min-width:300px; margin:auto; '>
                    <div style = 'padding:15px 30px; '>
   
                        
                        <?php 
                            $details = array(
                                "id" => "vendorID",
                                "label" => "Vendor ID",
                                "prefix" => "",
                                "placeholder" => "",
                                "required" => true,
                            );
                            print returnTextInput($details, true); 
                        ?>
                        <div style = 'height:25px;'></div>
                        <?php 
                            $details = array(
                                "id" => "description",
                                "label" => "Description",
                                "prefix" => "",
                                "placeholder" => "",
                                "required" => true,
                            );
                            print returnTextInput($details, true); 
                        ?>
                        <div style = 'height:25px;'></div>
                        <?php 
                            $details = array(
                                "id" => "totalUnits",
                                "label" => "Total Units",
                                "subLabel" => "optional",
                                "prefix" => "",
                                "placeholder" => "",
                                "required" => false,
                            );
                            print returnTextInput($details, true); 
                        ?>
                        <div style = 'height:25px;'></div>
                        
                        <div style = 'width:100%; border:0px;  padding:5px 0px; font-size:16px;  color:black;' class = 'flexme'>
                            <div style = 'width:250px;'>
                                <?php 
                                    $details = array(
                                        "id" => "buyerID_0",
                                        "label" => "Buyer ID",
                                        "subLabel" => "",
                                        "prefix" => "",
                                        "placeholder" => "",
                                        "required" => true,
                                        "validationFunction" => "buyerValidationFunction",
                                    );
                                    print returnTextInput($details, true); 
                                ?>
                            </div>
                            <div style = 'padding:0px 15px; width:15px;' class = 'flexme'>
                            </div>
                            <div style = 'width:250px;'>
                                <?php 
                                    $details = array(
                                        "id" => "quantities_0",
                                        "label" => "Quantities",
                                        "subLabel" => "",
                                        "prefix" => "",
                                        "placeholder" => "",
                                        "required" => true,
                                        "validationFunction" => "quantitiesValidationFunction",
                                    );
                                    print returnTextInput($details, true); 
                                ?>
                            </div>
                            
                        </div>
                        
                        
                        <!--
                        <div class = 'flexme ' style = 'width:100%;'>
                            <div id = 'signinButton' 
                                 class = 'flexme unselectable sandButton' 
                                 style = 'min-width:175px; max-width:300px; width:100%; height:35px; padding:5px; margin:auto;'>
                                <div style = 'margin:auto;' class = '' id = 'signinButton-inputText'>Enter</div>
                                <div style = 'margin:auto;' class = 'disnon' id = 'signinButton-loadingImageHolder'>
                                    <div style = 'margin:auto;'>
                                        <div class="spinner" style = 'margin-top:7px;'>
                                          <div class="dot1"></div>
                                          <div class="dot2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <script>
                                /*
                                signinButton_handler = global_buttonHandler.new();
                                signinButton_handler.mainHolder = document.getElementById("signinButton"); 
                                signinButton_handler.classes = {default : "sandButton", static : "sandButtonStatic", root : "flexme unselectable"};
                                signinButton_handler.textHolder = document.getElementById("signinButton-inputText");
                                signinButton_handler.loadingImageHolder = document.getElementById("signinButton-loadingImageHolder");
                                signinButton_handler.devmode = false;
                                */
                            </script>
                        </div>
                        -->
                        
                        <script>
                            extraBuyerHandler.initialize();
                            //document.getElementById("quantities_1"+"_inputElement").addEventListener("keyup", function(){ console.log("Hella"); }, true);
                            global_formMovementManager.initialize();
                        </script>

                    </div>    
                    </div>
                </div>
                <!-- end input form -->
        </div>
    </body>    

</html>