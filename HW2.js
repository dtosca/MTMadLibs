/* HW2.js
 *
 * Homework code demonstrating: TextWidgets, ImageWidgets, 
 * VideoWidgets, JavaScriptWidgets, BookWidget.
 * Also demonstrates creating a marker sensor widget and styling using CSS.
 * 
 * 
 * Written by Margaret Flemings, Jenn Cho, and Diana Tosca
 * Updated Oct 19th 2017
 */

var root = $.app.mainLayer();


var background = createBackground("Media/background.png");

root.addChild(background);
console.log("******************background****************");

//Add a stylesheet to the app
$.app.addStyleFilename("styles.css");

var noun = "";
var verb = "";
var adj = "";
var story = "The " + noun + " goes " + verb + " every " + adj + " day.";

//Instuctions at top of book
var addHereText = new MultiWidgets.TextWidget();
addHereText.setCSSId("hereTextCenter");
addHereText.setText("Place your noun, verb, and adjective on the blue boxes!");
addHereText.addOperator(new MultiWidgets.StayInsideParentOperator());
addHereText.setLocation(root.width()/2 + 175,130);
addHereText.setWidth(500); 
addHereText.setHeight(100);
addHereText.setFixed();
root.addChild(addHereText);
addHereText.raiseToTop();

//set up box for noun which will appear where noun is placed
var nounHereText = new MultiWidgets.TextWidget();
nounHereText.setCSSId("hereText");
nounHereText.setText("");
nounHereText.addOperator(new MultiWidgets.StayInsideParentOperator());
nounHereText.setWidth(800); 
nounHereText.setHeight(100);
nounHereText.setFixed();
root.addChild(nounHereText);
nounHereText.raiseToTop();

//set up box for verb which will appear where verb is placed
var verbHereText = new MultiWidgets.TextWidget();
verbHereText.setCSSId("hereText");
verbHereText.setText("");
verbHereText.addOperator(new MultiWidgets.StayInsideParentOperator());
verbHereText.setWidth(500); 
verbHereText.setHeight(100);
verbHereText.setFixed();
root.addChild(verbHereText);
verbHereText.raiseToTop();

//set up box for adj which will appear where adj is placed
var adjHereText = new MultiWidgets.TextWidget();
adjHereText.setCSSId("hereText");
adjHereText.setText("");
adjHereText.addOperator(new MultiWidgets.StayInsideParentOperator());
adjHereText.setWidth(500); 
adjHereText.setHeight(100);
adjHereText.setFixed();
root.addChild(adjHereText);
adjHereText.raiseToTop();


var storyText = new MultiWidgets.TextWidget();
storyText.addCSSClass("story");
storyText.addOperator(new MultiWidgets.StayInsideParentOperator());
storyText.setLocation(300,200);
storyText.setWidth(500); 
storyText.setHeight(500);
storyText.setFixed();
root.addChild(storyText);
storyText.raiseToTop();


//creating a marker sensor
markerSensor();

/*
* Utility functions
*/

//Creates and returns a customized widget for the application background
//that contains an ImageWidget.
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);

	w.image = new MultiWidgets.ImageWidget();

	if (w.image.load(background)) {
	    w.image.setWidth(w.width());
	    w.image.setHeight(w.height());
    	w.image.setFixed();
    	w.image.setAutoRaiseToTop(false);
    	w.addChild(w.image);
    	w.image.raiseToTop();
	}
	
	return w;
}


// var introVid = addVideo(200, 150, 500,"Media/hwk2vid.mov");
var introVid = new MultiWidgets.VideoWidget();
introVid.setWidth(500);
introVid.setHeight(500);
if (introVid.load("Media/hwk2vid.mov")) {
		introVid.addOperator(new MultiWidgets.StayInsideParentOperator());
		//vid.resizeToFit(new Nimble.SizeF(size, size));
		introVid.setLocation(300, 150);
		introVid.setLooping(true);
		introVid.setAutoStart(true);
		introVid.setFixed();
		// introVid.setAudioEnabled(true);
		introVid.setPreviewPos(5, true); //sets preview image to 3 seond spot in video

		root.addChild(introVid);
		introVid.raiseToTop();

	}

