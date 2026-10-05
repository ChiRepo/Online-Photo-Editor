import app from './../../app.js';
import config from './../../config.js';
import Base_layers_class from './../../core/base-layers.js';
import Dialog_class from './../../libs/popup.js';
import alertify from './../../../../node_modules/alertifyjs/build/alertify.min.js';

var instance = null;

class File_cloud_class {
	constructor() {
		if (instance) return instance;
		instance = this;
		this.POP = new Dialog_class();
		this.Base_layers = new Base_layers_class();
	}

	save_image() {
		var _this = this;
		var defaultName = 'Artwork_' + new Date().toISOString().slice(0, 10).replace(/-/g, '');
		var settings = {
			title: 'Save Image to Cloud (AWS S3)',
			params: [
				{ name: 'name', title: 'File name:', value: defaultName },
				{ name: 'type', title: 'Format:', value: 'PNG', values: ['PNG', 'JPG', 'WEBP'] },
				{ name: 'quality', title: 'Quality (1-100):', value: 90 },
			],
			on_finish: function (params) {
				_this.do_save_image(params);
			},
		};
		this.POP.show(settings);
	}

	async do_save_image(params) {
		var _this = this;
		var name = (params.name || 'Artwork').trim().replace(/[^a-zA-Z0-9_\-]/g, '_');
		var type = (params.type || 'PNG').toUpperCase();
		var quality = Math.max(1, Math.min(100, parseInt(params.quality) || 90)) / 100;
		var ext = type.toLowerCase();
		var mimeType = type === 'JPG' ? 'image/jpeg' : (type === 'WEBP' ? 'image/webp' : 'image/png');

		alertify.message('Preparing canvas for cloud upload...');

		// Render all layers to temporary canvas
		var tempCanvas = document.createElement('canvas');
		tempCanvas.width = config.WIDTH;
		tempCanvas.height = config.HEIGHT;
		var ctx = tempCanvas.getContext('2d');

		this.Base_layers.convert_layers_to_canvas(ctx, null, false);

		if (!config.TRANSPARENCY || type === 'JPG') {
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, config.WIDTH, config.HEIGHT);
			ctx.globalCompositeOperation = 'source-over';
		}

		tempCanvas.toBlob(async function (blob) {
			if (!blob) {
				alertify.error('Failed to create image blob.');
				return;
			}

			try {
				alertify.message('Uploading directly to AWS S3...');
				var publicUrl = null;
				var fullFileName = name + '.' + ext;

				// Task B: Direct multipart form backend upload stream
				try {
					var formData = new FormData();
					formData.append('file', blob, fullFileName);
					formData.append('fileName', fullFileName);
					formData.append('folder', 'projects');

					var uploadRes = await fetch('/api/storage/upload', {
						method: 'POST',
						body: formData,
					});

					if (uploadRes.ok) {
						var data = await uploadRes.json();
						publicUrl = data.url;
					}
				} catch (uploadErr) {
					console.warn('Direct upload stream failed, attempting presigned URL fallback:', uploadErr);
				}

				// Task C fallback: Presigned URL PUT
				if (!publicUrl) {
					alertify.message('Requesting S3 Presigned URL...');
					var presignRes = await fetch('/api/storage/upload-url', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							fileName: fullFileName,
							fileType: mimeType,
							folder: 'projects',
						}),
					});

					if (!presignRes.ok) {
						throw new Error('Presigned URL request failed with status ' + presignRes.status);
					}

					var presignData = await presignRes.json();
					var putRes = await fetch(presignData.uploadUrl, {
						method: 'PUT',
						headers: { 'Content-Type': mimeType },
						body: blob,
					});

					if (!putRes.ok) {
						throw new Error('S3 direct PUT failed with status ' + putRes.status);
					}
					publicUrl = presignData.publicUrl;
				}

				alertify.success('Saved successfully to S3!');

