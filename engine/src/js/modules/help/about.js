import config from './../../config.js';
import Dialog_class from './../../libs/popup.js';

class Help_about_class {

	constructor() {
		this.POP = new Dialog_class();
	}

	about() {
		var settings = {
			title: 'About GIMP Lab',
			params: [
				{ title: "", html: '<div style="text-align:center;padding:12px;"><h2 style="font-size:24px;font-weight:700;color:#3b82f6;margin-bottom:6px;">GIMP Lab Pro</h2><p style="color:#94a3b8;font-size:13px;">Advanced Online Graphics & Photo Editor</p></div>' },
				{ title: "Version:", value: "1.0.0 Pro" },
				{ title: "Architecture:", value: "Client-Side Zero-Latency Web Engine" },
				{ title: "Cloud Integration:", value: "AWS S3 Presigned Direct Storage" },
				{ title: "Features:", value: "Multi-Layers, Retouching, Vector Shapes, Web Filters, Blend Modes" },
			],
		};
		this.POP.show(settings);
	}

}

export default Help_about_class;
