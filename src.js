document.addEventListener("DOMContentLoaded", () => {
  // Load existing notes when the page loads
  loadNotes();

  // Select the "Add" button and attach an event listener
  const addButton = document.querySelector("#addNoteButton");
  addButton.addEventListener("click", addNote);
});

// Function to add/POST a new note in the database
async function addNote() {
  // Get the topic input element and its trimmed value
  const noteTopicElement = document.querySelector("#noteTopic");
  const noteTopic = noteTopicElement.value.trim();

  // Get the content input element and its trimmed value
  const noteInputElement = document.querySelector("#noteInput");
  const noteContent = noteInputElement.value.trim(); // Remove the spaces before or after the text.

  //Condition to ensure we do not save an empty note
  if (noteTopic === "" || noteContent === "") {
    alert("Please enter both topic and content!");
    return;
  }
  // Create object where your notes will be created
  const newNote = { topic: noteTopic, text: noteContent };
  try {
    const jsonString = JSON.stringify(newNote);
    const url = "http://localhost:3000/notes";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString, // converts the JavaScript object newNote into a JSON string
    });

    if (!response.ok) throw new Error("Failed to add note");

    //Converts the JSON data into a JavaScript object.
    const savedNote = await response.json();
    // Clear input fields once add button is clicked
    document.querySelector("#noteTopic").value = "";
    document.querySelector("#noteInput").value = "";
  } catch (error) {
    console.error("Error adding note:", error);
  }
}

// Function to fetch and display notes from db.json
//Performs GET Operation, retrieving data from the dB
async function loadNotes() {
  const url = "http://localhost:3000/notes";
  try {
    const response = await fetch(url); // Send GET request to the dB
    const notes = await response.json(); // Converts the response to JS Object
    const cardContainer = document.querySelector(".card");
    cardContainer.innerText = ""; // Clear existing notes before loading new ones
    notes.forEach(displayNote);
  } catch (error) {
    //Prints "Error:" followed by the actual error message in the browser’s console.

    console.error("Error loading notes:", error);
  }
}

// Function to display a note on the UI
function displayNote(note) {
  const cardContainer = document.querySelector(".card");

  // Create a new div for the note
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.innerText = `${note.topic} ${note.text}`;

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  // Delete event
  deleteButton.addEventListener("click", () => deleteNote(note.id, noteDiv));

  // Append delete button to the note div
  noteDiv.appendChild(deleteButton);

  // Add the note to the card container
  cardContainer.appendChild(noteDiv);
}

// Function to delete a note from UI and db.json
async function deleteNote(id, noteElement) {
  try {
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete note");

    // Remove the note from the UI
    noteElement.remove();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}
