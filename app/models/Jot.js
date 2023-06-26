import { generateId } from "../utils/generateId.js";

export class Jot {
  constructor(data) {
    this.id = generateId()
    this.jot = data.currentJot || 'No current Jots!'
    this.color = data.color
    this.createdDate = data.createdDate
    this.updatedDate = data.updatedDate
    this.title = data.title

    const updatedDate = new Date(document.lastModified)
    this.createdDate = data.createdDate ? new Date(data.createdDate) : new Date()
  }

  // get currentJot() {
  //   return `
  //   <p>${this.createdDate}</p>
  //   <button onclick="app.JotsController.createJot()"> Create </button>
  //   `
  // }

  // NOTE moved jot list template here 
  get JotsTemplate() {
    return `
    <p class="selectable" onclick="app.JotsController.setCurrentJot('${this.id}')">${this.title}</p>
    <button onclick="app.JotsController.deleteJot('${this.id}')" class="btn btn-danger mt-2">Delete Jot</button>
    <p>${this.createdDate}</p>
    <p>${this.updatedDate}</p>
    `
  }

  get JotsMain() {
    return `
    <h1>Here is my active note</h1>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="jots-title">${this.title}</h5>
    <p>${this.currentJot}</p>
        <textarea>${this.currentJot}</textarea>
        <button onclick="app.JotsController.saveJot('${this.id}')" class="btn btn-success">Save Jot</button>
      </div>
    </div>
    `
  }

}