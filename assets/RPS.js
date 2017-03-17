var dataRef = firebase.database();
var name1 ;

function Game(options) {
    var turn = [0,1];

    this.init = function() {
        $('#add-user-1').on('click', function() {
              name1 = $('#name-input-1').val().trim();
              dataRef.ref('/players/player1').set({
                  name: name1,
                  wins:0,
                  losses:0
              })
        })

         dataRef.ref('/players/player1').on('value', function(snap) {
                  console.log(snap.val().name);
                  $('#player-1-name').html(snap.val().name);
              });

         $('#add-user-2').on('click', function() {
              name2 = $('#name-input-2').val().trim();
              dataRef.ref('/players/player2').set({
                  name: name2,
                  wins:0,
                  losses:0
              })
              dataRef.ref('/turn').set({
                  turn:0,
              });
        })

         dataRef.ref('/players/player2').on('value', function(snap) {
                  console.log(snap.val().name);
                  $('#player-2-name').html(snap.val().name);
              })

    }
}


var game = new Game;
game.init();