var dataRef = firebase.database();
var name1 ;
var player1Choice;
var player2Choice = null;
var player1Wins = 0;
var player2Wins = 0;
var player1Losses = 0;
var player2Losses = 0;
var player1Ref = dataRef.ref('/players/player1')
var player2Ref = dataRef.ref('/players/player2')


function Game(options) {
    var turn = [0,1];

    this.init = function() {
        $('#add-user-1').on('click', function() {
              name1 = $('#name-input-1').val().trim();
              dataRef.ref('/players/player1').set({
                  name: name1,
                  wins:player1Wins,
                  losses:player1Losses,
                  choice:"",
              })
             $('#options1').append(`
                  <p class='choices1' value='rock'> Rock </p>
                  <p class='choices1' value='paper'> Paper </p>
                  <p class='choices1' value='scissors'> Scissors </p>
              `);
        })

         dataRef.ref('/players/player1').on('value', function(snap) {
                  // console.log(snap.val().name);
                  $('#player-1-name').html(snap.val().name);
              });

         $('#add-user-2').on('click', function() {
              name2 = $('#name-input-2').val().trim();
              dataRef.ref('/players/player2').set({
                  name: name2,
                  wins:player2Wins,
                  losses:player2Losses,
                  choice:"",
              })
              dataRef.ref('/turn').set({
                  turn:0,
              });
              $('#options2').append(`
                  <p class='choices2' value='rock'> Rock </p>
                  <p class='choices2' value='paper'> Paper </p>
                  <p class='choices2' value='scissors'> Scissors </p>
              `);
        })

         dataRef.ref('/players/player2').on('value', function(snap) {
                  // console.log(snap.val().name);
                  $('#player-2-name').html(snap.val().name);
          })

    }


     this.play = function() {
            $(document).on("click", ".choices1", function() {
                player1Choice = $(this).attr('value');
                // console.log(player1Choice);
                dataRef.ref('/players/player1').update({
                    choice: player1Choice
                });
                $('#player-1-container').empty();
                $('#player-1-container').append(`<div class="playerChoice"> ${player1Choice} </div>`);

            });

            $(document).on("click", ".choices2", function() {
                player2Choice = $(this).attr('value');
                // console.log(player2Choice);
                dataRef.ref('/players/player2').update({
                    choice: player2Choice
                });
                $('#player-2-container').empty();
                $('#player-2-container').append(`<div class="playerChoice"> ${player2Choice} </div>`);

            });
      }

    this.evaluate = function() {
            dataRef.ref('/players/player1/').on('value', function(snap) {
                 player1Choice = snap.val().choice;
                 // console.log(player1Choice);
                 dataRef.ref('/players/player2/').on('value', function(snap) {
                       player2Choice = snap.val().choice;
                       // console.log(player2Choice);
                       // console.log(player1Choice, player2Choice);
                        if (player1Choice != "" && player1Choice == player2Choice) {
                            $('#result-container').html('It is a tie!');
                        } else if (player1Choice == 'rock' && player2Choice=='paper') {
                            $('#result-container').html('Player2 wins!');
                            player2Wins++;
                            console.log(player2Wins);
                            // dataRef.ref('/players/player2').update({
                            //     wins: player2Wins,
                            // });
                        } else if (player1Choice == 'rock' && player2Choice=='scissors') {
                            $('#result-container').html('Player1 wins!');
                            player1Wins++;
                            console.log(player1Wins);
                        } else if (player1Choice == 'paper' && player2Choice=='rock') {
                            $('#result-container').html('Player1 wins!');
                            player1Wins++;
                            console.log(player1Wins);
                        } else if (player1Choice == 'paper' && player2Choice=='scissors') {
                            $('#result-container').html('Player2 wins!');
                            player2Wins++;
                            console.log(player2Wins);
                        } else if (player1Choice == 'scissors' && player2Choice=='rock') {
                           $('#result-container').html('Player2 wins!');
                            player2Wins++;
                            console.log(player2Wins);
                        } else if (player1Choice == 'scissors' && player2Choice=='paper') {
                            $('#result-container').html('Player1 wins!');
                            player1Wins++;
                            console.log(player1Wins);
                        } else {
                            console.log('This is wierd...');
                        }


                 });
            });

            // game.flush();
    }


    this.flush = function() {
                $('#options1').empty();
                $('#options1').append(`
                                  <p class='choices1' value='rock'> Rock </p>
                                  <p class='choices1' value='paper'> Paper </p>
                                  <p class='choices1' value='scissors'> Scissors </p>
                                `)
                $('#options2').empty();
                $('#options2').append(`
                                  <p class='choices2' value='rock'> Rock </p>
                                  <p class='choices2' value='paper'> Paper </p>
                                  <p class='choices2' value='scissors'> Scissors </p>
                                `);
                $('#result-container').empty();
    }

};


// $('#replayBtn').on('click', function() {

// });



var game = new Game;
game.init();
game.play();
game.evaluate();
game.play();