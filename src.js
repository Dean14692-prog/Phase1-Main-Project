function addNote() {
  // Step 1: Get the note input value
  const noteInput = document.getElementById("noteInput");
  const noteText = noteInput.value.trim();

  // Step 2: Check if the input is empty
  if (noteText === "") {
    alert("Please enter a note!");
    return;
  }

  // Step 3: Create a new note object
  const newNote = { text: noteText };

  // Step 4: Send the note to db.json
  fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
    .then((response) => response.json())
    .then((savedNote) => {
      // Step 5: Add note to the UI
      displayNote(savedNote);
      noteInput.value = ""; // Clear input field
    })
    .catch((error) => console.error("Error adding note:", error));
}
