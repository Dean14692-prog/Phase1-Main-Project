/**
 * let divForm = document.querySelector(".form");
let inputText = document.querySelector(".input");
// const addBtnn = document.querySelector(".btnn");
let notesArea = document.querySelector(".notes");

**/

// Find the button with the class .btnn and store it in addBtnn
const addBtnn = document.querySelector(".btnn");

// Add Click Event Listener on the addBtnn
addBtnn.addEventListener("click", whenClicked);

// Function to run when the button is clicked
function whenClicked() {
  let inputField = document.querySelector(".inputText");
  // Get the input value and store in the noteText
  let noteText = inputField.value;

  // Prevent adding empty notes
  if (noteText.trim() === "") return;

  // Create a new div for the note
  let note = document.createElement("div");

  // Add a class to the new div
  note.className = "note";

  // Set the text content of the new note
  note.innerText = noteText;

  // Append the new note inside the .notes container
  document.querySelector(".notes").appendChild(note);

  // Clear the input field after adding the note
  document.querySelector(".inputText").value = "";
}
