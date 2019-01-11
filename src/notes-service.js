const notesClientName = 'client-notes';
let notesInLocalStorage;

function getNotes() {
    if (!notesInLocalStorage) {
        updateNotes();
    }
    return notesInLocalStorage
}

function saveNote(note) {
    updateNotes();

    notesInLocalStorage.forEach(
        (item, index) => {
            if (item.date === note.date && item.title === note.title) {
                notesInLocalStorage.splice(index, 1);
            }
        }
    );

    notesInLocalStorage.push(note);

    saveNotes();
}

function saveNotes(notes = notesInLocalStorage) {
    localStorage.setItem(notesClientName, JSON.stringify(notes));
    updateNotes();
}

function updateNotes() {
    notesInLocalStorage = JSON.parse(localStorage.getItem(notesClientName)) || [];
}