$(document).ready(function () {
  // Intializers
  let buttons = {};
  for (let i = 0; i < 9; i++) {
    // no specific meaning for using object to assign value to buttons here, just for future possible new features.
    buttons[`${i + 1}`] = { owner: "none" };
  }

  let playerButtons = [];

  let computerButtons = [];

  let records = {
    rounds: 0,
    playerWin: 0,
    computerWin: 0,
    draw: 0,
  };

  let highestScore = localStorage.getItem("highestScore") || 0;

  let level2 = false;

  let level3 = false;

  // functions to choose AI level
  const chooseLevel = () => {
    $("audio")[0].play();
    $("#chooseLevel").addClass("show");
  };

  const goLevel1 = () => {
    $("#chooseLevel").removeClass("show");
    newGame();
  };

  const goLevel2 = () => {
    $("#chooseLevel").removeClass("show");
    level2 = true;
    newGame();
  };

  const goLevel3 = () => {
    $("#chooseLevel").removeClass("show");
    level2 = true;
    level3 = true;
    newGame();
  };

  // function to update highest score
  const updateHighestScore = () => {
    if (records.playerWin >= highestScore - 0) {
      highestScore = records.playerWin;
    }
    localStorage.setItem("highestScore", highestScore);
  };

  // function to reset highest score
  const resetHighestScore = () => {
    localStorage.clear();
    highestScore = localStorage.getItem("highestScore") || 0;
    showRecords();
  };

  // function to show game records
  const showRecords = () => {
    $("#rounds").text(`Rounds: ${records.rounds}`);
    $("#playerWin").text(`Player Win: ${records.playerWin}`);
    $("#computerWin").text(`Computer Win: ${records.computerWin}`);
    $("#draw").text(`Draw: ${records.draw}`);
    $("#highestScore").text(
      `Highest Score: ${localStorage.getItem("highestScore") || 0}`
    );
  };

  // functions to reset game 
  const resetOneGameData = () => {
    buttons = {};
    for (let i = 0; i < 9; i++) {
      buttons[`${i + 1}`] = { owner: "none" };
    }
    playerButtons = [];
    computerButtons = [];
    updateHighestScore();
  };

  const resetWholeGameData = () => {
    resetOneGameData();
    records.rounds = 0;
    records.playerWin = 0;
    records.computerWin = 0;
    records.draw = 0;
  };

  const resetOneGameUI = () => {
    $(".confirm").removeClass("show");
    $("main button").removeClass("cross");
    $("main button").removeClass("circle");
  };

  function resetWholeGameUI() {
    resetOneGameUI();
    for (let i = 0; i < 9; i++) {
      $(`#btn${i + 1}`).off(`click`);
    }
    $("main button").prop("disabled", true);
    $("#newGame").removeClass("newGame-after");
    $("#newGame").addClass("newGame-before");
    $("#newGame").text("New Game");
    $("#newGame").off("click", resetWholeGame);
    $("#newGame").on("click", chooseLevel);
    $("header").removeClass("headerShow");
    $("header").addClass("headerHide");
    $("footer p").fadeOut(2000);
    $("audio")[0].pause();
  }

  function resetOneGame() {
    resetOneGameData();
    resetOneGameUI();
    showRecords();
    $("main button").prop("disabled", false);
  }

  function resetWholeGame() {
    resetWholeGameData();
    resetWholeGameUI();
    showRecords();
  }

  // function to start new game
  function newGame() {
    $("main button").prop("disabled", false);
    $("header").removeClass("headerHide");
    $("header").addClass("headerShow");
    $("footer p").fadeIn(2000);
    $("#newGame").removeClass("newGame-before");
    $("#newGame").addClass("newGame-after");
    $("#newGame").text("Reset Game");
    $("#newGame").off("click", chooseLevel);
    $("#newGame").on("click", resetWholeGame);
    showRecords();
    gameStart();
  }

  // function to check which side wins
  const checkWin = (buttonArr) => {
    const successfulPattern = [
      [1, 2, 3],
      [1, 4, 7],
      [3, 6, 9],
      [7, 8, 9],
      [2, 5, 8],
      [4, 5, 6],
      [1, 5, 9],
      [3, 5, 7],
    ];
    const containAnotherArray = (arrLonger, arr) =>
      arr.every((v) => arrLonger.includes(v));
    const resultArr = successfulPattern.map((arr) =>
      containAnotherArray(buttonArr, arr)
    );
    if (resultArr.includes(true)) {
      return true;
    }
  };

  // function of game logic
  function gameStart() {
    for (let i = 0; i < 9; i++) {
      // add click event listener to each button
      $(`#btn${i + 1}`).on("click", function () {
        // show circle on the button, disable it and record id
        buttons[`${i + 1}`] = { owner: "player" }; //future feature
        $(`#btn${i + 1}`).addClass("circle");
        $(`#btn${i + 1}`).prop("disabled", true);
        playerButtons.push(i + 1);
        // check whether draw
        if (Object.keys(buttons).length === 1 && !checkWin(playerButtons)) {
          $("#drawResult").addClass("show");
          records.draw++;
          records.rounds++;
          showRecords();
        }
        // check whether player wins: could more than 4 digits
        else if (checkWin(playerButtons)) {
          $("main button").prop("disabled", true);
          $("#win").addClass("show");
          records.playerWin++;
          showRecords();
          records.rounds++;
        }
        // select one randomly from remaining buttons and record id
        else {
          const computerMove = () => {
            delete buttons[`${i + 1}`];
            const remainBtns = Object.keys(buttons).filter(
              (id) => id !== i + 1
            );
            let randomBtnId =
              remainBtns[Math.floor(Math.random() * remainBtns.length)];

            // AI Algorithm //Begin
            if (level2) {
              // Find the button id that if player occupy in next step would cause computer to lose, replae random button id with that button's id
              const checkNextMoveNotLose = () => {
                for (let i = 0; i < remainBtns.length; i++) {
                  playerButtons.push(remainBtns[i] - 0);
                  if (checkWin(playerButtons)) {
                    randomBtnId = remainBtns[i];
                  }
                  playerButtons.pop();
                }
              };
              checkNextMoveNotLose();

              // Find the button id that if computer occupy in next step would cause computer to win, replae random button id with that button's id. Its priority is higher than not to lose, so call it secondly, make the random button id be finally replaced by this one if it's already replaced in above checkNextStepNotLose();
              const checkNextMoveWIn = () => {
                for (let i = 0; i < remainBtns.length; i++) {
                  computerButtons.push(remainBtns[i] - 0);
                  if (checkWin(computerButtons)) {
                    randomBtnId = remainBtns[i];
                  }
                  computerButtons.pop();
                }
              };
              checkNextMoveWIn();

              // Other special rules, when either side is not winning in the next move, should apply these rules

              // if player's first move is buttonId 5, then computer should occupy the corner buttons
              if (playerButtons.length === 1) {
                let cornerButtons = remainBtns.filter(
                  (id) => id == 1 || id == 3 || id == 7 || id == 9
                );
                randomBtnId =
                  cornerButtons[
                    Math.floor(Math.random() * cornerButtons.length)
                  ];
              }

              // Special rule
              if (level3) {
                if (
                  playerButtons.sort().toString() === "1,9" ||
                  playerButtons.sort().toString() === "3,7"
                ) {
                  crossButtons = [2, 4, 6, 8];
                  randomBtnId =
                    crossButtons[
                      Math.floor(Math.random() * crossButtons.length)
                    ];
                  console.log(randomBtnId);
                }
              }

              // if player didn't occupy buttonId 5 (central button), computer must occupy it
              if (level2 || level3) {
                if (remainBtns.includes("5")) {
                  randomBtnId = "5";
                }
              }
            }
            // AI Algorithm //End

            computerButtons.push(randomBtnId - 0);
            // show cross on random button, disable it and update info
            buttons[`${randomBtnId}`] = { owner: "computer" }; //future feature
            $(`#btn${randomBtnId}`).addClass("cross");
            $(`#btn${randomBtnId}`).prop("disabled", true);
            // delete
            delete buttons[`${randomBtnId}`];
            remainBtns.splice(remainBtns.indexOf(randomBtnId), 1);
            // check whether computer wins
            if (checkWin(computerButtons)) {
              $("main button").prop("disabled", true);
              $("#lose").addClass("show");
              records.computerWin++;
              records.rounds++;
              showRecords();
            }
          };
          // make computer look like taking time thinking
          setTimeout(computerMove, 300);
        }
      });
    }
  }

  // add event listners 
  $("#newGame").on("click", chooseLevel);
  $("#winContinue").on("click", resetOneGame);
  $("#winEndGame").on("click", resetWholeGame);
  $("#loseContinue").on("click", resetOneGame);
  $("#loseEndGame").on("click", resetWholeGame);
  $("#drawContinue").on("click", resetOneGame);
  $("#drawEndGame").on("click", resetWholeGame);
  $("#level1").on("click", goLevel1);
  $("#level2").on("click", goLevel2);
  $("#level3").on("click", goLevel3);
  $("#resetHighestScore").on("click", resetHighestScore);
});