//add book with the diff word options
var bk = new MultiWidgets.BookWidget();
if (bk.load("./Flow.book")) {
	bk.addOperator(new MultiWidgets.StayInsideParentOperator());
	bk.setAllowRotation(false);
	// bk.setColor("blue");
	bk.setLocation(300, 730);
	bk.setScale(2);
	bk.setFixed();

	root.addChild(bk);
	bk.raiseToTop();
}


/*
*
* Marker functions
*/
var isNounSelected = false;
var isVerbSelected = false;
var isAdjSelected = false;

function markerSensor() {

	var markerSensorArr = new Array();

	for (var i = 1; i < 4; ++i) {
		markerSensorArr[i] = new MultiWidgets.JavaScriptWidget();
		markerSensorArr[i].setLocation(root.width()/2 + 300, i*250);
		markerSensorArr[i].setHeight(150);
		markerSensorArr[i].setWidth(150);
		markerSensorArr[i].setFixed();
		markerSensorArr[i].setCSSId("sensor" + i);
		markerSensorArr[i].addCSSClass("SensorW");

	// noun, verb, adj
	imgArray = ["Media/hat.png", "Media/running.png", "Media/cloud.png", "Media/dancing.jpg","Media/frog.png","Media/sunny.jpg","Media/lion.png","Media/blue.png","Media/swimming.png"];

	// create boolean for whether to add or remove image widget
	var isRootChild = false;

	markerSensorArr[i].onMarkerDown(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);

		if(marker.code()==1 || marker.code()==4 || marker.code()==7 || marker.code()==8 || marker.code()==2 || marker.code()==5 || marker.code()==9 || marker.code()==3 || marker.code()==6){
			console.log("**************** marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y+" *****************");

				// create image to add on marker down and remove on marker up
				var wid = new MultiWidgets.JavaScriptWidget();
				wid.setWidth(100);
				wid.setHeight(100);
				wid.img = new MultiWidgets.ImageWidget();
				wid.img.addCSSClass("ImageW");

			// soil - hat
			if (marker.code()==1 && !isNounSelected) {
				if (wid.img.load(imgArray[0])) {
					noun = "hat";
					console.log("****NOUN CHANGED****" + noun);
					isNounSelected = true;
					// console.log("______+++++++++++++++ "+ marker.centerLocation().y);
					if (marker.centerLocation().y > 800) {
						nounHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 600) {
						nounHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						nounHereText.setLocation(root.width()/2 + 100,300);
					}
					nounHereText.setText("Noun");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(100);
				    wid.img.setHeight(100);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				    root.addChild(wid);

			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
			    		story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}
				}
			} 

			// poop - running
			if (marker.code()==4 && !isVerbSelected) {
				if (wid.img.load(imgArray[1])) {
					verb = "running";
					console.log("****VERB CHANGED****" + verb);
					isVerbSelected = true;
					if (marker.centerLocation().y > 800) {
						verbHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						verbHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						verbHereText.setLocation(root.width()/2 + 100,300);
					}
					verbHereText.setText("Verb");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				    root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
						story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}
				}
			}

			// cloudy - adj
			if (marker.code()==7 && !isAdjSelected) {
				if (wid.img.load(imgArray[2])) {
					adj = "cloudy";
					console.log("****ADJ CHANGED****" + adj);
					isAdjSelected = true;
					if (marker.centerLocation().y > 800) {
						adjnHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						adjHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						adjHereText.setLocation(root.width()/2 + 100,300);
					}
					adjHereText.setText("Adjective");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				   root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
						story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						// storyText.raiseToTop();
						introVid.removeFromParent();
						bk.removeFromParent();
					}

				}
			}

			// bricks -- dancing
			if (marker.code()==8 && !isVerbSelected) {
				if (wid.img.load(imgArray[3])) {
					verb = "dancing";
					console.log("****VERB CHANGED****" + adj);
					isVerbSelected = true;
					if (marker.centerLocation().y > 800) {
						verbHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						verbHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						verbHereText.setLocation(root.width()/2 + 100,300);
					}
					verbHereText.setText("Verb");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				   root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
						story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}

				}
			}

			//carbon dioxide -- 2 -- sunny
			if (marker.code()==2 && !isAdjSelected) {
				if (wid.img.load(imgArray[5])) {
					adj = "sunny";
					console.log("****ADJ CHANGED****" + adj);
					isAdjSelected = true;
					if (marker.centerLocation().y > 800) {
						adjHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						adjHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						adjHereText.setLocation(root.width()/2 + 100,300);
					}
					adjHereText.setText("Adjective");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				   root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
						story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}

				}
			}


			//fuel -- 5 -- frog
			if (marker.code()==5 && !isNounSelected) {
				if (wid.img.load(imgArray[4])) {
					noun = "frog";
					console.log("****NOUN CHANGED****" + noun);
					isNounSelected = true;
					if (marker.centerLocation().y > 800) {
						nounHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						nounHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						nounHereText.setLocation(root.width()/2 + 100,300);
					}
					nounHereText.setText("Noun");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				    root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
			    		story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}
				}
			}

			//lion -- water
			if (marker.code()==9 && !isNounSelected) {
				if (wid.img.load(imgArray[6])) {
					noun = "lion";
					console.log("****NOUN CHANGED****" + noun);
					isNounSelected = true;
					if (marker.centerLocation().y > 800) {
						nounHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						nounHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						nounHereText.setLocation(root.width()/2 + 100,300);
					}
					nounHereText.setText("Noun");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				    root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
			    		story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}
				}
			}

			//blue -- biomass
			if (marker.code()==3 && !isAdjSelected) {
				if (wid.img.load(imgArray[7])) {
					adj = "blue";
					console.log("****ADJ CHANGED****" + adj);
					isAdjSelected = true;
					adjHereText.setText("Adjective");
					if (marker.centerLocation().y > 800) {
						adjHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						adjHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						adjHereText.setLocation(root.width()/2 + 100,300);
					}
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				   root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
						story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}

				}
			}

			// nutrients - swimming
			if (marker.code()==6 && !isVerbSelected) {
				if (wid.img.load(imgArray[8])) {
					verb = "swimming";
					console.log("****VERB CHANGED****" + adj);
					isVerbSelected = true;
					if (marker.centerLocation().y > 800) {
						verbHereText.setLocation(root.width()/2 + 100,800);
					} else if (marker.centerLocation().y > 500) {
						verbHereText.setLocation(root.width()/2 + 100,600);
					} else if (marker.centerLocation().y > 300) {
						verbHereText.setLocation(root.width()/2 + 100,300);
					}
					verbHereText.setText("Verb");
				    wid.img.addOperator(new MultiWidgets.StayInsideParentOperator());
			    	wid.img.setWidth(200);
				    wid.img.setHeight(200);
				    wid.img.setFixed();
				    wid.addChild(wid.img);
			    	wid.img.raiseToTop();
				    root.addChild(wid);
			    	if (isNounSelected == true && isVerbSelected == true && isAdjSelected == true){
						story = "The " + noun + " goes " + verb + " every " + adj + " day.";
						storyText.setText(story);
						introVid.removeFromParent();
						bk.removeFromParent();
					}

				}
			}

				wid.raiseToTop();
				wid.setLocation(marker.centerLocation().x+130, marker.centerLocation().y-100);
				wid.img.setLocation(marker.centerLocation().x+130, marker.centerLocation().y-100);
				isRootChild = true;


		} 
	});

	markerSensorArr[i].onMarkerUp(function(id_as_string) {
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);
		if (marker.code()==1) {
			console.log("****************** marker up *******************");
		}
	});

	root.addChild(markerSensorArr[i]);
	markerSensorArr[i].raiseToTop();
	}
} // end of markerSensor()




