var newRow = "<tr>" +
  "<td class='name'></td><td  class='destination'></td><td  class='firstTime'></td><td  class='freq'></td>" +
"</tr>";

var trainName;
var destination;
var firstTime;
var freq;

var database = firebase.database();

  $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();

    var newTrain = {
      name: trainName,
      dest: destination,
      firstTime: firstTrainTime,
      freq: frequency
    };

    database.ref().push(newTrain);
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.firstTime);
    console.log(newTrain.freq);
    // Alert
    alert("Train successfully added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrainTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().freq;

    var now_seconds = moment().format('X');
    var frequency_seconds = frequency * 60;
    var remaining_seconds = (now_seconds - firstTrainTime) % frequency_seconds;
    var first_arrival = moment.unix(firstTrainTime);

    // Add each train's data into the table
    $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      frequency + "</td><td>" + first_arrival.format("HH:mm") + "</td><td>" + Math.floor(remaining_seconds/60) + "</td>");
  });