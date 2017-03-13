var config = {
    apiKey: "AIzaSyAiO07l49uW-V2dh09XmWcEjRQI-56EdnU",
    authDomain: "messaging-app-d71af.firebaseapp.com",
    databaseURL: "https://messaging-app-d71af.firebaseio.com",
    storageBucket: "messaging-app-d71af.appspot.com",
    messagingSenderId: "953399621923"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var dbRefObject1 = firebase.database().ref().child('Players');

dbRefObject1.on('value', snap => console.log(snap.val()));




  $("#add-user").on("click", function() {
      event.preventDefault();
      var name = $('#name-input').val().trim();
      database.ref('/Players/player1/').set({
                      name : name
      });
  });

  // database.ref().on("value", function(snapshot) {
  //         console.log(snapshot.val());
  //         $('#name-1-display').html(snapshot.val().name);
  // }, function(errorObject) {
  //     console.log('The read failed: ' + errorObject.code);
  // });
  // 
  
  dbRefObject1.on('value', snap => $('#name-1-display').html(snap.val().player1.name))
;