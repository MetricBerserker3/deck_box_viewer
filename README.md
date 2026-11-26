# MB3 Deck Box 3D viewer: website package

## What's in this folder

| File | Purpose |
| --- | --- |
| `index.html` | The viewer page. This is what the Wix embed points at. |
| `deckbox.json` | The 3D model (box, tray, nets, lanyard, carabiner). |
| `fonts/` | Goudy Old Style and Old English Text MT, trimmed to Latin characters. |
| `wix-page-code.js` | Code to paste into the Wix product page. Not loaded by the viewer. |
| `lid-art.svg` | **You add this.** Your lid logo. A PNG named `lid-art.png` also works. |

## 1. Add your lid artwork

Copy your logo file into this folder and name it `lid-art.svg`. Dark areas take the accent color;
white or transparent areas show the box color. Without this file the lid is simply blank.

## 2. Put the folder on GitHub Pages

1. Create a public repository, for example `deck-box-viewer`.
2. Upload everything in this folder to the repository's top level.
3. In the repository: Settings > Pages > Deploy from a branch > `main`, folder `/ (root)`.
4. After a minute the viewer is live at `https://<your-user>.github.io/deck-box-viewer/`.

Open that address directly to check it. Opened on its own, the viewer shows its own color and
text controls so you can test it without Wix.

## 3. Embed it in the Wix product page

1. In the Wix Editor, open the Product Page.
2. Add > Embed Code > Embed a Site, and enter the GitHub Pages address.
3. Stretch the embed to a full-width band below the product block. About 560 px tall works on desktop.
4. Turn on Dev Mode, select the embed, and note its ID (for example `html1`). Do the same for the product page element.
5. Paste `wix-page-code.js` into the page's code panel and set the two IDs at the top.
6. Publish, then test both Deck Box listings and one other product.

## Options you can add to the address

| Add to the address | Effect |
| --- | --- |
| `?controls=1` | Always show the viewer's own color and text controls. Use this if the Wix link-up doesn't work. |
| `?box=Black&accent=Green` | Starting colors. |
| `?bg=0b0b12` | Background color as a 6-digit hex value. |
| `?lanyard=0` | Start with the lanyard and carabiner hidden. |

## How the Wix link-up works

The page code sends the customer's selected Box Color, Accent Color, and the first four text boxes
(top, latch exterior, latch interior, bottom) to the viewer. Color names are matched to the names on
your two listings, including the current "Sliver" and "Pink / Magneta" spellings.
