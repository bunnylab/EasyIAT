/*
Copyright © 2014 Graham Thompson <grahamwt42@gmail.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
*/


//Base function for displaying the IAT trial screens
//
//Clears the screen and draws the base, target categories and target passed to the function
//as well as instructions.  Starts a window performance timer to record the time
//to a correct response.  Spawns a keydown timer to listen for the E or I keys with the 
//corresponding targets and appends the trial data and ms response time to a data array if 
//correct.  Displays an x and waits for the correct response otherwise.  
function iatBase(categories, target, instruct)  {
	
  //Get the canvas element and context, clear any previous junk
  var c = document.getElementById("mainCanvas");
  var ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.fillStyle="black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
  console.log(categories);
  console.log(target);
  console.log(trialInstructions);
	
  //Draw the two base categories
  ctx.font = "50px Arial";
  ctx.textAlign = 'left';
  ctx.fillStyle = 'green';
  ctx.fillText(categories.Position1, ctx.canvas.width/20 , ctx.canvas.height/10);
  ctx.textAlign = 'right';
  ctx.fillText(categories.Position2, ctx.canvas.width/1.05 , ctx.canvas.height/10);
    
  //Draw the instructions
  ctx.font = "25px Arial";
  ctx.textAlign = 'center';
  ctx.fillStyle = 'green';
  ctx.fillText(instruct.line1, ctx.canvas.width/2 , ctx.canvas.height/1.2);
  ctx.fillText(instruct.line2, ctx.canvas.width/2 , ctx.canvas.height/1.1);
  
  //Draw the target category 
  //The side of the screen that the target category appears on is randomized
  //at the start of the experiment using a global variable that is randomly 
  //assigned a 0 or 1 value when the website is loaded
  ctx.fillStyle = 'white';
  ctx.font = "50px Arial";
  
  if (targetSide == 1) {
	  ctx.textAlign = 'right';
	  ctx.fillText(categories.Target1, ctx.canvas.width/1.05 , ctx.canvas.height/5);
	  ctx.textAlign = 'left';
	  ctx.fillText(categories.Target2, ctx.canvas.width/20 , ctx.canvas.height/5);
	  }
  else {
	  ctx.textAlign = 'right';
	  ctx.fillText(categories.Target2, ctx.canvas.width/1.05 , ctx.canvas.height/5);
	  ctx.textAlign = 'left';
	  ctx.fillText(categories.Target1, ctx.canvas.width/20 , ctx.canvas.height/5);
  }
    
  //Draw the target stimuli
  //
  //The targets string for each stimuli contains an identifier that specifies if its
  //an image or a text stimuli followed by the actual text or the image location and
  //the correct response type for that category.  Split and store in variables.
  var targetString = target.split(",");    
  var targetIdentifier = $.trim(targetString[0]);
  var targetValue = $.trim(targetString[1]);
  var correctCategory = $.trim(targetString[2]);
  
  //If target is text draw text if its an image draw an image otherwise stop with an error  
  if(targetIdentifier == 'txt') {
	  ctx.font = "60px Arial";
	  ctx.textAlign = 'center';
	  ctx.fillText(targetString[1], ctx.canvas.width/2 , ctx.canvas.height/2);
	  var width = ctx.measureText(targetString[1]).width
	  var height = ctx.measureText('M').width    //a horrible horrible hack
	  iatStart(width, height)  //callback function
    }
  else if (targetIdentifier == 'img') {
	  var imageObj = new Image();
	  
      imageObj.onload = function() {
	      var width = imageObj.naturalWidth;
		  var height = imageObj.naturalHeight;
	  	  ctx.drawImage(imageObj, (ctx.canvas.width - width)/2 , (ctx.canvas.height - height)/2);
		  iatStart(width, height)  //callback function
      };
      imageObj.src = targetValue;
	  	  
    }
   else {
	  alert("There is an error in the type configuration of your target file");
	}
  
  //An inner callback function we use to wait for the stimuli images to finish loading before we 
  //begin the main portion of the trial, takes the height and width of stimuli as an argument
  function iatStart(width, height)  {
	  
	   //Start the timer for the trial
	  //We put this after all the drawing code so that load times are not included in our numbers.  
	  var startTime = window.performance.now();
	  
	  //Start a timeout timer that alerts and restarts trial times if they take longer than 2 seconds
	  var timeout = setTimeout(function(){
		alert("Please respond quickly and accurately. \nYour successful completion of this task depends on your speed and accuracy.");
		startTime = window.performance.now();}, 5000);
	  
	  //Start the keydown listener
	  //Triggers everytime a key is pressed but only responds to E and I
	  //Returns to the trialController function on correct response.
	  window.addEventListener('keydown', function(e)
	  {
		var code = e.keyCode;
		var stopTime = window.performance.now();
		
		//Key is E and target stimuli goes with base category1 (drawn on left)
		if (code == 69 && (correctCategory==categories.Position1) ) {
			this.removeEventListener('keydown',arguments.callee,false);
					
			experimentData.push(String(blockData[0]) + "," + categories.Position1 + "," + categories.Position2 + "," +
				categories.Target1 + "," + categories.Target2 + "," + String( targetSide ) + "," +   
				target + "," + String( (stopTime - startTime) ) + "\n");
			
			//Clear screen and timeout and wait 500 ms before next trial
			ctx.fillStyle="black";
			ctx.fillRect((ctx.canvas.width/2)-width/2 , (ctx.canvas.height/2)-height, width*1.5, height*1.5);  //dear future self, sorry about this one 
			clearTimeout(timeout);
			console.log("clearing");
			
			setTimeout(function() {
				trialController();
					},postTrialPause)
			
			}
		
		//Key is I and target stimuli goes with base category2 (drawn on right)
		else if (code == 73 && (correctCategory==categories.Position2) ) {
			this.removeEventListener('keydown',arguments.callee,false);
					
			experimentData.push(String(blockData[0]) + "," + categories.Position1 + "," + categories.Position2 + "," +
				categories.Target1 + "," + categories.Target2 + "," + String( targetSide ) + "," +   
				target + "," + String( (stopTime - startTime) ) + "\n");
				
			//Clear screen and wait 500 ms before next trial
			ctx.fillStyle="black";
			ctx.fillRect((ctx.canvas.width/2)-width/2 , (ctx.canvas.height/2)-height, width*1.5, height*1.5);
			clearTimeout(timeout);
			console.log("clearing");
			
			setTimeout(function() {
				trialController();
					},postTrialPause)
			}
		
		//Key is E and target stimuli goes with target category drawn on the same side
		else if (code == 69 && ( (correctCategory=='Target1' && targetSide==0) || (correctCategory=='Target2' && targetSide==1) ) ) {
			this.removeEventListener('keydown',arguments.callee,false);
					
			experimentData.push(String(blockData[0]) + "," + categories.Position1 + "," + categories.Position2 + "," +
				categories.Target1 + "," + categories.Target2 + "," + String( targetSide ) + "," +   
				target + "," + String( (stopTime - startTime) ) + "\n");
			
			//Clear screen and wait 500 ms before next trial
			ctx.fillStyle="black";
			ctx.fillRect((ctx.canvas.width/2)-width/2 , (ctx.canvas.height/2)-height, width*1.5, height*1.5);
			clearTimeout(timeout);
			console.log("clearing");
			
			setTimeout(function() {
				trialController();
					},postTrialPause)
			}
		
		//Key is I and target stimuli goes with target category drawn on the same side
		else if (code == 73 && ( (correctCategory=='Target2' && targetSide==0) || (correctCategory=='Target1' && targetSide==1) ) ) {
			this.removeEventListener('keydown',arguments.callee,false);
					
			experimentData.push(String(blockData[0]) + "," + categories.Position1 + "," + categories.Position2 + "," +
				categories.Target1 + "," + categories.Target2 + "," + String( targetSide ) + "," +   
				target + "," + String( (stopTime - startTime) ) + "\n");
			
			//Clear screen and wait 500 ms before next trial
			ctx.fillStyle="black";
			ctx.fillRect((ctx.canvas.width/2)-width/2 , (ctx.canvas.height/2)-height, width*1.5, height*1.5);
			clearTimeout(timeout);
			console.log("clearing");
			
			setTimeout(function() {
				trialController();
					},postTrialPause)
			}
		
		//Keypress was incorrect
		//Draw a red x and restart timer
		else {
		   startTime = stopTime;
			
		   ctx.font = "80px Arial";
		   ctx.textAlign = 'center';
		   ctx.fillStyle = 'red';
		   ctx.fillText('X', ctx.canvas.width/2 , ctx.canvas.height/1.5);
		}
	  
	  },false);

	  }
}



