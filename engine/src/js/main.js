/**
 * GIMP Lab Engine
 */

//css
import './../css/reset.css';
import './../css/utility.css';
import './../css/component.css';
import './../css/layout.css';
import './../css/menu.css';
import './../css/print.css';
import './../../node_modules/alertifyjs/build/css/alertify.min.css';
//js
import app from './app.js';
import config from './config.js';
import './core/components/index.js';
import Base_gui_class from './core/base-gui.js';
import Base_layers_class from './core/base-layers.js';
import Base_tools_class from './core/base-tools.js';
import Base_state_class from './core/base-state.js';
import Base_search_class from './core/base-search.js';
import File_open_class from './modules/file/open.js';
import File_save_class from './modules/file/save.js';
import * as Actions from './actions/index.js';

function boot() {
	if (window.__GIMPLAB_BOOTED__) return;
	// Wait until skeleton DOM elements are mounted
	if (!document.getElementById('main_menu') || !document.getElementById('canvas_minipaint')) {
		setTimeout(boot, 40);
		return;
	}
	window.__GIMPLAB_BOOTED__ = true;

	// Initiate app
	var Layers = new Base_layers_class();
	var Base_tools = new Base_tools_class(true);
	var GUI = new Base_gui_class();
	var Base_state = new Base_state_class();
	var File_open = new File_open_class();
	var File_save = new File_save_class();
	var Base_search = new Base_search_class();

	// Register singletons in app module
	app.Actions = Actions;
	app.Config = config;
	app.FileOpen = File_open;
	app.FileSave = File_save;
	app.GUI = GUI;
	app.Layers = Layers;
	app.State = Base_state;
	app.Tools = Base_tools;

	// Register as global for external access
	window.Layers = Layers;
	window.AppConfig = config;
	window.State = Base_state;
	window.FileOpen = File_open;
	window.FileSave = File_save;
	window.GIMPLab = {
		boot: boot,
		app: app,
		Layers: Layers,
		GUI: GUI,
		Tools: Base_tools,
		State: Base_state,
		FileOpen: File_open,
		FileSave: File_save
	};

	// Render all
	GUI.init();
	Layers.init();

	window.dispatchEvent(new CustomEvent('gimplab:ready'));
}

window.GIMPLab = { boot: boot, app: app };

if (document.readyState === 'complete' || document.readyState === 'interactive') {
	boot();
} else {
	window.addEventListener('load', boot, false);
}
