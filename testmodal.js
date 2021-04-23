
    
// button that opens the modal


// // Get the <span> element that closes the modal
// modalCloseButton = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
body.onclick = function() {
  modal.style.display = "block";
}

// // When the user clicks on <span> (x), close the modal
// letcloseModalButton.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// Get the modalForm
var modalForm = document.getElementById("myModal");

// Get the button that opens the modalForm
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modalForm
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modalForm
span.onclick = function(event) {
    if (event.target == modalForm) {
      modalForm.style.display = "none";
    }
  }