//Function for controlling all IAT trials in each block
//
//Basically just randomly selects targets to feed to the baseIAT function
//until its done all the trials for the block. Then calls the instruction
//screen function with the end of block message.  InstructionScreen returns
//execution to the block controller.
function trialController()  {
	
	console.log("Trial controller starting");
	
		
	//Calls the baseIat function while there are still trials left in block
	if(trialsInBlock > 0) {
		var target;
		//If alternating flag is set pick randomly from each list every other trial
		if(alternating == "yes") {
			if( (trialsInBlock % 2) == 1 ) { 
				target = targetArray1[Math.floor(Math.random()*targetArray1.length)];  
			}
			else {                           
				target = targetArray2[Math.floor(Math.random()*targetArray2.length)]; 
			}
		}
		//If alternating flag is not set pick only from first list
		else {
			target = targetArray1[Math.floor(Math.random()*targetArray1.length)];
			}
		
		trialsInBlock = trialsInBlock - 1;  //decrement number of trials remaining
		
		//start the trial
		iatBase(trialCategories, target, trialInstructions);
		}
	
	else  {
		console.log('Trial Controller finished');
		//Remove the block we just finished from the array and
		//recursively call the blockController function
		blockData.splice(0, 1);
				
		//Call the instruction screen function with provided inputs to draw
		//between block instruction screens which then passes control back to the block controller
		instructionScreen(endInstructions);
			
		}		
		
}

