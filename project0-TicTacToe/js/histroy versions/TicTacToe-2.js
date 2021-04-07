$(document).ready(function () {
    const buttons = {};
  
    const playerButtons = [];
  
    const computerButtons = [];
  
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
        // select one randomly from remaining buttons and record id
        delete buttons[`${i + 1}`];
        const remainBtns = Object.keys(buttons).filter((id) => id !== i + 1);
        const randomBtnId =
          remainBtns[Math.floor(Math.random() * remainBtns.length)];
        computerButtons.push(randomBtnId-0);
        // show cross on random button, disable it and update info
        buttons[`${randomBtnId}`] = { owner: "computer" }; //?del?
        $(`#btn${randomBtnId}`).addClass("cross");
        $(`#btn${randomBtnId}`).prop("disabled", true);
        // delete
        delete buttons[`${randomBtnId}`];
        remainBtns.splice(remainBtns.indexOf(randomBtnId), 1);
  
  
        console.log(playerButtons);
        console.log(computerButtons);
      });
    }
  
    console.log(buttons);
  });
  