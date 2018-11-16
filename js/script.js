
  // Initialize Firebase



  var config = {
    apiKey: "AIzaSyCYpIZZ1V4bgxDWa1w1_K2vgOCBnjDuaGM",
    authDomain: "train-schedules-dc559.firebaseapp.com",
    databaseURL: "https://train-schedules-dc559.firebaseio.com",
    projectId: "train-schedules-dc559",
    storageBucket: "train-schedules-dc559.appspot.com",
    messagingSenderId: "161528377280"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var train = "";
  var destination = "";
  var frequency = "";
  var time = "";

  $("#submit").on("click", function(event) {
      event.preventDefault();

      train = $("#train").val().trim();
      destination = $("#destination").val().trim();
      frequency = $("#frequency").val().trim();
      time = $("#time").val().trim();

      database.ref().push({
          Train: train,
          Destination: destination,
          Frequency: frequency,
          Time: time
          
      });
console.log(train, destination, frequency, time);
  });

database.ref().on("child_added", function(childSnapshot) {

  var curTrain = childSnapshot.val().Train;
  var curDestination = childSnapshot.val().Destination;
  var curFrequency = childSnapshot.val().Frequency;
  var curTime = childSnapshot.val().Time;


  $("#train-rows").append("<tr><td>" + curTrain + "</td><td>" + curDestination + "</td><td>" + curFrequency + "</td><td>" + curTime + "</td></tr>")
});
