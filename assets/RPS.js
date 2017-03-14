


function Game(options) {
      var name1;
      var name2;
      var wins;
      var player1Choice;
      var player2Choice = null;
      var losses;
      var database = firebase.database();
      var db = firebase.database().ref('Players');
      var player1Ref = firebase.database().ref('/Players/player1/');
      var player2Ref = firebase.database().ref('/Players/player2/');

      this.init = function() {
            $('#add-user-1').on('click',function() {
                  player1Ref.on('value', gotData,errData);

                  function gotData(data) {
                      // console.log(data.val().name);
                      name1 = $('#name-input-1').val().trim()
                      player1Ref.set({
                          name: name1
                      })
                      $('#player-1-name').html(name1);
                      $('#name-input-1').val('');
                  };
                  function errData(err) {
                      console.log('Data for user1 do not load');
                      console.log(err);

                  }

                  $('#options1').append(`
                      <p class='choices1' value='rock'> Rock </p>
                      <p class='choices1' value='paper'> Paper </p>
                      <p class='choices1' value='scissors'> Scissors </p>
                    `)

            });

            $('#add-user-2').on('click',function() {
                  player2Ref.on('value', gotData,errData);

                  function gotData(data) {
                      // console.log(data.val().name);
                      name2 = $('#name-input-2').val().trim()
                      player2Ref.set({
                          name: name2
                      })
                      $('#player-2-name').html(name2);
                      $('#name-input-2').val('');
                  };
                  function errData(err) {
                      console.log('Data for user2 do not load');
                      console.log(err);

                  }

                  $('#options2').append(`
                      <p class='choices2' value='rock'> Rock </p>
                      <p class='choices2' value='paper'> Paper </p>
                      <p class='choices2' value='scissors'> Scissors </p>
                    `)
            });

      }


      this.play = function() {
            $(document).on("click", ".choices1", function() {
                player1Choice = $(this).attr('value');
                console.log(player1Choice);
                $('#options1').empty();
                $('#options1').append(`<div id='playerChoice'> ${player1Choice} </div>`);
                if (player2Choice == null) {
                    $(document).on("click", ".choices2", function() {
                        player2Choice = $(this).attr('value');
                        console.log(player2Choice);
                        $('#options2').empty();
                        $('#options2').append(`<div id='playerChoice'> ${player2Choice} </div>`)
                        if (player1Choice == player2Choice) {
                            console.log('It is a tie!');
                            $('#result-container').html('It is a tie!')
                        } else if (player1Choice == 'rock' && player2Choice=='paper') {
                            console.log('player2 wins!');
                            $('#result-container').html(`${name2} wins!`);
                        } else if (player1Choice == 'rock' && player2Choice=='scissors') {
                            $('#result-container').html(`${name1} wins!`);
                        } else if (player1Choice == 'paper' && player2Choice=='rock') {
                            $('#result-container').html(`${name1} wins!`);
                        } else if (player1Choice == 'paper' && player2Choice=='scissors') {
                            $('#result-container').html(`${name2} wins!`);
                        } else if (player1Choice == 'scissors' && player2Choice=='rock') {
                            $('#result-container').html(`${name2} wins!`);
                        } else if (player1Choice == 'scissors' && player2Choice=='paper') {
                            $('#result-container').html(`${name1} wins!`);
                        } else {
                            console.log('This is wierd...');
                        }
                    });
                } else {
                    console.log('Please choose an option');
                }
            });


    }
}





var game = new Game();
game.init();
game.play();
// game.play();