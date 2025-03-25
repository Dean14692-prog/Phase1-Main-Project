document.addEventListener("DOMContentLoaded", () => {
  // Load existing notes when the page loads
  //Calling the function to get data form db.json
  loadNotes();

  // Select the "Add" button and attach an event listener
  const addButton = document.querySelector(".btnn");
  addButton.addEventListener("click", addNote);
});

// Function to add a new note
async function addNote() {
  const noteInput = document.querySelector(".inputText");
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("Please enter a note!");
    return;
  }
  //create object where your notes will be created
  const newNote = { text: noteText };

  try {
    const url = "http://localhost:3000/notes";
    const dataJson = JSON.stringify(newNote);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    });

    const savedNote = await response.json();
    displayNote(savedNote);
    noteInput.value = ""; // Clear input field
  } catch (error) {
    console.error("Error adding note:", error);
  }
}

// Function to fetch and display notes from db.json
async function loadNotes() {
  try {
    //Fetch data from a database.
    const response = await fetch("http://localhost:3000/notes");
    //Extract the JSON data from the response after making a fetch() request.
    const notes = await response.json();
    // Display all notes
    notes.forEach(displayNote);
  } catch (error) {
    console.error("Error loading notes:", error);
  }
}

// Function to display a note on the UI
function displayNote(note) {
  const cardContainer = document.querySelector(".card");

  // Create a new div for the note
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.textContent = note.text;

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
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

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }

    // Remove the note from the UI
    noteElement.remove();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}
