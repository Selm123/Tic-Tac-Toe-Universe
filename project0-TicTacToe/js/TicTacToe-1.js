$(document).ready(function () {

  const buttons = {};

  

  // Junior level, AI would play the game randomly
  for (let i = 0; i < 9; i++) {
    buttons[`${i + 1}`] = { owner:'none' };
    $(`#btn${i + 1}`).on("click", function () {
      // draw circle and disable button
      buttons[`${i + 1}`] = { owner:'player' };
      $(`#btn${i + 1}`).addClass("circle");
      $(`#btn${i + 1}`).prop("disabled", true);
      // select one randomly from remaining buttons
      delete buttons[`${i + 1}`];
      const remainBtns = Object.keys(buttons).filter(id=>id!==i+1);
      const randomBtnId =
        remainBtns[Math.floor(Math.random() * remainBtns.length)];
      // make it draw cross and disable it
      buttons[`${randomBtnId}`] = { owner:'computer' };
      $(`#btn${randomBtnId}`).addClass("cross");
      $(`#btn${randomBtnId}`).prop("disabled", true);
      // delete
      delete buttons[`${randomBtnId}`];
      remainBtns.splice(remainBtns.indexOf(randomBtnId), 1);

      console.log(buttons);
      console.log(randomBtnId);
      console.log(remainBtns);
    });
  }

  console.log(buttons);
});
