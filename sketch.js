/*
Oakley Thomas
oakleythomas2020@gmail.com
302-448-0781

DMS 121/ Bernard Dolecki/ University at Buffalo/ Spring 2021

This is a user experience focused on manipulation of audio and visuals through a usb guitar input. The project does not follow a linear path and allows for a unique experience with each use. For the most immersive experience, the user should experiment with both the visual and auditory aspects to create abstract art in combination with user generated music.

All code, audio, and visuals are original and have been developed by myself.

EXCEPTION:
Lines 333 - 364 
https://dev.to/alvaromontoro/develop-a-rock-band-game-with-html-and-javascript-in-10-minutes-26kc
*/


//variable created to hold the gamepads' unique identifiers
const gamepads = {};
//variable that tracks which buttons are being played
const activeNotes = {};

//canvas variables
let canvasHeight = 768;
let canvasWidth = 1366;

//scene variables
let scene = "title";

//background variables
var currentBackground;
var city;

//note variables
var G, Asharp, C, D, F;

//dancing man variables
var w = 494/3 //width
var h = 553/3 //height
var dmX = canvasWidth/2 - w/2 //xLocation
var dmY = canvasHeight - h //yLocation

//note image variables
    //Standard Colors
var G1, G2, G3, R1, R2, R3, Y1, Y2, Y3, B1, B2, B3, O1, O2, O3;
    //Pastels
var PG1, PG2, PG3, PR1, PR2, PR3, PY1, PY2, PY3, PB1, PB2, PB3, PO1, PO2, PO3

var pointer;
var randomSize = getRandomInt(3);
var xPos = dmX + (w/2);
var yPos = dmY + (h/2);
var myShooterDegrees = 0;
var myNoteShooter;
var upperBound = -225;
var lowerBound = -45
var pointerDirection = "RIGHT"
var shooterRadius = 60;
var deltaX = 0
var deltaY = 0



//backing tracks
var backingTrack1;
var titleSong;
var previousTrack;

//animationVariables
let frame = 0;



function loadAudio(){
  //Audio Files
  soundFormats('wav', 'mp3');
  G = loadSound('assets/scale_1/G.mp3');
  Asharp = loadSound('assets/scale_1/A#.mp3');
  C = loadSound('assets/scale_1/C.mp3');
  D = loadSound('assets/scale_1/D.mp3');
  F = loadSound('assets/scale_1/F.mp3');
  backingTrack1 = loadSound('assets/tracks/BackingTrack1.mp3');
  titleSong = loadSound('assets/tracks/Wind Cries Mary.mp3')
}

