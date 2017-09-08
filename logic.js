var config = {
  apiKey: "AIzaSyBINCOQ8E6IpbQI9-8HKBDvZF_MCFk7Sfs",
  authDomain: "weddemo-1afa1.firebaseapp.com",
  databaseURL: "https://weddemo-1afa1.firebaseio.com",
  projectId: "weddemo-1afa1",
  storageBucket: "weddemo-1afa1.appspot.com",
  messagingSenderId: "683297747668"
};
firebase.initializeApp(config);

var database = firebase.database();

var TrainName = "";
var Destination = "";
var FirstTrainTime = "";
var tFrequency = "";
var minutesAway = "";
var nextArrival = "";




$(".submitButton").on("click", function(){
  event.preventDefault();

  TrainName = $(".TrainName").val().trim();
  Destination = $(".Destination").val().trim();
  FirstTrainTime = $(".FirstTrainTime").val().trim();
  tFrequency = $(".tFrequency").val().trim();

  var newTrain = {
    TrainName: TrainName,
    Destination: Destination,
    FirstTrainTime: FirstTrainTime,
    tFrequency: tFrequency
  };

  database.ref().push(newTrain);

  $(".TrainName").val("");
  $(".Destination").val("");
  $(".FirstTrainTime").val("");
  $(".tFrequency").val("");

});


// setInterval(function(){
//    updateTime();
// },60000);

// function updateTime(){

function InitialUpload(){database.ref().on("child_added", function(childSnapshot, prevChildKey){

  TrainName = childSnapshot.val().TrainName;
  Destination = childSnapshot.val().Destination;
  FirstTrainTime = childSnapshot.val().FirstTrainTime;
  tFrequency = childSnapshot.val().tFrequency;

  FirstTrainConverted = moment(FirstTrainTime, "hh:mm").subtract(1, "years");
  console.log(FirstTrainConverted);
  var currentTime = moment();

  console.log(currentTime);
  console.log("current time: " + moment(currentTime).format("hh:mm"));
  

  var diffTime = currentTime.diff(moment(FirstTrainConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  minutesAway = moment().add(tMinutesTillTrain, "minutes");
  nextArrival = moment(minutesAway).format("hh:mm");

  console.log(tMinutesTillTrain);
  console.log(nextArrival);

  var childTrainName = childSnapshot.val().TrainName;
  var childDestination = childSnapshot.val().Destination;
  var childTFrequency = childSnapshot.val().tFrequency;



  // $(".tableBody").empty();
  $(".tableBody").append("<tr><td>" + childTrainName +"</td><td>" + childDestination + "</td><td>" + childTFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain +"</td></tr>");

});
};
// InitialUpload();

setInterval(function(){
   updateTime();
},60000);

function updateTime(){
  $(".tableBody").empty();
  InitialUpload();
};
updateTime();

// };

// updateTime();
