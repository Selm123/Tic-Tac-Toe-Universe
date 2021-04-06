$(document).ready(function () {
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

console.log($('#myBtn'));

// // Re-write in jQuery

// // Modal Window script
// // Get the modal
// const modal = $("#myModal");

// // Get the button that opens the modal
// const btn = $("#myBtn");

// // Get the <span> element that closes the modal
// const span = $(".close")[0];

// // When the user clicks the button, open the modal
// btn.on("click", function () {
//   modal.css("display", "block");
//   console.log(modal.css());
// });

// // When the user clicks on <span> (x), close the modal
// span.on("click", function () {
//   modal.css("display", "none");
// });

// // When the user clicks anywhere outside of the modal, close it
// $(window).on("click", function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// });
// // End of Modal window script
});


