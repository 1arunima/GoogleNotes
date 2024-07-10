const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to update the local storage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to handle input events on input boxes
function handleInput() {
    updateStorage(); // Update storage whenever input is changed
}

// Function to create delete button and its event listener
function createDeleteButton(inputBox) {
    let deleteImg = document.createElement("img");
    deleteImg.src = "images/delete.png";
    return deleteImg;
}

createBtn.addEventListener("click", () => {
    let noteContainer = document.createElement("div"); // Create a container for each note
    noteContainer.className = "note-container"; // Add a class to the container for styling purposes

    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.addEventListener("input", handleInput); // Listen for input events on input box

    let deleteImg = createDeleteButton(inputBox); // Create delete button
    deleteImg.addEventListener("click", () => {
        let noteContainer = deleteImg.parentElement; // Get the parent note container
        noteContainer.remove(); // Remove the container when delete image is clicked
        updateStorage();
    });
    inputBox.appendChild(deleteImg);
    noteContainer.appendChild(inputBox); // Append input box to the note container
    notesContainer.appendChild(noteContainer); // Append note container to the notes container

    inputBox.focus(); // Focus the input box after creating a new note
});

// Function to retrieve data from local storage and populate the notes container
function populateNotes() {
    if (localStorage.getItem("notes")) {
        notesContainer.innerHTML = localStorage.getItem("notes");
    }
}

// Event listener for window's unload event to save data before closing the window
window.addEventListener("unload", () => {
    updateStorage();
});

// Event listener for window's load event to retrieve data when the window is reopened
window.addEventListener("load", () => {
    populateNotes();
});

// Event delegation for the delete functionality
notesContainer.addEventListener("click", (event) => {
    if (event.target && event.target.tagName === "IMG") {
        let noteContainer = event.target.parentElement; // Get the parent note container
        noteContainer.remove(); // Remove the container when delete image is clicked
        updateStorage();
    }
});

document.addEventListener("keydown",event=>{
    if(event.key==="Enter"){
        document.execCommand("insertLineBreak")
        event.preventDefault()
    }
})
