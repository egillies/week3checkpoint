import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";
import { JotsController } from "./controllers/JotsController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: JotsController,
    view: /*html*/`
    <div class="container-fluid">
    <div class="row">
    <div class="col-12 bg-dark text-light">
    <h4><span id="jots-number"></span> Jots</h4>
    
    <div id="jots-list">
    
    </div>
    </div>
    </div>
    </div>

    `
  },

]