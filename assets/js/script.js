$(document).ready(function(){
  var player1score = 0
  var player2score = 0
  var player1Played = []
  var player2Played = []
  var player1Counter = 0
  var player2Counter = 0
  var desiredRounds = 3/*parseInt(prompt("How many rounds do you want to play? Please enter a NUMBER ONLY AH later cannot work then idk how ah"))*/
  var round = 1
  document.getElementById('roundDisplay').textContent = "Round 1"

  // modal for instructions
  var modal = document.getElementById('myModal');
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];
  instructions.onclick = function() {
      modal.style.display = "block";
  }
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // logic for pulling out 4 words of length 4 and scrambling the characters
  var keysArr = Object.keys(dictionary)
  var allFourLetters = []
  keysArr.forEach(function(i) {
    if (i.length === 4) {
      allFourLetters.push(i.toUpperCase())
    }
  })
  console.log(allFourLetters)

  var fourLetters = []
  var word1 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word1)
  var word2 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word2)
  var word3 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word3)
  var word4 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word4)
  console.log(fourLetters)

  var joinedString = fourLetters.join('').toUpperCase();
  String.prototype.shuffle = function() {
      var allCharacters = this.split(""),
          n = allCharacters.length;

      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = allCharacters[i];
          allCharacters[i] = allCharacters[j];
          allCharacters[j] = tmp;
      }
      return allCharacters.join("");
  }
  var shuffledString = joinedString.shuffle()
  document.getElementById('scrambledDisplay').textContent = joinedString.shuffle()
  console.log(shuffledString)

  function shuffleLetters() {
    document.getElementById('scrambledDisplay').textContent = joinedString.shuffle()
  }
  $('#shuffle').click(shuffleLetters)

  // function to check if user input uses characters only from alphabet pool
  function checkStringChar(str) {
    var shuffledArray = shuffledString.split('')
    var inputArray = str.toUpperCase().split('')
    function arrayContainsArray(superset, subset) {
      return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
      });
    }
    return arrayContainsArray(shuffledArray,inputArray)
  }

  // function to check if user input is found in the dictionary
  function checkValidWord(str) {
    return dictionary.hasOwnProperty(str)
  }

  function checkPreviouslyPlayed(str) {
    if (player1Played.indexOf(str) > -1 || player2Played.indexOf(str) > -1) {
      return false
    } else {
      return true
    }
  }

  function checkMinLength(str) {
    return str.length >= 3
  }

  // adds extra points for "rarer" alphabets
  function checkScores(str) {
    counter = 0
    str.split("").forEach(function(i) {
      if (i === "z" || i === "x" || i === "q" || i === "j" || i === "k") {
        counter += 5
      } else if (i === "f" || i === "h" || i === "v" || i === "w" || i === "y") {
        counter += 3
      }
    })
    return str.length + counter
  }

  // function to check if user input can be accepted:
  // 1. is from the alphabet pool
  // 2. is a valid dictionary entry (and not random gibberish)
  // 3. is not a word that has been submitted by a player before
  // 4. word must be at least 3 characters long

  // function checkUserInput(str) {
  //   if (checkStringChar(str) && checkValidWord(str) && checkPreviouslyPlayed(str) && checkMinLength(str)) {
  //     swal("Good job, your answer has been accepted!")

  //     player1score += $('#player1input').val().length
  //     player1Played.push($('#player1input').val())
  //     document.getElementById('player1score').textContent = player1score
  //     $('#player1input').val("")

  //     player2score += $('#player2input').val().length
  //     player2Played.push($('#player2input').val())
  //     document.getElementById('player2score').textContent = player2score
  //     $('#player2input').val("")

  //     // console.log(player1score)
  //   } else {
  //     swal("Sorry, your answer is unacceptable :(")
  //     $('#player1input').val("")
  //     $('#player2input').val("")
  //   }
  //   if (player1Counter === 5 && player2Counter === 5) {
  //     endGame();
  //   }
  // }

  function checkUserInput(str) {
    if (!checkStringChar(str)) {
      swal("Hey you!","Please only use letters from the given set.", "error")
      player1Played.push($('#player1input').val())
      player2Played.push($('#player2input').val())
      $('#player1input').val("")
      $('#player2input').val("")
    } else if (!checkValidWord(str)) {
      swal("Uh oh!", "It seems like that's not a valid word.", "error")
      player1Played.push($('#player1input').val())
      player2Played.push($('#player2input').val())
      $('#player1input').val("")
      $('#player2input').val("")
    } else if (!checkPreviouslyPlayed(str)) {
      swal("Oppsy!", "That word has already been played.", "error")
      player1Played.push($('#player1input').val())
      player2Played.push($('#player2input').val())
      $('#player1input').val("")
      $('#player2input').val("")
    } else if (!checkMinLength(str)) {
      swal("O dear","Your word is too short!", "error")
      player1Played.push($('#player1input').val())
      player2Played.push($('#player2input').val())
      $('#player1input').val("")
      $('#player2input').val("")
    } else {
      swal("Good job!", "Your answer has been accepted!", "success");

      // player1score += $('#player1input').val().length
      player1score += checkScores($('#player1input').val())
      console.log(checkScores($('#player1input').val()))
      player1Played.push($('#player1input').val())
      document.getElementById('player1score').textContent = "Score: " + player1score
      $('#player1input').val("")

      // player2score += $('#player2input').val().length
      player2score += checkScores($('#player2input').val())
      player2Played.push($('#player2input').val())
      document.getElementById('player2score').textContent = "Score: " +player2score
      $('#player2input').val("")
    }
    if (player1Counter === desiredRounds && player2Counter === desiredRounds) { //game ends after 3 round
      endGame();
    }
  }

  function resetGame() {
    window.location.reload(true);
  }

  $('#new-game').click(resetGame)

  function endGame() {
    console.log("game ended")
    if (player1score > player2score) {
      document.getElementById('winner').textContent = "Player 1 wins!"
    } else if (player2score > player1score) {
      document.getElementById('winner').textContent = "Player 2 wins!"
    } else {
      document.getElementById('winner').textContent = "It's a tie!"
    }
    document.getElementById('player1words').textContent = "Player 1's words: " + player1Played.filter(Boolean).join(', ')
    console.log(player1Played)
    document.getElementById('player2words').textContent = "Player 2's words: " + player2Played.filter(Boolean).join(', ')
    console.log(player2Played)
  }

  $('#end-game').click(endGame)

  // check user input upon submit button being clicked
  // increment player count accordingly to make sure nobody skips or plays an extra turn
  $('#player1submit').click(function() {
    if (player1Counter === player2Counter) {
      player1Counter++
      console.log("player 1 counter:" + player1Counter)
      checkUserInput($('#player1input').val())
    } else {
      swal("Hey you!","Player 2 has not played yet!", "error")
      $('#player1input').val("")
    }
  })
  $('#player2submit').click(function() {
    if (player1Counter - player2Counter === 1) {
      player2Counter++
      checkUserInput($('#player2input').val())
    } else {
      swal("Hey you!","Player 2 has not played yet!", "error")
      $('#player2input').val("")
    }
    round++ // for displaying each round on the page
    document.getElementById('roundDisplay').textContent = "Round " + round
    console.log("p2 clicked")
    console.log(player2Counter)
    if (player2Counter === desiredRounds) {
      document.getElementById('roundDisplay').textContent = "GAME OVER"
    }
  })
})
