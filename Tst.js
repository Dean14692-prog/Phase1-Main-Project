// When the DOM loads, fetch and display all notes
document.addEventListener("DOMContentLoaded", loadNotes);

// Function to fetch notes from the server
async function loadNotes() {
  try {
    // Fetch notes from your server (adjust the URL as needed)
    const response = await fetch("http://localhost:3000/notes");
    // Convert the response to JSON
    const notes = await response.json();
    // Display each note by calling displayNote
    notes.forEach(displayNote);
  } catch (error) {
    console.error("Error loading notes:", error);
  }
}

// Function to display a note on the UI
function displayNote(card) {
  // Select the container element where notes will be displayed.
  const cardContainer = document.querySelector(".card");

  // Create a div for the note content (initially hidden)
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.innerText = card.text; // Note content from the card object
  noteDiv.style.display = "none";

  // Create a div for the topic (title)
  const topicDiv = document.createElement("div");
  topicDiv.classList.add("note-title");
  topicDiv.innerText = card.topic; // Note title from the card object

  // Create a toggle button to show/hide note content
  const toggleButton = document.createElement("button");
  toggleButton.innerText = "View Note";
  toggleButton.classList.add("button");

  // When the button is clicked, toggle the noteDiv's visibility
  toggleButton.addEventListener("click", () => {
    noteDiv.style.display = noteDiv.style.display === "none" ? "block" : "none";
  });

  // Append the toggle button to the topic div
  topicDiv.appendChild(toggleButton);

  // Append the topic and note content divs to the container
  cardContainer.appendChild(topicDiv);
  cardContainer.appendChild(noteDiv);
}
