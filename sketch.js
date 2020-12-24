//Create variables here
var dog, fedDogImg, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj;
var addFood, feed;
function preload()
{
  //load images here
  hungryDogImg = loadImage("images/dogImg.png")
  fedDogImg = loadImage("images/dogImg1.png");


}

function setup() {
  database = firebase.database();
  createCanvas(1500, 400);
  foodObj = new Food()
  
  feed=createButton("Feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog = createSprite(920,220, 20, 20)
  dog.addImage(hungryDogImg);
  dog.scale = 0.5;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock); 

}


function draw() {  
   background(46,139,87)
   foodObj.display();
   fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
     lastFed = data.val();
  });
   if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(fedDogImg)
   }
   
  drawSprites();
 /* fill("white")
  textSize(25)
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 150, 25)
  text("Left Food Stock: " + foodS, 230, 60)
  //add styles here
*/
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350, 30);

}else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30);

}else{
  text("Last Read : "+ lastFed + " AM", 350, 30);
}
}
function readStock(data){
   foodS=data.val();
   foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(fedDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


