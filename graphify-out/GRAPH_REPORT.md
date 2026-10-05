# Graph Report - GIMPLab  (2026-10-05)

## Corpus Check
- Large corpus: 331 files · ~530,406 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 2581 nodes · 6713 edges · 206 communities (49 shown, 157 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 287 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123
- Community 124
- Community 125
- Community 126
- Community 127
- Community 128
- Community 129
- Community 130
- Community 131
- Community 132
- Community 133
- Community 134
- Community 135
- Community 136
- Community 137
- Community 138
- Community 139
- Community 140
- Community 141
- Community 142
- Community 143
- Community 144
- Community 145
- Community 146
- Community 147
- Community 148
- Community 149
- Community 150
- Community 151
- Community 152
- Community 153
- Community 154
- Community 155
- Community 156
- Community 157
- Community 158
- Community 159
- Community 160
- Community 161
- Community 162
- Community 163
- Community 164
- Community 165
- Community 166
- Community 167
- Community 168
- Community 169
- Community 170
- Community 171
- Community 172
- Community 173
- Community 174
- Community 175
- Community 176
- Community 177
- Community 178
- Community 179
- Community 180
- Community 181
- Community 182
- Community 183
- Community 184
- Community 185
- Community 186
- Community 187
- Community 188
- Community 189
- Community 190
- Community 191
- Community 192
- Community 193
- Community 194
- Community 195
- Community 196
- Community 197
- Community 198
- Community 199
- Community 200
- Community 201

## God Nodes (most connected - your core abstractions)
1. `Base_layers_class` - 297 edges
2. `n()` - 216 edges
3. `d()` - 205 edges
4. `r()` - 185 edges
5. `A()` - 173 edges
6. `Dialog_class` - 164 edges
7. `Helper_class` - 150 edges
8. `Base_tools_class` - 113 edges
9. `t()` - 109 edges
10. `4692()` - 97 edges

## Surprising Connections (you probably didn't know these)
- `1410()` --indirect_call--> `R()`  [INFERRED]
  public/engine/gimplab-engine.js → engine/src/js/libs/glfx.js
- `1410()` --indirect_call--> `M()`  [INFERRED]
  public/engine/gimplab-engine.js → engine/src/js/libs/glfx.js
- `1410()` --indirect_call--> `O()`  [INFERRED]
  public/engine/gimplab-engine.js → engine/src/js/libs/glfx.js
- `le()` --indirect_call--> `O()`  [INFERRED]
  public/engine/gimplab-engine.js → engine/src/js/libs/glfx.js
- `1410()` --indirect_call--> `P()`  [INFERRED]
  public/engine/gimplab-engine.js → engine/src/js/libs/glfx.js

## Import Cycles
- 3-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-details.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 3-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/modules/tools/settings.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 3-file cycle: `engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-layers.js`
- 3-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/core/base-gui.js`
- 3-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/view/ruler.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-details.js -> engine/src/js/tools/text.js -> engine/src/js/core/base-tools.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-layers.js -> engine/src/js/modules/effects/browser.js -> engine/src/js/core/base-tools.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-layers.js -> engine/src/js/modules/effects/browser.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-details.js -> engine/src/js/modules/tools/settings.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-details.js -> engine/src/js/tools/text.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-information.js -> engine/src/js/modules/tools/settings.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-layers.js -> engine/src/js/modules/layer/rename.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-layers.js -> engine/src/js/modules/view/ruler.js -> engine/src/js/modules/tools/settings.js -> engine/src/js/libs/popup.js -> engine/src/js/core/base-layers.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-details.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-information.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-layers.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-preview.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/image/trim.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-details.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/view/ruler.js -> engine/src/js/core/base-gui.js`
- 4-file cycle: `engine/src/js/core/base-gui.js -> engine/src/js/core/gui/gui-information.js -> engine/src/js/core/base-layers.js -> engine/src/js/modules/view/ruler.js -> engine/src/js/core/base-gui.js`

## Communities (206 total, 157 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (8): Base_layers_class, Dialog_class, Help_about_class, Help_shortcuts_class, Layer_clear_class, Layer_delete_class, Layer_visibility_class, alertifyjs

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (105): 1217(), 1514(), 1705(), 1719(), 1791(), 1860(), 1924(), 1970() (+97 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (11): engine_node_modules_blueimp_canvas_to_blob_js_canvas_to_blob_min, engine_node_modules_file_saver_dist_filesaver_min, engine_node_modules_gif_js_optimized_index, engine_node_modules_pica_dist_pica, menuDefinition, Helper, Helper, Helper_class (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (7): Font_metrics_class, Google_fonts_search_class, load_font_family(), Text_class, Text_document_class, Text_editor_class, Text_selection_class

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (44): i(), o(), e(), i(), c(), D(), f(), h() (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (50): 4692(), $e(), fe(), ft(), ge(), gt(), ie(), jt() (+42 more)

### Community 7 - "Community 7"
Cohesion: 0.04
Nodes (43): 1003(), 1271(), d(), n(), 1381(), o(), 1817(), p() (+35 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (9): Base_search_class, Base_state_class, boot(), Copy_class, Edit_redo_class, Edit_undo_class, File_quicksave_class, File_save_class (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.04
Nodes (42): 1160(), t(), 2204(), t(), 3117(), a(), d(), t() (+34 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (48): v(), i(), a(), 312(), a(), 3761(), i(), r() (+40 more)

### Community 11 - "Community 11"
Cohesion: 0.04
Nodes (36): 1039(), 1513(), t(), 2498(), 2808(), t(), 4670(), t() (+28 more)

### Community 12 - "Community 12"
Cohesion: 0.07
Nodes (39): d(), z(), 1484(), 1563(), w(), v(), D(), o() (+31 more)

### Community 13 - "Community 13"
Cohesion: 0.04
Nodes (20): 2261(), 2901(), i(), 296(), 3029(), 3145(), 3662(), 388() (+12 more)

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (44): ae(), ee(), he(), le(), re(), ue(), Z(), b() (+36 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (12): engine_node_modules_exif_js_exif, engine_node_modules_semver_compare_index, Base_selection_class, GUI_tools_class, zoomView, fontLoadMap, fontLoadPromiseMap, fontMetricsMap (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.07
Nodes (10): engine_node_modules_alertifyjs_build_css_alertify_min, engine_src_css_component, engine_src_css_layout, engine_src_css_menu, engine_src_css_print, engine_src_css_reset, engine_src_css_utility, Base_gui_class (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (4): Clipboard_class, File_open_class, File_quickload_class, Media_class

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (17): idb, GimpCloudDBSchema, LocalStorageAdapter, BlendMode, FileMetadata, HistoryActionType, HistoryEntry, HSLA (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.06
Nodes (31): name, private, version, @aws-sdk/s3-request-presigner, @babel/core, babel-loader, @babel/plugin-transform-runtime, @babel/preset-env (+23 more)

### Community 22 - "Community 22"
Cohesion: 0.11
Nodes (31): 1410(), a(), b(), c(), e(), f(), g(), i() (+23 more)

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (4): Effects_browser_class, Layer_duplicate_class, Layer_raster_class, Layer_rename_class

### Community 26 - "Community 26"
Cohesion: 0.15
Nodes (9): nextConfig, @aws-sdk/client-s3, next, POST(), POST(), s3Client, POST(), S3StorageAdapter (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.10
Nodes (20): g(), 1335(), A(), f(), g(), h(), m(), y() (+12 more)

### Community 29 - "Community 29"
Cohesion: 0.10
Nodes (20): dependencies, alertifyjs, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, blueimp-canvas-to-blob, exif-js, file-saver, fuzzysort (+12 more)

### Community 31 - "Community 31"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 36 - "Community 36"
Cohesion: 0.13
Nodes (15): devDependencies, @babel/core, babel-loader, @babel/plugin-transform-runtime, @babel/preset-env, @babel/runtime, css-loader, style-loader (+7 more)

### Community 42 - "Community 42"
Cohesion: 0.30
Nodes (10): CMap(), getColorIndex(), getHisto(), medianCutApply(), PQueue(), sort(), quantize(), iter() (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.14
Nodes (9): 6046(), t(), u(), 7113(), t(), u(), 744(), t() (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.16
Nodes (5): 6396(), n(), 6993(), r(), l()

### Community 60 - "Community 60"
Cohesion: 0.31
Nodes (4): addEntry(), endIDF(), set16(), set32()

### Community 70 - "Community 70"
Cohesion: 0.25
Nodes (6): react, EditorEngine(), EditorPage(), src_app_page_module, Preset, PRESETS

### Community 74 - "Community 74"
Cohesion: 0.21
Nodes (6): 2381(), t(), u(), 7005(), t(), u()

### Community 75 - "Community 75"
Cohesion: 0.52
Nodes (6): add(), delete(), delete_all(), get(), init(), uuid

### Community 100 - "Community 100"
Cohesion: 0.33
Nodes (6): scripts, build, dev, engine:build, engine:dev, start

### Community 178 - "Community 178"
Cohesion: 0.50
Nodes (3): next_dev_types_root_params_d, next_dev_types_routes_d, NOTE: This file should not be edited

### Community 179 - "Community 179"
Cohesion: 0.50
Nodes (3): 133(), t(), u()

### Community 180 - "Community 180"
Cohesion: 0.50
Nodes (3): 1417(), h(), t()

### Community 181 - "Community 181"
Cohesion: 0.50
Nodes (3): 1818(), t(), u()

### Community 182 - "Community 182"
Cohesion: 0.50
Nodes (3): 2416(), p(), t()

### Community 183 - "Community 183"
Cohesion: 0.50
Nodes (3): 2633(), t(), u()

### Community 184 - "Community 184"
Cohesion: 0.50
Nodes (3): 3436(), t(), u()

### Community 185 - "Community 185"
Cohesion: 0.50
Nodes (3): 3944(), p(), t()

### Community 186 - "Community 186"
Cohesion: 0.50
Nodes (3): 4985(), t(), u()

### Community 187 - "Community 187"
Cohesion: 0.50
Nodes (3): 566(), p(), t()

### Community 188 - "Community 188"
Cohesion: 0.50
Nodes (3): 6971(), m(), t()

### Community 189 - "Community 189"
Cohesion: 0.50
Nodes (3): 709(), t(), u()

### Community 190 - "Community 190"
Cohesion: 0.50
Nodes (3): 8123(), p(), t()

### Community 191 - "Community 191"
Cohesion: 0.50
Nodes (3): 9258(), p(), t()

### Community 192 - "Community 192"
Cohesion: 0.50
Nodes (3): 9607(), h(), t()

## Knowledge Gaps
- **108 isolated node(s):** `Helper`, `fuzzysort`, `Helper`, `Helper`, `fontMetricsMap` (+103 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 634 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **157 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `1410()` connect `Community 22` to `Community 1`, `Community 4`, `Community 7`, `Community 9`, `Community 10`, `Community 12`, `Community 13`, `Community 14`, `Community 27`?**
  _High betweenness centrality (0.329) - this node is a cross-community bridge._
- **Why does `Base_layers_class` connect `Community 0` to `Community 2`, `Community 3`, `Community 6`, `Community 8`, `Community 137`, `Community 138`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 23`, `Community 24`, `Community 25`, `Community 28`, `Community 32`, `Community 34`, `Community 35`, `Community 37`, `Community 38`, `Community 167`, `Community 168`, `Community 169`, `Community 40`, `Community 41`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 72`, `Community 78`, `Community 79`, `Community 80`, `Community 81`, `Community 82`, `Community 83`, `Community 84`, `Community 89`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **Why does `Base_tools_class` connect `Community 6` to `Community 3`, `Community 8`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 24`, `Community 28`, `Community 35`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 43`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 71`, `Community 72`, `Community 73`, `Community 87`, `Community 88`, `Community 89`, `Community 90`, `Community 97`, `Community 98`, `Community 99`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `n()` (e.g. with `g()` and `a()`) actually correct?**
  _`n()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `d()` (e.g. with `s()` and `d()`) actually correct?**
  _`d()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `r()` (e.g. with `t()` and `l()`) actually correct?**
  _`r()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `A()` (e.g. with `x()` and `m()`) actually correct?**
  _`A()` has 2 INFERRED edges - model-reasoned connections that need verification._