//Function for controlling the experimental blocks
//
//Uses recursive calls to the function to iterate through all blocks listed in the main
//config file, loading their individual configuration files and calling the trial controller
//for each.  
function blockController(blockData)  {
     
  if(blockData.length > 0)  {
    
	var blockName = blockData[0];
	var blockConfigFile = 'config/' + blockName + '/' + 'blockConfig.cfg';
					
	//Make a jquery call to load the block configuration and targets then pass them
	//to the trialController
	$.when(
		$.get(blockConfigFile, function(data){
			blockConfig = JSON.parse(data);
			console.log(blockConfig);
	})
	).then(function()  {
		targetArray1 = blockConfig.targets1;
		targetArray2 = blockConfig.targets2;
		alternating = blockConfig.alternating;
		trialsInBlock = blockConfig.numberOfTrials;
		trialCategories = blockConfig.categories;
		trialInstructions = blockConfig.trialInstructions;
		endInstructions = blockConfig.blockEndInstructions;
		
		//If the block file says so flip the target categories sides using xor on the global var
		if(blockConfig.flipTargetCategories == "yes") {
			targetSide = targetSide ^ 1;
			}
						
		trialController();
	});
  }  

  //Section that runs after all blocks are exhausted
  //creates a random stamp and saves data to the output file
  else  {
	
	randStamp = Math.floor(Math.random()*10000);
				
	$.ajax
	({
		type: "POST",
		url: localServerPath + "/savefile.php",                
		data: {"id" : 1, "message" : experimentData, "stamp" : randStamp},
		success: function (data) {
			endScreen(randStamp);
			}
		});
	
	}
 }
 

//Load the configuration data and stimuli lists for the IAT from file
//when the document first loads
function loadConfig() {
	
	$.when(
		$.get('config/iat_config.cfg', function(data){
			mainCfg = JSON.parse(data);
			
			//Initialize global variables for config information
			localServerPath = mainCfg.localServerPath;
			blockData = mainCfg.blockDirs;
			introScreenText = mainCfg.introScreen;
			instructionScreenText = mainCfg.instructionScreen;
			endScreenText = mainCfg.endScreen;
			postTrialPause = mainCfg.postTrialPause;
					
			} )
		).then(function() {
			console.log("configuration file loaded");
			introScreen();
			})
	
}

