


function Game(options) {
      var name1;
      var name2;
      var wins;
      var choice;
      var losses;
      var database = firebase.database();
      var db = firebase.database().ref('Players');
      var player1Ref = firebase.database().ref('/Players/player1/');
      var player2Ref = firebase.database().ref('/Players/player2/');

      this.init = function() {
            $('#add-user-1').on('click',function() {
                  player1Ref.on('value', gotData,errData);

                  function gotData(data) {
                      console.log(data.val().name);
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
                      <p class='choices'> Rock </p>
                      <p class='choices'> Paper </p>
                      <p class='choices'> Scissor </p>
                    `)

            });

            $('#add-user-2').on('click',function() {
                  player2Ref.on('value', gotData,errData);

                  function gotData(data) {
                      console.log(data.val().name);
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
                      <p class='choices'> Rock </p>
                      <p class='choices'> Paper </p>
                      <p class='choices'> Scissor </p>
                    `)
            });
      }
}





var game = new Game();
game.init();