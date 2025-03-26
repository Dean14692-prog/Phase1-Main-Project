document.addEventListener("DOMContentLoaded", () => {
  // Load existing notes when the page loads
  //Calling the function to get data form db.json
  loadNotes();

  // Select the "Add" button and attach an event listener
  const addButton = document.querySelector(".btnn");
  addButton.addEventListener("click", addNote);
});

// Function to add/POST a new note in the database
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
  } catch (error) {
    console.error("Error adding note:", error);
  }
}




// Function to fetch and display notes from db.json
async function loadNotes() {
  const getUrl = "http://localhost:3000/notes";
  try {
    // Send a GET request to the specified URL.
    const response = await fetch(getUrl);
    // Wait for the response and then convert it from JSON text into a JavaScript object.
    const notes = await response.json();
    // For each note in the notes array, call the displayNote function to show it.
    notes.forEach(displayNote);
  } catch (error) {
    // If something goes wrong, log the error to the console.
    console.error("Error loading notes:", error);
  }
}

// Function to display a note on the UI
function displayNote(card) {
  const cardContainer = document.querySelector(".card");
  // Create a new div for the note
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  // Set the text inside the new <div> to be the value of 'card.text'.
  // This means that whatever text is stored in 'card.text' will appear in this element.
  noteDiv.innerText = card.text;

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Dlt";
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
