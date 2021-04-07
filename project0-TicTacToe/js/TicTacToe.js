$(document).ready(function () {
  let buttons = {};

  for (let i = 0; i < 9; i++) {
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

  let highestScore = 0;

  const updateHighestScore = () => {
    if (records.playerWin >= (highestScore - 0)) {
      highestScore = records.playerWin;
    }
    localStorage.setItem("highestScore", highestScore);
  };

  $("#newGame").on("click", newGame);
  $("#winContinue").on("click", resetOneGame);
  $("#winEndGame").on("click", resetWholeGame);
  $("#loseContinue").on("click", resetOneGame);
  $("#loseEndGame").on("click", resetWholeGame);
  $("#drawContinue").on("click", resetOneGame);
  $("#drawEndGame").on("click", resetWholeGame);

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
    $("#newGame").on("click", newGame);
    $("header").removeClass("show");
    $("footer p").removeClass("show");
    // $('audio')[0].stop();
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

  function newGame() {
    $("main button").prop("disabled", false);
    $("header").addClass("show");
    $("footer p").addClass("show");
    $("#newGame").removeClass("newGame-before");
    $("#newGame").addClass("newGame-after");
    $("#newGame").text("Reset Game");
    $("#newGame").off("click", newGame);
    $("#newGame").on("click", resetWholeGame);
    showRecords();
    gameStart();
    // remove temporarily
    // $('audio')[0].play();
  }

  const showRecords = () => {
    $("#rounds").text(`Rounds: ${records.rounds}`);
    $("#playerWin").text(`Player Win: ${records.playerWin}`);
    $("#computerWin").text(`Computer Win: ${records.computerWin}`);
    $("#draw").text(`Draw: ${records.draw}`);
    $("#highestScore").text(
      `Highest Score: ${localStorage.getItem("highestScore")}`
    );
  };

  // function to check whether wins
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
      $("main button").prop("disabled", true);
      return true;
    }
  };

  function gameStart() {
    for (let i = 0; i < 9; i++) {
      // add click event listener to each button
      $(`#btn${i + 1}`).on("click", function () {
        // show circle on the button, disable it and record id
        buttons[`${i + 1}`] = { owner: "player" }; //?del?
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
          $("#win").addClass("show");
          records.playerWin++;
          records.rounds++;
          showRecords();
        }
        // select one randomly from remaining buttons and record id
        else {
          const computerMove = () => {
            delete buttons[`${i + 1}`];
            const remainBtns = Object.keys(buttons).filter(
              (id) => id !== i + 1
            );
            const randomBtnId =
              remainBtns[Math.floor(Math.random() * remainBtns.length)];
            computerButtons.push(randomBtnId - 0);
            // show cross on random button, disable it and update info
            buttons[`${randomBtnId}`] = { owner: "computer" }; //?del?
            $(`#btn${randomBtnId}`).addClass("cross");
            $(`#btn${randomBtnId}`).prop("disabled", true);
            // delete
            delete buttons[`${randomBtnId}`];
            remainBtns.splice(remainBtns.indexOf(randomBtnId), 1);
            // check whether computer wins
            if (checkWin(computerButtons)) {
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
  // Junior level, AI would play the game randomly
});
