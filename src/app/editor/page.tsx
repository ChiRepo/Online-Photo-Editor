'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

function EditorEngine() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleReady = () => {
      const gimp = (window as any).GIMPLab;
      if (!gimp || !gimp.app) return;

      const w = searchParams.get('w');
      const h = searchParams.get('h');
      const action = searchParams.get('action');

      if (w && h) {
        const width = parseInt(w);
        const height = parseInt(h);
        if (width > 0 && height > 0 && gimp.app.State && gimp.app.Actions) {
          try {
            gimp.app.State.do_action(
              new gimp.app.Actions.Bundle_action('new_file', 'New File', [
                new gimp.app.Actions.Refresh_action_attributes_action('undo'),
                new gimp.app.Actions.Prepare_canvas_action('undo'),
                new gimp.app.Actions.Update_config_action({
                  TRANSPARENCY: false,
                  WIDTH: width,
                  HEIGHT: height,
                  ALPHA: 255,
                  COLOR: '#008000',
                  mouse: {},
                  visible_width: null,
                  visible_height: null,
                  user_fonts: {},
                }),
                new gimp.app.Actions.Prepare_canvas_action('do'),
                new gimp.app.Actions.Refresh_action_attributes_action('do'),
                new gimp.app.Actions.Reset_layers_action(),
                new gimp.app.Actions.Init_canvas_zoom_action(),
                new gimp.app.Actions.Insert_layer_action({}),
              ])
            );
            gimp.GUI?.GUI_preview?.zoom_auto(true);
          } catch (err) {
            console.error('Dimension init error:', err);
          }
        }
      }

      if (action === 'open') {
        setTimeout(() => {
          gimp.FileOpen?.open_file();
        }, 200);
      } else if (action === 'cloud') {
        setTimeout(() => {
          gimp.GUI?.modules?.['file/cloud']?.open();
        }, 200);
      }
    };

    window.addEventListener('gimplab:ready', handleReady);
    if ((window as any).__GIMPLAB_BOOTED__) {
      handleReady();
    }

    return () => {
      window.removeEventListener('gimplab:ready', handleReady);
    };
  }, [searchParams]);

  return (
    <>
      <div className="wrapper">
        <nav aria-label="Main Menu" className="main_menu" id="main_menu"></nav>

        <div className="submenu">
          <a className="logo" href="/">GIMP Lab</a>
          <div className="block attributes" id="action_attributes"></div>
          <button className="undo_button" id="undo_button" type="button">
            <span className="sr_only">Undo</span>
          </button>
        </div>

        <div className="sidebar_left" id="tools_container"></div>

        <div className="middle_area" id="middle_area">
          <canvas className="ruler_left" id="ruler_left"></canvas>
          <canvas className="ruler_top" id="ruler_top"></canvas>

          <div className="main_wrapper" id="main_wrapper">
            <div className="canvas_wrapper" id="canvas_wrapper">
              <div id="mouse"></div>
              <div className="transparent-grid" id="canvas_minipaint_background"></div>
              <canvas id="canvas_minipaint">
                <div className="trn error">
                  Your browser does not support canvas or JavaScript is not enabled.
                </div>
              </canvas>
            </div>
          </div>
        </div>

        <div className="sidebar_right">
          <div className="preview block">
            <h2 className="trn toggle" data-target="toggle_preview">Preview</h2>
            <div id="toggle_preview"></div>
          </div>

          <div className="colors block">
            <h2 className="trn toggle" data-target="toggle_colors">Colors</h2>
            <div className="content" id="toggle_colors"></div>
          </div>

          <div className="block" id="info_base">
            <h2 className="trn toggle toggle-full" data-target="toggle_info">Information</h2>
            <div className="content" id="toggle_info"></div>
          </div>

          <div className="details block" id="details_base">
            <h2 className="trn toggle toggle-full" data-target="toggle_details">Layer details</h2>
            <div className="content details-content" id="toggle_details"></div>
          </div>

          <div className="layers block">
            <h2 className="trn">Layers</h2>
            <div className="content" id="layers_base"></div>
          </div>
        </div>
      </div>

      <div className="mobile_menu">
        <button className="left_mobile_menu" id="left_mobile_menu_button" type="button">
          <span className="sr_only">Toggle Menu</span>
        </button>
        <button className="right_mobile_menu" id="mobile_menu_button" type="button">
          <span className="sr_only">Toggle Menu</span>
        </button>
      </div>

      <div className="hidden" id="tmp"></div>
      <div id="popups"></div>

      <Script
        src="/engine/gimplab-engine.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).GIMPLab && typeof (window as any).GIMPLab.boot === 'function') {
            (window as any).GIMPLab.boot();
          }
        }}
      />
    </>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading GIMP Lab Engine...</div>}>
      <EditorEngine />
    </Suspense>
  );
}
