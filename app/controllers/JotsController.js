import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js"
import { jotsService } from "../services/JotsService.js"
import { saveState } from "../utils/Store.js"
import { setHTML, setText } from "../utils/Writer.js"
import { Pop } from "../utils/Pop.js"
import { getFormData } from "../utils/FormHandler.js"


function _saveJot() {
    saveState('current-jot', AppState.jots);
}

// NOTE Lets take a look at how to get the jots list to persist on refresh. Compare to redacted as reference
// NOTE Once you get the list to draw persistently, take a look at how to get the active jot drawn to the page.
// NOTE think about using a getter for the currentJotTemplate. On that template you can have a save and delete button that will allow you to edit and delete a jot. 
function _drawJots() {
    const jots = AppState.jots
    let template = ''
    console.log(jots);
    jots.forEach(jot => template += jot.JotsTemplate);
    setHTML('jots-list', template);
    setText('jots-number', jots.length);
}

function _drawCurrentJot() {
    const currentJot = AppState.currentJot
    if (currentJot) {
        setHTML('current-jot', currentJot.JotsMain)
    } else {
        setHTML('current-jot', 'Please select a jot.')
    }
}

export class JotsController {
    constructor() {
        console.log('jots controller loaded');

        _drawJots();
        _drawCurrentJot();

        AppState.on('jots', _drawJots);
        AppState.on('currentJot', _drawCurrentJot);


        // setInterval(jotsService.saveJot, 1000);
    }

    setCurrentJot(jotId) {
        console.log('setting current', jotId);
        jotsService.setCurrentJot(jotId);
    }

    updateJot() {
        console.log('updating')
        jotsService.updateJot()

        const JotElm = document.getElementById('jot-element')
    }

    createJot(event) {
        event.preventDefault()

        console.log('did form submit?');

        const form = event.target

        const jotData = getFormData(form)

        console.log('jot data', jotData);

        jotsService.createJot(jotData);

        form.reset();
    }

    async deleteJot(jotId) {

        const wantsToDelete = await Pop.confirm('Do you really want to delete this Jot?')
        if (!wantsToDelete) {
            return
        }

        jotsService.deleteJot(jotId)
    }
}