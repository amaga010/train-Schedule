$(document).ready(function() {  
 
// Initialize Firebase
 var config = {
    apiKey: "AIzaSyB3xBiX_iVV0IZbke2cFAgmw7JaYe4iCIw",
    authDomain: "train-homework-7.firebaseapp.com",
    databaseURL: "https://train-homework-7.firebaseio.com",
    projectId: "train-homework-7",
    storageBucket: "",
    messagingSenderId: "216564275593"
  };
  firebase.initializeApp(config);
  var database = firebase.database().ref("train schedule");

$("#submit").on("click", function(e) {
    e.preventDefault();
    console.log(123)
// Getting each input from the form 
    var train = $("#train").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var today = new Date()
    var minutesAway = (today.getHours() + ":" + today.getMinutes())
    var time = moment($("#time").val().trim()).format();
    console.log(train,destination,time,frequency, minutesAway)

    var newDatabase = database.push();
    newDatabase.set({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency
    });
    //** 
    var newTrainRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(time),
        $("<td>").text(minutesAway),
    );
    $("#table1").append(newTrainRow);

    document.getElementById("form1").reset();
});

//Firebase and Back
    firebase.database().ref().on("child_added", function(childSnapshot) {
            console.log(childSnapshot.val());

        var train = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var time = childSnapshot.val().time;
        var minutesAway = childSnapshot.val().minutesAway;

        //** 
        var newTrainRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(time),
            $("<td>").text(minutesAway),
        );

            $("#table1").append(newTrainRow);
        })
}) 

// I couldnt get the information to append to the page, it's sent to firebase but not to the page
// Could do one or the other depending on where i add this ** but i cant do both
// Also I'm very lost on the whole mommnet.js thing