//Function to control the appearance and function of the title screen
function introScreen() {
  
  //Get the canvas element and context, clear any previous junk
  var c = document.getElementById("mainCanvas");
  var ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  ctx.fillStyle="black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  //Draw the title and text
  ctx.font = "30px Arial";
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.fillText(introScreenText.line1,ctx.canvas.width/2, ctx.canvas.height/2.5);
  
  ctx.font = "20px Arial";
  ctx.fillText(introScreenText.line2,ctx.canvas.width/2, ctx.canvas.height/2);
  
  console.log(ctx.canvas.width/2);
  
  //Event listener for keydown with anonymous function for advancing 
  window.addEventListener('keydown', function(e)
  {
	var code = e.keyCode;
	
	if (code == 32) {
		this.removeEventListener('keydown',arguments.callee,false);
        instructionScreen(instructionScreenText);
		return;
		}
    else  {
        alert("Please only press the instructed keys.");
		}
		
  },false);
  
}

//Function to control the appearance and function of the instruction screens
//Called for the initial instruction screen then with different arguments at the end of
//every trial controller block
function instructionScreen(instructionText)  {
   
  //Get the canvas element and context, clear any previous junk
  var c = document.getElementById("mainCanvas");
  var ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  ctx.fillStyle="black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
  //Draw the instructions for the rest of the experiment
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(instructionText.line1,ctx.canvas.width/2, ctx.canvas.height/10);
  
  ctx.font = "20px Arial";
  ctx.textAlign = 'left';
  wrapText(ctx, instructionText.line2, ctx.canvas.width/15, ctx.canvas.height/6, (ctx.canvas.width - ctx.canvas.width/10), 25 );

  //Draw the ending text
  ctx.font = "25px Arial";
  ctx.textAlign = 'center';
  ctx.fillText(instructionText.line3,ctx.canvas.width/2, ctx.canvas.height/1.1);
  
  //Event listener for keydown with anonymous function for advancing 
  window.addEventListener('keydown', function(e)
  {
	var code = e.keyCode;
	if (code == 32)  {
		this.removeEventListener('keydown',arguments.callee,false);
        
		//instructions.splice(0, 1);
		blockController(blockData);
		return;
		}
    else  {
        alert("Please only press the instructed keys.");
		}
		
  },false);

}

//Function to control the appearance and function of the final screen
function endScreen(randCode) {
  
  //Get the canvas element and context, clear any previous junk
  var c = document.getElementById("mainCanvas");
  var ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  ctx.fillStyle="black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
  //Draw the title
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(endScreenText.line1,ctx.canvas.width/2, ctx.canvas.height/10);
  
  //Draw the final instructions     
  ctx.font = "20px Arial";
  ctx.textAlign = 'left';
  wrapText(ctx, endScreenText.line2, ctx.canvas.width/15, ctx.canvas.height/6, (ctx.canvas.width - ctx.canvas.width/10), 25 );

  //Draw the ending text
  ctx.font = "60px Arial";
  ctx.textAlign = 'center';
  ctx.fillText(String(randCode),ctx.canvas.width/2, ctx.canvas.height/1.1);
  
}



//Utility function for wrapping text in a html5 canvas
//modified from example by Mitesh Maheta, a real og
function wrapText(context, text, x, y, maxWidth, lineHeight) {
		var paragraphs = text.split("\n");
        
		for(var m = 0; m < paragraphs.length; m++) {
			var words = paragraphs[m].split(" ");
			var line = "";
			
			for(var n = 0; n < words.length; n++) {
			  var testLine = line + words[n] + " ";
			  var metrics = context.measureText(testLine);
			  var testWidth = metrics.width;
			  if(testWidth > maxWidth) {
				context.fillText(line, x, y);
				line = words[n] + " ";
				y += lineHeight;
			  }
			  else {
				line = testLine;
			  }
			}
			context.fillText(line, x, y);
			y += lineHeight;
		}
}

//Global Variables
//
//Configuration data
var blockData = new Array();
var localServerPath;
var postTrialPause;
var targetSide = Math.floor(Math.random()*2);  //randomly places the target category on one side

//Experiment data
var experimentData = new Array();

//Instruction texts - this is a messy way to do it but we'll fix it later 
var introScreenText;
var instructionScreenText;
var endScreenText;

//Block Configuration Data
//set every new block by the block controller
var targetArray1;
var targetArray2;
var alternating;
var trialsInBlock;
var trialCategories;
var trialInstructions;
var endInstructions;


//Execution of the program starts here
$(document).ready(loadConfig);
