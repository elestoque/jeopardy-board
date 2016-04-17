(function() {

"use strict";

//------------------------------------------------------------------------------
// HTML
//------------------------------------------------------------------------------

function buildTile (tileData) {
  var html =
  '<li class="question-tile show-amount">' +
    '<span class="amount">' + tileData.amount + '</span>' +
    '<span class="question">' + tileData.question + '</span>' +
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
  el.className = 'question-tile show-question';
}

function clickQuestion (el) {
  el.className = 'question-tile show-answer';
}

function clickAnswer (el) {
  el.className = 'question-tile revealed';
}

// Doing some basic event delegation for click events on the game board
function boardClickHandler(event) {
  var clickedEl = event.target;
  var tagName = clickedEl.tagName;

  if(tagName !== 'LI' && tagName !== 'SPAN') return;

  var classList = clickedEl.classList;
  var parentEl = clickedEl.parentNode;

  if (classList.contains("show-amount")) {
    clickAmount(clickedEl);
  }
  else if (parentEl.classList.contains("show-amount")) {
    clickAmount(parentEl);
  }
  else if (classList.contains("show-question")) {
    clickQuestion(clickedEl);
  }
  else if (parentEl.classList.contains("show-question")) {
    clickQuestion(parentEl);
  }
  else if (classList.contains("show-answer")) {
    clickAnswer(clickedEl);
  }
  else if (parentEl.classList.contains("show-answer")) {
    clickAnswer(parentEl);
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