function loadImages(){
  //Title Screen Images
  titleScreen0 = loadImage('assets/title_screen/TitleScreen0.png');
  titleScreen1 = loadImage('assets/title_screen/TitleScreen1.png');
  titleScreen2 = loadImage('assets/title_screen/TitleScreen2.png');
  titleScreen3 = loadImage('assets/title_screen/TitleScreen3.png');
  titleScreen4 = loadImage('assets/title_screen/TitleScreen4.png');
  titleScreen5 = loadImage('assets/title_screen/TitleScreen5.png');
  titleScreen6 = loadImage('assets/title_screen/TitleScreen6.png');
  titleScreen7 = loadImage('assets/title_screen/TitleScreen7.png');
  
  //Dancing Man Images
  f1 = loadImage('assets/DancingMan/frame1-01.png')
  f2 = loadImage('assets/DancingMan/frame2-01.png') 
  f3 = loadImage('assets/DancingMan/frame3-01.png')
  f4 = loadImage('assets/DancingMan/frame4-01.png')
  f5 = loadImage('assets/DancingMan/frame5-01.png')
  f6 = loadImage('assets/DancingMan/frame6-01.png')
  f7 = loadImage('assets/DancingMan/frame7-01.png')
  f8 = loadImage('assets/DancingMan/frame8-01.png')
  f9 = loadImage('assets/DancingMan/frame9-01.png')
  f10 = loadImage('assets/DancingMan/frame10-01.png') 
  f11 = loadImage('assets/DancingMan/frame11-01.png')
  f12 = loadImage('assets/DancingMan/frame12-01.png')
  f13 = loadImage('assets/DancingMan/frame13-01.png')
  f14 = loadImage('assets/DancingMan/frame14-01.png')
  f15 = loadImage('assets/DancingMan/frame15-01.png')
  f16 = loadImage('assets/DancingMan/frame16-01.png')
  
  //Note Images
    //Standard Colors
  G1 = loadImage("assets/MusicNotes/Green Notes-01.png")
  G2 = loadImage("assets/MusicNotes/Green Notes-02.png")
  G3 = loadImage("assets/MusicNotes/Green Notes-03.png")
  R1 = loadImage("assets/MusicNotes/Red Notes-01.png")
  R2 = loadImage("assets/MusicNotes/Red Notes-02.png")
  R3 = loadImage("assets/MusicNotes/Red Notes-03.png")
  Y1 = loadImage("assets/MusicNotes/Yellow Notes-01.png")
  Y2 = loadImage("assets/MusicNotes/Yellow Notes-02.png")
  Y3 = loadImage("assets/MusicNotes/Yellow Notes-03.png")
  B1 = loadImage("assets/MusicNotes/Blue Notes-01.png")
  B2 = loadImage("assets/MusicNotes/Blue Notes-02.png")
  B3 = loadImage("assets/MusicNotes/Blue Notes-03.png")
  O1 = loadImage("assets/MusicNotes/Orange Notes-01.png")
  O2 = loadImage("assets/MusicNotes/Orange Notes-02.png")
  O3 = loadImage("assets/MusicNotes/Orange Notes-03.png")
  pointer = loadImage("assets/Indicators/noteShooter-01.png")
  
    //Pastels
  PG1 = loadImage("assets/PastelMusicNotes/Pastel Green-01.png")
  PG2 = loadImage("assets/PastelMusicNotes/Pastel Green-02.png")
  PG3 = loadImage("assets/PastelMusicNotes/Pastel Green-03.png")
  PR1 = loadImage("assets/PastelMusicNotes/Pastel Red-01.png")
  PR2 = loadImage("assets/PastelMusicNotes/Pastel Red-02.png")
  PR3 = loadImage("assets/PastelMusicNotes/Pastel Red-03.png")
  PY1 = loadImage("assets/PastelMusicNotes/Pastel Yellow-01.png")
  PY2 = loadImage("assets/PastelMusicNotes/Pastel Yellow-02.png")
  PY3 = loadImage("assets/PastelMusicNotes/Pastel Yellow-03.png")
  PB1 = loadImage("assets/PastelMusicNotes/Pastel Blue-01.png")
  PB2 = loadImage("assets/PastelMusicNotes/Pastel Blue-02.png")
  PB3 = loadImage("assets/PastelMusicNotes/Pastel Blue-03.png")
  PO1 = loadImage("assets/PastelMusicNotes/Pastel Orange-01.png")
  PO2 = loadImage("assets/PastelMusicNotes/Pastel Orange-02.png")
  PO3 = loadImage("assets/PastelMusicNotes/Pastel Orange-03.png")
  
  //Backgrounds
  city = loadImage("assets/Backgrounds/City.png")
}



function preload() {
  loadAudio();
  loadImages();
  
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  myNoteShooter = new noteShooter(upperBound, 2, shooterRadius, xPos, yPos)
  background('black');
  angleMode(DEGREES)

}


function draw() {
  refreshScreen()
}

function setBackgroundOnce(theBackground){
  if(currentBackground != theBackground){
    currentBackground = theBackground
    background(theBackground)
  }
  
}

function refreshScreen(){
  frame ++;
  
  
  if(scene == "title"){
    titleScreenHandler();
    playBackingTrack(titleSong, backingTrack1);
    //need to change scene
  }
  else if (scene == "dancing man"){
    setBackgroundOnce("cyan")
    keepDegreesWithinBounds(upperBound, lowerBound);
    playBackingTrack(backingTrack1, titleSong);
    image(city,0,0)
    dancingMan();
    myNoteShooter.update(myShooterDegrees)
    myNoteShooter.drawArrow(60)
  }
}


//Play backing track
function playBackingTrack(track, lastTrack){
  if(lastTrack.isPlaying){
    lastTrack.stop()
  }
  if (!track.isPlaying()){
    track.play()
  }
  
}

//Title Screen
function titleScreenHandler(){
  frame = frame % 16 //number of fps
  
  if (frame <= 1){
    background(titleScreen0);
  }
  else if (frame <= 3){
    background(titleScreen1)
  }
  else if (frame <= 5){
    background(titleScreen2)
  }
  else if (frame <= 7){
    background(titleScreen3)
  }
  else if (frame <= 9){
    background(titleScreen4)
  }
  else if (frame <= 11){
    background(titleScreen5)
  }
  else if (frame <= 13){
    background(titleScreen6)
  }
  else if (frame <= 15){
    background(titleScreen7)
  }
  
  
}

