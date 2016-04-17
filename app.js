(function() {

"use strict";

//------------------------------------------------------------------------------
// HTML
//------------------------------------------------------------------------------

function buildTile (tileData) {
  var html =
  '<li class="clue-tile show-amount">' +
    '<span class="amount">$' + tileData.amount + '</span>' +
    '<span class="clue">' + tileData.clue + '</span>' +
    '<span class="answer">' + tileData.answer + '</span>' +
  '</li>';

  return html;
}

function buildCategory (categoryName, items) {
  var html =
    '<li class="category-name">' + categoryName + '</li>' +
    items.map(buildTile).join('');

  return '<ul class="category">' + html + '</ul>';
}

function buildBoard () {
  var categories = Object.keys(GAME_STATE);
  var categoriesHtml = categories.map(function(categoryName) {
    return buildCategory(categoryName, GAME_STATE[categoryName]);
  }).join('');

  return '<div id="board">' + categoriesHtml + '</div>';
}

//------------------------------------------------------------------------------
// Events
//------------------------------------------------------------------------------

function clickAmount (el) {
  el.className = 'clue-tile show-clue';
}

function clickClue (el) {
  el.className = 'clue-tile show-answer';
}

function clickAnswer (el) {
  el.className = 'clue-tile revealed';
}

// Doing some basic event delegation for click events on the game board
function boardClickHandler(event) {
  var clickedEl = event.target;
  var tagName = clickedEl.tagName;

  if (tagName !== 'LI' && tagName !== 'SPAN') return;

  var el = clickedEl;
  if (tagName === 'SPAN') {
    el = clickedEl.parentNode;
  }

  var classList = el.classList;

  if (classList.contains("show-amount")) {
    clickAmount(el);
  }
  else if (classList.contains("show-clue")) {
    clickClue(el);
  }
  else if (classList.contains("show-answer")) {
    clickAnswer(el);
  }
}

//------------------------------------------------------------------------------
// Init
//------------------------------------------------------------------------------

function init() {
  document.getElementById("pageWrapper").innerHTML = buildBoard();
  document.getElementById("board").addEventListener('click', boardClickHandler);
}

window.onload = init;

}());
