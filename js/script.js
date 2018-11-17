
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
  var firstTime = childSnapshot.val().Time;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffBtwnTimes = moment().diff(moment(firstConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffBtwnTimes);

  // Time apart (remainder)
  var timeApart = diffBtwnTimes % curFrequency;
  console.log(timeApart);

  // Minute Until Train
  var minutesLeft = curFrequency - timeApart;
  console.log("MINUTES TILL TRAIN: " + minutesLeft);

  // Next Train
  var nextTrain = moment().add(minutesLeft, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  $("#train-rows").append("<tr><td>" + curTrain + "</td><td>" + curDestination + "</td><td>" + curFrequency + "</td><td>" + firstTime +  "</td><td>" + minutesLeft + "</td></tr>")
});