//Dancing Man Animation
function dancingMan(){
  frame = frame % 64 //number of fps
  
  if (between(0,1,frame) || between(62,63,frame)){
    image(f1,dmX,dmY,w,h)
  }
  else if (between(2,3,frame) || between(60,61,frame)){
    image(f2,dmX,dmY,w,h)
  }
  else if (between(4,5,frame) || between(58,59,frame)){
    image(f3,dmX,dmY,w,h)
  }
  else if (between(6,7,frame) || between(56,57,frame)){
    image(f4,dmX,dmY,w,h)
  }
  else if (between(8,9,frame) || between(54,55,frame)){
    image(f5,dmX,dmY,w,h)
  }
  else if (between(10,11,frame) || between(52,53,frame)){
    image(f6,dmX,dmY,w,h)
  }
  else if (between(12,13,frame) || between(50,51,frame)){
    image(f7,dmX,dmY,w,h)
  }
  else if (between(14,15,frame) || between(48,49,frame)){
    image(f8,dmX,dmY,w,h)
  }
  else if (between(16,17,frame) || between(46,47,frame)){
    image(f9,dmX,dmY,w,h)
  }
  else if (between(18,19,frame) || between(44,45,frame)){
    image(f10,dmX,dmY,w,h)
  }
  else if (between(20,21,frame) || between(42,43,frame)){
    image(f11,dmX,dmY,w,h)
  }
  else if (between(22,23,frame) || between(40,41,frame)){
    image(f12,dmX,dmY,w,h)
  }
  else if (between(24,25,frame) || between(38,39,frame)){
    image(f13,dmX,dmY,w,h)
  }
  else if (between(26,27,frame) || between(36,37,frame)){
    image(f14,dmX,dmY,w,h)
  }
  else if (between(28,29,frame) || between(34,35,frame)){
    image(f15,dmX,dmY,w,h)
  }
  else if (between(30,31,frame) || between(32,33,frame)){
    image(f16,dmX,dmY,w,h)
  }
  

}

//Upper and lower inclusive
function between(low, high, input){
    if((input >= low) && (input <= high)){
       return true
       }
    else{
      return false
    }
  }

function keepDegreesWithinBounds(upper, lower){
  if(myShooterDegrees == upper){
    pointerDirection = "LEFT"
  }
  else if (myShooterDegrees == lower){
    pointerDirection = "RIGHT"
  }
  
  if(pointerDirection == "RIGHT"){
    myShooterDegrees--
  }
  else if(pointerDirection == "LEFT"){
    myShooterDegrees++
  }
}



//.... GAMEPAD HANDLING FUNCTION DEFINITIONS AND CALLS

//...Gamepad connected or disconnected (function calls)

//this function is called when a gamepad is connected
window.addEventListener("gamepadconnected", function(e) {
  console.info("Gamepad connected");
  gamepads[e.gamepad.index] = true;
  readGamepadValues();
});

//listener to be called when a gamepad is disconnected
window.addEventListener("gamepaddisconnected", function(e) {
  console.info("Gamepad disconnected");
  delete gamepads[e.gamepad.index];
});
// .........end calls for gamepad connected/disconnected


