$(document).ready(function () {

    const buttons = {};
  
    const playerButtons = [];
  
    const computerButtons = [];
  
    let records = {
      rounds: 0,
      playerWin: 0,
      computerWin: 0,
    };
  
    const showRecords = () => {
      $("#rounds").text(`Rounds: ${records.rounds}`);
      $("#playerWin").text(`Player Win: ${records.playerWin}`);
      $("#computerWin").text(`Computer Win: ${records.computerWin}`);
    };
  
    showRecords();
  
    
  
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
        $("button").prop("disabled", true);
        return true;
      }
    };
  
    // Junior level, AI would play the game randomly
    for (let i = 0; i < 9; i++) {
      // initialize the info of each button (?del info?)
      buttons[`${i + 1}`] = { owner: "none" };
      // add click event listener to each button
      $(`#btn${i + 1}`).on("click", function () {
        // show circle on the button, disable it and record id
        buttons[`${i + 1}`] = { owner: "player" }; //?del?
        $(`#btn${i + 1}`).addClass("circle");
        $(`#btn${i + 1}`).prop("disabled", true);
        playerButtons.push(i + 1);
        // check whether player wins: could more than 4 digits
        if (checkWin(playerButtons)) {
          $("h1").text("You win!");
          records.playerWin++;
          records.rounds++;
          showRecords();
        }
        // select one randomly from remaining buttons and record id
        else {
          delete buttons[`${i + 1}`];
          const remainBtns = Object.keys(buttons).filter((id) => id !== i + 1);
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
            $("h1").text("computer win!");
            records.computerWin++;
            records.rounds++;
            showRecords();
          }
        }
      });
    }
  });
  