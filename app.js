
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_iP8gmlSBvZSH9etAqw-8gErZD9ZECvQ",
    authDomain: "my-first-firebase1-98d14.firebaseapp.com",
    databaseURL: "https://my-first-firebase1-98d14.firebaseio.com",
    storageBucket: "my-first-firebase1-98d14.appspot.com",
  };
  firebase.initializeApp(config);


///create a train schedule application
//firebase to host arrival and departure data
//app retrieve and manipulate information with moment.js
//web provide uptodate info
//arrival times and min remain until they arrive their station
//CODE THIS APP TO CALCULATE WHEN THE NEXT TRAIN WILL ARRIVE RELATIVE TO CURRENT TIME
//USER MUST VIEW SAME TRAIN TIMES

var database = firebase.database();//question??
//var trainData = new Firebase(http://getjson.firebaseio.com/timesheet");

//  Button for train entry
$("#trainInfoBtn").on("click", function(){

	// input
	var trainName = $("#trainNameInput").val().trim();
	var destination= $("#destinationInput").val().trim();
	var firstTrainTime = moment($("#firstTrainInput").val().trim(), "DD/MM/YY").format("X");//why T-unix???
	var frequency = $("#frequencyInput").val().trim();

	//holding data
	var newTrain = {
		name : trainName,
		destination : destination,
		time : firstTrainTime,//why unix?
		frequency : frequency
	}
	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	alert("Train successfully added");

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;
});
	// Create a firebase event
	database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());

	var tName = childSnapshot.val().name;	
	var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    //Calculate 
    var diffTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = parseInt(tFrequency) - parseInt(tRemainder);

    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    console.log(tMinutes);
    console.log(tArrival);

    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

  $("#trainSchedule > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});




	//QUESTION- below is what i did
// Difference between the times
		// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		// console.log("DIFFERENCE IN TIME: " + diffTime);

		// // Time apart (remainder)
		// var tRemainder = diffTime % tFrequency;
		// console.log(tRemainder);




	// //assumption
	// var tfrequency = 5;
	// var firstTrainTime = "13:10";

	// var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	// console.log(firstTimeCoverted);

	// // Current Time
	// 	var currentTime = moment();
	// 	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		

	// 	// Minute Until Train
	// 	var tMinutesTillTrain = tFrequency - tRemainder;
	// 	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// 	// Next Train
	// 	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	// 	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))







// $("#train-schedule > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

// });





	// // Creates local "temporary" object for holding employee data
	// var newEmp = {
	// 	name:  empName,
	// 	destination: empRole,
	// 	time: empStart,
	// 	rate: empRate
	// }










// 	// Uploads employee data to the database
// 	database.ref().push(newEmp);

// 	// Logs everything to console
// 	console.log(newEmp.name);
// 	console.log(newEmp.role);
// 	console.log(newEmp.start);
// 	console.log(newEmp.rate)

// 	// Alert
// 	alert("Employee successfully added");

// 	// Clears all of the text-boxes
// 	$("#employeeNameInput").val("");
// 	$("#roleInput").val("");
// 	$("#startInput").val("");
// 	$("#rateInput").val("");

// 	// Prevents moving to new page
// 	return false;
// });


// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot, prevChildKey){

// 	console.log(childSnapshot.val());

// 	// Store everything into a variable.
// 	var empName = childSnapshot.val().name;
// 	var empRole = childSnapshot.val().role;
// 	var empStart = childSnapshot.val().start;
// 	var empRate = childSnapshot.val().rate;

// 	// Employee Info
// 	console.log(empName);
// 	console.log(empRole);
// 	console.log(empStart);
// 	console.log(empRate);

// 	// Prettify the employee start
// 	var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
// 	// Calculate the months worked using hardconre math
// 	// To calculate the months worked
// 	var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
// 	console.log(empMonths);

// 	// Calculate the total billed rate
// 	var empBilled = empMonths * empRate;
// 	console.log(empBilled);

// 	// Add each train's data into the table
// 	$("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

// });


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
