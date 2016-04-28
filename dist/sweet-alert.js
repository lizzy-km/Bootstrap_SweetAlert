;(function(window, document, undefined) {
"use strict";

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultParams = {
    title: '',
    text: '',
    type: null,
    allowOutsideClick: false,
    showConfirmButton: true,
    showCancelButton: false,
    closeOnConfirm: true,
    closeOnCancel: true,
    confirmButtonText: 'OK',
    confirmButtonClass: 'btn-primary',
    cancelButtonText: 'Cancel',
    cancelButtonClass: 'btn-default',
    containerClass: '',
    titleClass: '',
    textClass: '',
    imageUrl: null,
    imageSize: null,
    timer: null,
    customClass: '',
    html: false,
    animation: true,
    allowEscapeKey: true,
    inputType: 'text',
    inputPlaceholder: ''
};

exports.default = defaultParams;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

var escapeHtml = function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var _show = function _show(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

var show = function show(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

var _hide = function _hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var hide = function hide(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

var isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

var getTopMargin = function getTopMargin(elem) {
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== "undefined") {
    // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return '-' + parseInt((height + padding) / 2) + 'px';
};

var fadeIn = function fadeIn(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = function tick() {
      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    };
    tick();
  }
  elem.style.display = 'block'; //fallback IE8
};

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = function tick() {
    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
    last = +new Date();

    if (+elem.style.opacity > 0) {
      setTimeout(tick, interval);
    } else {
      elem.style.display = 'none';
    }
  };
  tick();
};

var fireClick = function fireClick(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var stopEventPropagation = function stopEventPropagation(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.escapeHtml = escapeHtml;
exports._show = _show;
exports.show = show;
exports._hide = _hide;
exports.hide = hide;
exports.isDescendant = isDescendant;
exports.getTopMargin = getTopMargin;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.fireClick = fireClick;
exports.stopEventPropagation = stopEventPropagation;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div class=\"sweet-alert\" tabIndex=\"-1\">" +

// Error icon
"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div class=\"sa-icon sa-info\"></div>" +

// Success icon
"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p class=\"lead text-muted\">Text</p>\n    <div class=\"form-group\">\n      <input type=\"text\" class=\"form-control\" tabIndex=\"3\" />\n      <span class=\"sa-input-error help-block\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\"></span> <span class=\"sa-help-text\">Not valid</span>\n      </span>\n    </div>" +

// Cancel and confirm buttons
"<div class=\"sa-button-container\">\n      <button class=\"cancel btn btn-lg\" tabIndex=\"2\">Cancel</button>\n      <button class=\"confirm btn btn-lg\" tabIndex=\"1\">OK</button>\n    </div>" +

// End of modal
"</div>";

exports.default = injectedHTML;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _swalDom = require('./swal-dom');

var _domManipulation = require('./dom-manipulation');

var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = (0, _swalDom.getModal)();

  var $title = modal.querySelector('h2'),
      $text = modal.querySelector('p'),
      $cancelBtn = modal.querySelector('button.cancel'),
      $confirmBtn = modal.querySelector('button.confirm');

  // Title
  $title.innerHTML = params.html ? params.title : (0, _domManipulation.escapeHtml)(params.title).split('\n').join('<br>');

  // Text
  $text.innerHTML = params.html ? params.text : (0, _domManipulation.escapeHtml)(params.text || '').split('\n').join('<br>');

  if (params.text) {
    (0, _domManipulation.show)($text);
  }

  //Custom Class
  if (params.customClass) {
    (0, _domManipulation.addClass)(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    (0, _domManipulation.removeClass)(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  // Icon
  (0, _domManipulation.hide)(modal.querySelectorAll('.sa-icon'));
  if (params.type && !(0, _utils.isIE8)()) {
    var validType = false;
    for (var i = 0; i < alertTypes.length; i++) {
      if (params.type === alertTypes[i]) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      logStr('Unknown alert type: ' + params.type);
      return false;
    }

    var typesWithIcons = ['success', 'error', 'warning', 'info'];
    var $icon;

    if (typesWithIcons.indexOf(params.type) !== -1) {
      $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
      (0, _domManipulation.show)($icon);
    }

    var $input = (0, _swalDom.getInput)();

    // Animate icon
    switch (params.type) {

      case 'success':
        (0, _domManipulation.addClass)($icon, 'animate');
        (0, _domManipulation.addClass)($icon.querySelector('.sa-tip'), 'animateSuccessTip');
        (0, _domManipulation.addClass)($icon.querySelector('.sa-long'), 'animateSuccessLong');
        break;

      case 'error':
        (0, _domManipulation.addClass)($icon, 'animateErrorIcon');
        (0, _domManipulation.addClass)($icon.querySelector('.sa-x-mark'), 'animateXMark');
        break;

      case 'warning':
        (0, _domManipulation.addClass)($icon, 'pulseWarning');
        (0, _domManipulation.addClass)($icon.querySelector('.sa-body'), 'pulseWarningIns');
        (0, _domManipulation.addClass)($icon.querySelector('.sa-dot'), 'pulseWarningIns');
        break;

      case 'input':
      case 'prompt':
        $input.setAttribute('type', params.inputType);
        $input.setAttribute('placeholder', params.inputPlaceholder);
        (0, _domManipulation.addClass)(modal, 'show-input');
        setTimeout(function () {
          $input.focus();
          $input.addEventListener('keyup', swal.resetInputError);
        }, 400);
        break;
    }
  }

  // Custom image
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    (0, _domManipulation.show)($customIcon);

    var _imgWidth = 80,
        _imgHeight = 80;

    if (params.imageSize) {
      var dimensions = params.imageSize.toString().split('x');
      var imgWidth = dimensions[0];
      var imgHeight = dimensions[1];

      if (!imgWidth || !imgHeight) {
        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
      } else {
        _imgWidth = imgWidth;
        _imgHeight = imgHeight;
      }
    }
    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
  }

  // Show cancel button?
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    (0, _domManipulation.hide)($cancelBtn);
  }

  // Show confirm button?
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    (0, _domManipulation.hide)($confirmBtn);
  }

  // Edit text on cancel and confirm buttons
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = (0, _domManipulation.escapeHtml)(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = (0, _domManipulation.escapeHtml)(params.confirmButtonText);
  }

  // Reset confirm buttons to default class (Ugly fix)
  $confirmBtn.className = 'confirm btn btn-lg';

  // Attach selected class to the sweet alert modal
  (0, _domManipulation.addClass)(modal, params.containerClass);

  // Set confirm button to selected class
  (0, _domManipulation.addClass)($confirmBtn, params.confirmButtonClass);

  // Set cancel button to selected class
  (0, _domManipulation.addClass)($cancelBtn, params.cancelButtonClass);

  // Set title to selected class
  (0, _domManipulation.addClass)($title, params.titleClass);

  // Set text to selected class
  (0, _domManipulation.addClass)($text, params.textClass);

  // Allow outside click?
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  // Done-function
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  if (!params.animation) {
    // No animation
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
      modal.setAttribute('data-animation', 'pop');
    }

  // Close timer
  modal.setAttribute('data-timer', params.timer);
};

exports.default = setParameters;

},{"./dom-manipulation":2,"./swal-dom":5,"./utils":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixVerticalPosition = exports.resetInputError = exports.resetInput = exports.openModal = exports.getInput = exports.getOverlay = exports.getModal = exports.sweetAlertInitialize = undefined;

var _domManipulation = require('./dom-manipulation');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireDefault(_defaultParams);

var _injectedHtml = require('./injected-html');

var _injectedHtml2 = _interopRequireDefault(_injectedHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

/*
 * Add modal + overlay to DOM
 */


var sweetAlertInitialize = function sweetAlertInitialize() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHtml2.default;

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = function getModal() {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
};

/*
 * Get DOM element of input (in modal)
 */
var getInput = function getInput() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function getOverlay() {
  return document.querySelector(overlayClass);
};

/*
 * Animation when opening modal
 */
var openModal = function openModal() {
  var $modal = getModal();
  (0, _domManipulation.fadeIn)(getOverlay(), 10);
  (0, _domManipulation.show)($modal);
  (0, _domManipulation.addClass)($modal, 'showSweetAlert');
  (0, _domManipulation.removeClass)($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    (0, _domManipulation.addClass)($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    $modal.timeout = setTimeout(function () {
      swal.close();
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function resetInput() {
  var $modal = getModal();
  var $input = getInput();

  (0, _domManipulation.removeClass)($modal, 'show-input');
  $input.value = '';
  $input.setAttribute('type', _defaultParams2.default.inputType);
  $input.setAttribute('placeholder', _defaultParams2.default.inputPlaceholder);

  resetInputError();
};

var resetInputError = function resetInputError(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  (0, _domManipulation.removeClass)($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.form-group');
  (0, _domManipulation.removeClass)($errorContainer, 'has-error');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = (0, _domManipulation.getTopMargin)(getModal());
};

exports.sweetAlertInitialize = sweetAlertInitialize;
exports.getModal = getModal;
exports.getOverlay = getOverlay;
exports.getInput = getInput;
exports.openModal = openModal;
exports.resetInput = resetInput;
exports.resetInputError = resetInputError;
exports.fixVerticalPosition = fixVerticalPosition;

},{"./default-params":1,"./dom-manipulation":2,"./injected-html":3}],6:[function(require,module,exports){
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

"use strict";

/*
 * jQuery-like functions for manipulating the DOM
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
 * Handy utilities
 */


/*
 *  Handle sweetAlert's DOM elements
 */


// Default values


var _domManipulation = require('./dom-manipulation');

var _utils = require('./utils');

var _swalDom = require('./swal-dom');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireDefault(_defaultParams);

var _setParams = require('./set-params');

var _setParams2 = _interopRequireDefault(_setParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;

/*
 * Global sweetAlert function
 */
var sweetAlert, swal;

sweetAlert = swal = function swal() {
  var customizations = arguments[0];

  (0, _domManipulation.addClass)(document.body, 'stop-scrolling');
  (0, _swalDom.resetInput)();

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;

    if (typeof args[key] !== 'undefined') {
      return args[key];
    } else {
      return _defaultParams2.default[key];
    }
  }

  if (customizations === undefined) {
    (0, _utils.logStr)('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = (0, _utils.extend)({}, _defaultParams2.default);

  switch (typeof customizations === 'undefined' ? 'undefined' : _typeof(customizations)) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({title:"Hello", text: "Just testing", type: "info"});
    case 'object':
      if (customizations.title === undefined) {
        (0, _utils.logStr)('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      var availableCustoms = ['text', 'type', 'customClass', 'allowOutsideClick', 'showConfirmButton', 'showCancelButton', 'closeOnConfirm', 'closeOnCancel', 'timer', 'confirmButtonClass', 'cancelButtonText', 'cancelButtonClass', 'containerClass', 'titleClass', 'textClass', 'imageUrl', 'imageSize', 'html', 'animation', 'allowEscapeKey', 'inputType', 'inputPlaceholder'];

      // It would be nice to just use .forEach here, but IE8... :(
      var numCustoms = availableCustoms.length;
      for (var customIndex = 0; customIndex < numCustoms; customIndex++) {
        var customName = availableCustoms[customIndex];
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2.default.confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Function to call when clicking on cancel/OK
      params.doneFunction = arguments[1] || null;

      break;

    default:
      (0, _utils.logStr)('Unexpected type of argument! Expected "string" or "object", got ' + (typeof customizations === 'undefined' ? 'undefined' : _typeof(customizations)));
      return false;

  }

  (0, _setParams2.default)(params);
  (0, _swalDom.fixVerticalPosition)();
  (0, _swalDom.openModal)();

  // Modal interactions
  var modal = (0, _swalDom.getModal)();

  // Mouse interactions
  var onButtonEvent = function onButtonEvent(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var targetedConfirm = target.className.indexOf('confirm') !== -1;
    var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
    var modalIsVisible = (0, _domManipulation.hasClass)(modal, 'visible');
    var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

    switch (e.type) {
      case 'click':
        var clickedOnModal = modal === target;
        var clickedOnModalChild = (0, _domManipulation.isDescendant)(modal, target);

        if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
          break;
        }

        if (targetedConfirm && doneFunctionExists && modalIsVisible) {
          // Clicked "confirm"
          handleConfirm();
        } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
          // Clicked "cancel"
          handleCancel();
        } else if ((0, _domManipulation.isDescendant)(modal, target) && target.tagName === 'BUTTON') {
          sweetAlert.close();
        }
        break;
    }
  };

  function handleConfirm() {
    var callbackValue = true;

    if ((0, _domManipulation.hasClass)(modal, 'show-input')) {
      callbackValue = modal.querySelector('input').value;

      if (!callbackValue) {
        callbackValue = '';
      }
    }

    params.doneFunction(callbackValue);

    if (params.closeOnConfirm) {
      sweetAlert.close();
    }
  }

  function handleCancel() {
    // Check if callback function expects a parameter (to track cancel actions)
    var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
    var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

    if (functionHandlesCancel) {
      params.doneFunction(false);
    }

    if (params.closeOnCancel) {
      sweetAlert.close();
    }
  }

  var $buttons = modal.querySelectorAll('button');
  for (var i = 0; i < $buttons.length; i++) {
    $buttons[i].onclick = onButtonEvent;
  }

  (0, _swalDom.getOverlay)().onclick = onButtonEvent;

  // Keyboard interactions
  var $okButton = modal.querySelector('button.confirm'),
      $cancelButton = modal.querySelector('button.cancel'),
      $modalButtons = modal.querySelectorAll('button[tabindex]');

  function handleKeyDown(event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;

    if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
      // Don't do work on keys we don't care about.
      return;
    }

    var $targetElement = e.target || e.srcElement;

    var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
    for (var i = 0; i < $modalButtons.length; i++) {
      if ($targetElement === $modalButtons[i]) {
        btnIndex = i;
        break;
      }
    }

    if (keyCode === 9) {
      // TAB
      if (btnIndex === -1) {
        // No button focused. Jump to the confirm button.
        $targetElement = $okButton;
      } else {
        // Cycle to the next button
        if (btnIndex === $modalButtons.length - 1) {
          $targetElement = $modalButtons[0];
        } else {
          $targetElement = $modalButtons[btnIndex + 1];
        }
      }

      (0, _domManipulation.stopEventPropagation)(e);
      $targetElement.focus();
    } else {
      if (keyCode === 13) {
        if ($targetElement.tagName === 'INPUT') {
          $targetElement = $okButton;
          $okButton.focus();
        }

        if (btnIndex === -1) {
          // ENTER/SPACE clicked outside of a button.
          $targetElement = $okButton;
        } else {
          // Do nothing - let the browser handle it.
          $targetElement = undefined;
        }
      } else if (keyCode === 27 && params.allowEscapeKey === true) {
        $targetElement = $cancelButton;
        (0, _domManipulation.fireClick)($targetElement, e);
      } else {
        // Fallback - let the browser handle it.
        $targetElement = undefined;
      }
    }
  }

  previousWindowKeyDown = window.onkeydown;

  window.onkeydown = handleKeyDown;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence. Calling focus() in the event
      // sequence confuses things.
      if (lastFocusedButton !== undefined) {
        lastFocusedButton.focus();
        lastFocusedButton = undefined;
      }
    }, 0);
  };
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if ((typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    throw new Error('userParams has to be a object');
  }

  (0, _utils.extend)(_defaultParams2.default, userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = (0, _swalDom.getModal)();

  (0, _domManipulation.fadeOut)((0, _swalDom.getOverlay)(), 5);
  (0, _domManipulation.fadeOut)(modal, 5);
  (0, _domManipulation.removeClass)(modal, 'showSweetAlert');
  (0, _domManipulation.addClass)(modal, 'hideSweetAlert');
  (0, _domManipulation.removeClass)(modal, 'visible');

  // Reset icon animations

  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  (0, _domManipulation.removeClass)($successIcon, 'animate');
  (0, _domManipulation.removeClass)($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  (0, _domManipulation.removeClass)($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  (0, _domManipulation.removeClass)($errorIcon, 'animateErrorIcon');
  (0, _domManipulation.removeClass)($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  (0, _domManipulation.removeClass)($warningIcon, 'pulseWarning');
  (0, _domManipulation.removeClass)($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  (0, _domManipulation.removeClass)($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  (0, _domManipulation.removeClass)(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);
};

/*
 * Validation of the input field is done by user
 * If something is wrong => call showInputError with errorMessage
 */
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = (0, _swalDom.getModal)();

  var $errorIcon = modal.querySelector('.sa-input-error');
  (0, _domManipulation.addClass)($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  (0, _domManipulation.addClass)($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  modal.querySelector('input').focus();
};

/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function (event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = (0, _swalDom.getModal)();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  (0, _domManipulation.removeClass)($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  (0, _domManipulation.removeClass)($errorContainer, 'show');
};

/*
 * Use SweetAlert with RequireJS
 */
if (typeof define === 'function' && define.amd) {
  define(function () {
    return sweetAlert;
  });
} else if (typeof window !== 'undefined') {
  window.sweetAlert = window.swal = sweetAlert;
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = sweetAlert;
}

},{"./default-params":1,"./dom-manipulation":2,"./set-params":4,"./swal-dom":5,"./utils":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Allow user to pass their own params
 */
var extend = function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function isIE8() {
  return window.attachEvent && !window.addEventListener;
};

/*
 * IE compatible logging for developers
 */
var logStr = function logStr(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

exports.extend = extend;
exports.isIE8 = isIE8;
exports.logStr = logStr;

},{}]},{},[6]);


})(window, document);