				// Show dialog with shareable public link
				_this.POP.show({
					title: 'Cloud Upload Complete',
					params: [
						{
							title: '',
							html: '<div style="padding:10px;text-align:center;">'
								+ '<p style="color:#4ade80;font-weight:bold;margin-bottom:12px;">Image uploaded to S3 successfully!</p>'
								+ '<input type="text" readonly value="' + publicUrl + '" style="width:100%;padding:8px;background:#18181b;color:#e4e4e7;border:1px solid #3f3f46;border-radius:6px;font-size:12px;margin-bottom:12px;" onclick="this.select()" />'
								+ '<a href="' + publicUrl + '" target="_blank" style="display:inline-block;padding:8px 16px;background:#3b82f6;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">View in Browser</a>'
								+ '</div>'
						}
					]
				});

			} catch (err) {
				console.error('Cloud save error:', err);
				alertify.error('Upload failed: ' + err.message);
			}
		}, mimeType, quality);
	}

	save_project() {
		var _this = this;
		var defaultName = 'Project_' + new Date().toISOString().slice(0, 10).replace(/-/g, '');
		var settings = {
			title: 'Save Layered Project to Cloud (AWS S3)',
			params: [
				{ name: 'name', title: 'Project name:', value: defaultName },
			],
			on_finish: function (params) {
				_this.do_save_project(params);
			},
		};
		this.POP.show(settings);
	}

	async do_save_project(params) {
		var _this = this;
		var name = (params.name || 'GIMPLab_Project').trim().replace(/[^a-zA-Z0-9_\-]/g, '_');
		var fullFileName = name + '.json';

		try {
			alertify.message('Packaging project layers...');
			var jsonString = app.FileSave.export_as_json();
			var blob = new Blob([jsonString], { type: 'application/json' });

			alertify.message('Uploading project to AWS S3...');
			var publicUrl = null;

			// Task B: Direct multipart form backend upload stream
			try {
				var formData = new FormData();
				formData.append('file', blob, fullFileName);
				formData.append('fileName', fullFileName);
				formData.append('folder', 'projects');

				var uploadRes = await fetch('/api/storage/upload', {
					method: 'POST',
					body: formData,
				});

				if (uploadRes.ok) {
					var data = await uploadRes.json();
					publicUrl = data.url;
				}
			} catch (uploadErr) {
				console.warn('Direct project upload stream failed, attempting presigned fallback:', uploadErr);
			}

			// Task C fallback: Presigned URL PUT
			if (!publicUrl) {
				var presignRes = await fetch('/api/storage/upload-url', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						fileName: fullFileName,
						fileType: 'application/json',
						folder: 'projects',
					}),
				});

				if (!presignRes.ok) {
					throw new Error('Presigned URL request failed with status ' + presignRes.status);
				}

				var presignData = await presignRes.json();
				var putRes = await fetch(presignData.uploadUrl, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: blob,
				});

				if (!putRes.ok) {
					throw new Error('S3 upload failed with status ' + putRes.status);
				}
				publicUrl = presignData.publicUrl;
			}

			alertify.success('Project saved to Cloud successfully!');
			
			_this.POP.show({
				title: 'Project Upload Complete',
				params: [
					{
						title: '',
						html: '<div style="padding:10px;text-align:center;">'
							+ '<p style="color:#4ade80;font-weight:bold;margin-bottom:12px;">Layered project saved to S3 successfully!</p>'
							+ '<input type="text" readonly value="' + publicUrl + '" style="width:100%;padding:8px;background:#18181b;color:#e4e4e7;border:1px solid #3f3f46;border-radius:6px;font-size:12px;margin-bottom:12px;" onclick="this.select()" />'
							+ '<p style="color:#94a3b8;font-size:12px;">You can reopen this project with all layers intact using "Open from Cloud...".</p>'
							+ '</div>'
					}
				]
			});
		} catch (err) {
			console.error('Save project error:', err);
			alertify.error('Failed to save project: ' + err.message);
		}
	}

	async open() {
		var _this = this;
		alertify.message('Fetching files from S3...');
		
		try {
			var res = await fetch('/api/storage/list');
			if (!res.ok) {
				throw new Error('Failed to retrieve files: ' + res.status);
			}
			var data = await res.json();
			var files = data.files || [];

			_this.render_cloud_browser(files);
		} catch (err) {
			console.error('List error:', err);
			alertify.error('Failed to load S3 files: ' + err.message);
		}
	}

	render_cloud_browser(files) {
		var _this = this;
		var html = '';

		if (files.length === 0) {
			html = '<div style="padding:40px;text-align:center;color:#94a3b8;">No projects or images found in your S3 bucket.</div>';
		} else {
			html += '<div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:16px;max-height:480px;overflow-y:auto;padding:8px;">';
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var isJson = file.key.endsWith('.json');
				var dateStr = file.lastModified ? new Date(file.lastModified).toLocaleDateString() : '';
				var sizeKb = file.size ? (Math.round(file.size / 1024) + ' KB') : '';
				var displayName = file.key.replace(/^projects\//, '').replace(/^uploads\//, '');
				displayName = displayName.replace(/_([0-9]{13})\./, '.');

				html += '<div style="background:#18181b;border:1px solid #27272a;border-radius:8px;padding:12px;display:flex;flex-direction:column;justify-content:space-between;transition:border-color 0.2s;" onmouseover="this.style.borderColor=\'#3b82f6\'" onmouseout="this.style.borderColor=\'#27272a\'">';
				
				// Preview thumbnail
				if (isJson) {
					html += '<div style="height:110px;background:#27272a;border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#60a5fa;margin-bottom:8px;">'
						+ '<span style="font-size:28px;">📑</span>'
						+ '<span style="font-size:11px;font-weight:600;margin-top:4px;">Layered Project</span>'
						+ '</div>';
				} else {
					html += '<div style="height:110px;background:#09090b;border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden;margin-bottom:8px;">'
						+ '<img src="' + file.url + '" style="max-width:100%;max-height:100%;object-fit:contain;" alt="" loading="lazy" />'
						+ '</div>';
				}

				// Meta info
				html += '<div style="margin-bottom:10px;">';
				html += '<div style="font-size:12px;font-weight:600;color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="' + file.key + '">' + displayName + '</div>';
				html += '<div style="font-size:11px;color:#71717a;margin-top:2px;">' + sizeKb + ' • ' + dateStr + '</div>';
				html += '</div>';

				// Action buttons
				html += '<div style="display:flex;gap:8px;">';
				html += '<button type="button" class="btn-cloud-open" data-url="' + file.url + '" data-is-json="' + isJson + '" style="flex:1;padding:6px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;font-weight:600;">Open</button>';
				html += '<button type="button" class="btn-cloud-delete" data-key="' + file.key + '" style="padding:6px 10px;background:#27272a;color:#ef4444;border:1px solid #3f3f46;border-radius:6px;font-size:12px;cursor:pointer;">🗑</button>';
				html += '</div>';

				html += '</div>';
			}
			html += '</div>';
		}

		_this.POP.show({
			title: 'Cloud Storage (AWS S3) - ' + files.length + ' files',
			params: [
				{
					title: '',
					html: html,
				}
			]
		});

		// Attach click listeners to dynamically rendered buttons
		setTimeout(function () {
			var openButtons = document.querySelectorAll('.btn-cloud-open');
			openButtons.forEach(function (btn) {
				btn.addEventListener('click', async function () {
					var url = btn.getAttribute('data-url');
					var isJson = btn.getAttribute('data-is-json') === 'true';
					_this.POP.hide();

					alertify.message('Loading from Cloud...');
					if (isJson) {
						try {
							var res = await fetch(url);
							if (!res.ok) throw new Error('HTTP ' + res.status);
							var data = await res.json();
							await app.FileOpen.load_json(data, false);
							alertify.success('Project loaded successfully!');
						} catch (err) {
							console.error('Load project error:', err);
							alertify.error('Failed to load project: ' + err.message);
						}
					} else {
						app.FileOpen.open_resource(url);
					}
				});
			});

			var deleteButtons = document.querySelectorAll('.btn-cloud-delete');
			deleteButtons.forEach(function (btn) {
				btn.addEventListener('click', async function () {
					var key = btn.getAttribute('data-key');
					if (!confirm('Are you sure you want to delete ' + key + ' from S3?')) {
						return;
					}

					try {
						alertify.message('Deleting from S3...');
						var delRes = await fetch('/api/storage/delete', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ key: key }),
						});

						if (!delRes.ok) {
							throw new Error('Delete failed: ' + delRes.status);
						}

						alertify.success('Deleted from S3');
						_this.POP.hide();
						_this.open(); // refresh list
					} catch (err) {
						alertify.error('Delete error: ' + err.message);
					}
				});
			});
		}, 100);
	}
}

export default File_cloud_class;
