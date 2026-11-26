// MB3 Deck Box 3D viewer: Wix product page code
// Paste into the Product Page's code panel (Wix Editor > Dev Mode > Turn on Dev Mode).
// Set the two IDs below to match your page. Select each element in the editor to see its ID.

import wixLocationFrontend from 'wix-location-frontend';

const VIEWER = '#html1';              // the HTML embed that points at the viewer
const PRODUCT_PAGE = '#productPage1'; // the Wix Stores product page element
const DECK_BOX_SLUGS = ['bitchn-basic-box', 'deck-box-customizable-1'];

// Order of the custom text boxes on "Deck Box - Customizable":
// 0 = top, 1 = latch exterior, 2 = latch interior, 3 = bottom, 4 = description (not shown on the model)

let timer = null;
let lastSent = '';

async function send(force) {
  const page = $w(PRODUCT_PAGE);
  let choices = {};
  let text = [];
  try { choices = await page.getSelectedChoices(); } catch (e) { /* no options selected yet */ }
  try { text = (await page.getCustomText()) || []; } catch (e) { /* product has no text boxes */ }
  const message = { type: 'mb3-viewer', choices, text: text.slice(0, 4) };
  const key = JSON.stringify(message);
  if (!force && key === lastSent) return;
  lastSent = key;
  $w(VIEWER).postMessage(message);
}

function start() {
  if (!timer) timer = setInterval(() => send(false), 1000); // picks up typing in the text boxes
  send(true);
}

function stop() {
  if (timer) { clearInterval(timer); timer = null; }
}

async function refresh() {
  let product = null;
  try { product = await $w(PRODUCT_PAGE).getProduct(); } catch (e) { /* not ready */ }
  if (product && DECK_BOX_SLUGS.includes(product.slug)) {
    $w(VIEWER).expand();
    lastSent = '';
    start();
  } else {
    stop();
    $w(VIEWER).collapse();
  }
}

$w.onReady(function () {
  $w(VIEWER).onMessage((event) => {
    if (event.data && event.data.type === 'mb3-viewer-ready') send(true);
  });
  try { $w(PRODUCT_PAGE).onChoiceSelected(() => send(true)); } catch (e) { /* the timer still covers it */ }
  wixLocationFrontend.onChange(() => refresh()); // moving between products without a full reload
  refresh();
});
