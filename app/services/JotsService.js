import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { saveState } from "../utils/Store.js";
import { setHTML } from "../utils/Writer.js";



function _saveJot() {
    saveState('current-jot', AppState.jots)
}

// NOTE we don't send off the _drawJot to the service because the controller handles all of that
// function _drawJots() {
//     const jots = AppState.jots
//     let template = ''

//     jots.forEach(jot => template += jot.JotsTemplate)

//     setHTML(template)
// }

class JotsService {

    setCurrentJot(jotId) {

        const selectedJot = AppState.jots.find(jot => jot.id == jotId)
        console.log('current jot', selectedJot)

        AppState.currentJot = selectedJot

        console.log('current jot', AppState.currentJot)
    }

    saveJot(newJot) {
        const savedJot = AppState.currentJot;
        savedJot.jotData = newJot;
        _saveState;
    }

    createJot(jotData) {
        const newJot = new Jot(jotData);

        console.log('constructed', newJot);

        AppState.jots.push(newJot);

        _saveJot();

        AppState.emit('jots');
    }

    deleteJot(jotId) {
        const jotIndex = AppState.jots.findIndex(jot => jot.id == jotId)

        console.log('jot index', jotIndex);

        AppState.jots.splice(jotIndex, 1)

        if (jotIndex < 0) {
            return
        }

        _saveJot()

        AppState.emit('jots')
    }

}







export const jotsService = new JotsService()