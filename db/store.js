const fs = require("fs");
const util = require("util");
const { v4: generateId } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function read() {
  return readFileAsync("db/db.json", "utf-8");
}

function write(notes) {
  return writeFileAsync("db/db.json", JSON.stringify(notes));
}

class Store {
  getNotes() {
    return read().then((notes) => {
      return JSON.parse(notes);
    });
  }

  writeNote(note) {
    note.id = generateId();

    return this.getNotes()
      .then((notes) => [...notes, note])
      .then((updatedNotes) => write(updatedNotes))
      .then(() => note);
  }

  deleteNote(id) {

    return this.getNotes()
      .then((notes) =>  notes.filter((note) => note.id !== id))
      .then((filteredNotes) => write(filteredNotes));
  }
}

module.exports = new Store();