//function to be called continuously to read the gamepad values
function readGamepadValues() {
  //console.info("readGamepadValues has been called")
  
  //read the indexes of the connected gamepads
  const indexes = Object.keys(gamepads);
  //read the gamepads connected to the browser
  const connectedGamepads = navigator.getGamepads();
  
  //traverse the list of gamepads, reading the ones connected to this browser
  for(let x = 0; x < indexes.length; x++) {
    //read the gamepad buttons
    const buttons = connectedGamepads[indexes[x]].buttons;
    
    //traverse the list of buttons
    for (let y = 0; y < buttons.length; y++) {
      
      //if the button is PRESSED and the STRUM is active
      if(buttons[y].pressed && (buttons[12].pressed || buttons[13].pressed)) {
        
        
        //if the note played has not already been playing previously
        if(!activeNotes[y]){
          //add note to active notes as true
          activeNotes[y] = true;
          notePressed(y);
          randomSize = getRandomInt(3); //pick a new size for the next note to be spawned
          resetForNextNote();
          
          
        } else{
          notePlayed(y);
          
        }
        
      } else {
        activeNotes[y] = false;
        }
       
    }
  }
  
  //if there are any gamepads connected, keep reading their values
  if (indexes.length > 0){
    
    //window.requestAnimationFrame(refreshScreen)
    window.requestAnimationFrame(readGamepadValues); //recursive call --- we use requestAnimationFrame method because it is always called before the screen refreshes
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function notePressed(id) {
  if (scene != "title"){
  //console.info('Button ' + id + ' has started playing');
    if(id == 0){ //green top
      gtPressed();
    }else if (id == 1){ //red top
      rtPressed();
    }else if (id == 3){ //yellow top
      ytPressed();
    }else if (id == 2){ //blue top
      btPressed();
    }
    else if (id == 4){ //orange top
      otPressed();
    }
  }
  else if ((scene == "title") && (id == 12 || id == 13)){
    scene = "dancing man"
  }
}


function resetForNextNote(){
  deltaX = 0
  deltaY = 0
}
function notePlayed(id) {
  
    var thisNote
    if(id == 0){ //green top
      //spawn a green note
      thisNote = new musicNote("Green", randomSize, deltaX, deltaY);
      thisNote.spawnPastel()
      }
    else if (id == 1){
      thisNote = new musicNote("Red", randomSize, deltaX, deltaY);
      thisNote.spawnPastel()
      }
    else if (id == 3){
      thisNote = new musicNote("Yellow", randomSize, deltaX, deltaY);
      thisNote.spawnPastel()
      }
    else if (id == 2){
      thisNote = new musicNote("Blue", randomSize, deltaX, deltaY);
      thisNote.spawnPastel()
      }
    else if (id == 4){
      thisNote = new musicNote("Orange", randomSize, deltaX, deltaY);
      thisNote.spawnPastel()
      }
  
    deltaX++
    deltaY++
}

//.........END OF GAMEPAD HANDLING



//... INDIVIDUAL KEY PRESSED FUNCTIONS
function gtPressed() {
  //play a sound
  G.play()
}
function rtPressed() {
  //play a sound
  Asharp.play()
}
function ytPressed() {
  //play a sound
  C.play()
}
function btPressed() {
  //play a sound
  D.play()
}
function otPressed() {
  //play a sound
  F.play()
}
//.......END



class musicNote{
  constructor(color, size, x, y){
    this.color = color;
    this.size = size;
    this.noteImages = {
          Green: [G1,G2,G3],
          Red: [R1,R2,R3],
          Yellow: [Y1,Y2,Y3],
          Blue: [B1,B2,B3],
          Orange: [O1,O2,O3]
    }
    this.pastelNoteImages = {
      Green: [PG1, PG2, PG3],
      Red: [PR1, PR2, PR3],
      Yellow: [PY1, PY2, PY3],
      Blue: [PB1, PB2, PB3],
      Orange: [PO1, PO2, PO3]
    }
    this.x = x
    this.y = y
    
  }
  
  spawn(){
    if(this.color == "Green"){
      image(this.noteImages.Green[this.size],this.x,this.y)
      //print(this.y)
    }
    else if(this.color == "Red"){
      image(this.noteImages.Red[this.size],this.x,this.y)
    }
    else if(this.color == "Yellow"){
      image(this.noteImages.Yellow[this.size],this.x,this.y)
    }
    else if(this.color == "Blue"){
      image(this.noteImages.Blue[this.size],this.x,this.y)
    }
    else if(this.color == "Orange"){
      image(this.noteImages.Orange[this.size],this.x,this.y)
    }
  }
  
  spawnPastel(){
    if(this.color == "Green"){
      image(this.pastelNoteImages.Green[this.size],this.x,this.y)
      //print(this.y)
    }
    else if(this.color == "Red"){
      image(this.pastelNoteImages.Red[this.size],this.x,this.y)
    }
    else if(this.color == "Yellow"){
      image(this.pastelNoteImages.Yellow[this.size],this.x,this.y)
    }
    else if(this.color == "Blue"){
      image(this.pastelNoteImages.Blue[this.size],this.x,this.y)
    }
    else if(this.color == "Orange"){
      image(this.pastelNoteImages.Orange[this.size],this.x,this.y)
    }
  }
}

function convertToRadians(degrees){
  let radians = degrees * (Math.PI/180); 
  return (radians);
}

function generateX(r, degrees, centerX){
  let radians = convertToRadians(degrees);
  let xVal = r * Math.cos(radians);
  return xVal //+ centerX;
}

function generateY(r, degrees, centerY){
  let radians = convertToRadians(degrees);
  let yVal = r * Math.sin(radians);
  return yVal //+ centerY;
}

function generateSlope(xVal, yVal){
  let slope = yVal/xVal
  return slope;
}


class noteShooter{
  constructor(degreeLimit, rate, myRad, centerX, centerY){
    this.radius = myRad
    this.centerX = centerX
    this.centerY = centerY
  }
  
  update(deg){
    translate(this.centerX,this.centerY)
    rotate(deg)
  }
  
  drawArrow(radius){
    image(pointer, radius, radius, 25, 40)
    
  }
}




                        
                        
  
                        
                        



