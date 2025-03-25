// Find the button with the class .btnn and store it in addBtnn
const addBtnn = document.querySelector(".btnn");

// Add Click Event Listener on the addBtnn
addBtnn.addEventListener("click", whenClicked);

// Function to run when the button is clicked
function whenClicked() {
  let inputField = document.querySelector(".inputText");

  // Get the input value and store it in noteText
  let noteText = inputField.value.trim();

  // Prevent adding empty notes
  if (noteText === "") return;

  // Create a new div for the note
  let note = document.createElement("div");

  // Add a class to the new div so it can be styled in CSS
  note.className = "note";

  // Set the text content of the new note
  note.innerText = noteText;

  // Append the new note inside the .note-card container
  document.querySelector(".card").appendChild(note);

  // Clear the input field after adding the note
  inputField.value = "";
}
