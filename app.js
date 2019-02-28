var config = {
};

firebase.initializeApp(config);
var database = firebase.database();

$("#heading").hide();
$("#train-table-header").hide();

var trainName;
var destination;
var nextTrain;
var frequency;

$("#add-train-btn").on('click', function() {
    event.preventDefault();
    trainName = $(".train-name").val().trim();
    destination = $(".dest-destination").val().trim();
    nextTrain = $(".next-train-time").val().trim();
    trainFrequency = $(".frequency").val().trim();

    database.ref().push({
        name: trainName,
        dest: destination,
        nextTrain: nextTrain,
        frequency: trainFrequency
    });

    $(".train-name").empty();
    $(".dest-destination").empty();
    $(".next-train-time").empty();
    $(".frequency").empty();
});

database.ref().on("child_added", function(snapshot) {
    $("#heading").show();
    $("#train-table-header").show();
    renderTable(snapshot.val());
    },
    function(errorObject) {
        console.log("Error handled: " + errorObject.code)
});

function renderTable(obj) {
    var mins = calculateMins(obj.nextTrain);
    var tableRow = $("<tr class='table-row'>");
    var trainTableName = $("<td class='train-table-name'>").text(obj.name);
    var destinationTable = $("<td class='destination'>").text(obj.dest);
    var nextTrain = $("<td class='next-train'>").text(obj.nextTrain);
    var trainFrequency2 = $("<td class='train-frequency'>").text(obj.frequency);
    var minsAway = $("<td class='mins-away'>").text(mins);
    tableRow.append(
        trainTableName, 
        destinationTable, 
        nextTrain, 
        trainFrequency2,
        minsAway);
    $("#train-table-body").append(tableRow);
};

function calculateMins(time) {
    var arrivalTime = time;
    var timeFormat = "HH:mm";
    var convertTime = moment(arrivalTime, timeFormat);
    console.log(convertTime);
    var duration = convertTime.diff(moment(), "minutes");
    console.log(duration);
    return duration;
};


