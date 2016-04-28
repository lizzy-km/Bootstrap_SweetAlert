(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

;(function (window, document, undefined) {

  var modalClass = '.sweet-alert';
  var overlayClass = '.sweet-overlay';
  var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

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

  /*
   * Manipulate DOM
   */
  var getModal = function (_getModal) {
    function getModal() {
      return _getModal.apply(this, arguments);
    }

    getModal.toString = function () {
      return _getModal.toString();
    };

    return getModal;
  }(function () {
    var $modal = document.querySelector(modalClass);

    if (!$modal) {
      sweetAlertInitialize();
      $modal = getModal();
    }

    return $modal;
  });

  var getInput = function getInput() {
    var modal = getModal();
    if (modal) {
      return modal.querySelector('input');
    }
  },
      getOverlay = function getOverlay() {
    return document.querySelector(overlayClass);
  },
      hasClass = function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  },
      addClass = function addClass(elem, className) {
    if (!hasClass(elem, className)) {
      elem.className += ' ' + className;
    }
  },
      removeClass = function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  },
      escapeHtml = function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },
      _show = function _show(elem) {
    elem.style.opacity = '';
    elem.style.display = 'block';
  },
      show = function show(elems) {
    if (elems && !elems.length) {
      return _show(elems);
    }
    for (var i = 0; i < elems.length; ++i) {
      _show(elems[i]);
    }
  },
      _hide = function _hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  },
      hide = function hide(elems) {
    if (elems && !elems.length) {
      return _hide(elems);
    }
    for (var i = 0; i < elems.length; ++i) {
      _hide(elems[i]);
    }
  },
      isDescendant = function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },
      getTopMargin = function getTopMargin(elem) {
    elem.style.left = '-9999px';
    elem.style.display = 'block';

    var height = elem.clientHeight;
    var padding;

    if (typeof getComputedStyle !== 'undefined') {
      // IE 8
      padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
    } else {
      padding = parseInt(elem.currentStyle.padding);
    }

    elem.style.left = '';
    elem.style.display = 'none';
    return '-' + parseInt((height + padding) / 2) + 'px';
  },
      fadeIn = function fadeIn(elem, interval) {
    if (+elem.style.opacity < 1) {
      interval = interval || 16;
      elem.style.opacity = 0;
      elem.style.display = 'block';
      var last = +new Date();
      var tick = function (_tick) {
        function tick() {
          return _tick.apply(this, arguments);
        }

        tick.toString = function () {
          return _tick.toString();
        };

        return tick;
      }(function () {
        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
        last = +new Date();

        if (+elem.style.opacity < 1) {
          setTimeout(tick, interval);
        }
      });
      tick();
    }
    elem.style.display = 'block'; //fallback IE8
  },
      fadeOut = function fadeOut(elem, interval) {
    interval = interval || 16;
    elem.style.opacity = 1;
    var last = +new Date();
    var tick = function (_tick2) {
      function tick() {
        return _tick2.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick2.toString();
      };

      return tick;
    }(function () {
      elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity > 0) {
        setTimeout(tick, interval);
      } else {
        elem.style.display = 'none';
      }
    });
    tick();
  },
      fireClick = function fireClick(node) {
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
  },
      stopEventPropagation = function stopEventPropagation(e) {
    // In particular, make sure the space bar doesn't scroll the main window.
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation();
      e.preventDefault();
    } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
      window.event.cancelBubble = true;
    }
  };

  // Remember state in cases where opening and handling a modal will fiddle with it.
  var previousActiveElement, previousWindowKeyDown, lastFocusedButton;

  /*
   * Add modal + overlay to DOM
   */
  var sweetAlertInitialize = function sweetAlertInitialize() {
    var sweetHTML = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="sa-icon sa-error"><span class="sa-x-mark"><span class="sa-line sa-left"></span><span class="sa-line sa-right"></span></span></div><div class="sa-icon sa-warning"> <span class="sa-body"></span> <span class="sa-dot"></span> </div> <div class="sa-icon sa-info"></div> <div class="sa-icon sa-success"> <span class="sa-line sa-tip"></span> <span class="sa-line sa-long"></span> <div class="sa-placeholder"></div> <div class="sa-fix"></div> </div> <div class="sa-icon sa-custom"></div> <h2>Title</h2><p class="lead text-muted">Text</p><div class="form-group"><input type="text" tabIndex="3" class="form-control" /><span class="sa-input-error help-block"><span class="glyphicon glyphicon-exclamation-sign"></span> <span class="sa-help-text">Not valid</span></span></div> <button class="cancel btn btn-lg" tabIndex="2">Cancel</button> <button class="confirm btn btn-lg" tabIndex="1">OK</button></div>',
        sweetWrap = document.createElement('div');

    sweetWrap.innerHTML = sweetHTML;

    // Append elements to body
    while (sweetWrap.firstChild) {
      document.body.appendChild(sweetWrap.firstChild);
    }
  };

  /*
   * Global sweetAlert function
   */
  var sweetAlert, swal;

  sweetAlert = swal = function swal() {
    var customizations = arguments[0];

    addClass(document.body, 'stop-scrolling');

    resetInput();

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
        return defaultParams[key];
      }
    }

    if (arguments[0] === undefined) {
      logStr('SweetAlert expects at least 1 attribute!');
      return false;
    }

    var params = extend({}, defaultParams);

    switch (_typeof(arguments[0])) {

      // Ex: swal("Hello", "Just testing", "info");
      case 'string':
        params.title = arguments[0];
        params.text = arguments[1] || '';
        params.type = arguments[2] || '';

        break;

      // Ex: swal({title:"Hello", text: "Just testing", type: "info"});
      case 'object':
        if (arguments[0].title === undefined) {
          logStr('Missing "title" argument!');
          return false;
        }

        params.title = arguments[0].title;

        var availableCustoms = ['text', 'type', 'customClass', 'allowOutsideClick', 'showConfirmButton', 'showCancelButton', 'closeOnConfirm', 'closeOnCancel', 'timer', 'confirmButtonClass', 'cancelButtonText', 'cancelButtonClass', 'containerClass', 'titleClass', 'textClass', 'imageUrl', 'imageSize', 'html', 'animation', 'allowEscapeKey', 'inputType', 'inputPlaceholder'];

        // It would be nice to just use .forEach here, but IE8... :(
        var numCustoms = availableCustoms.length;
        for (var customIndex = 0; customIndex < numCustoms; customIndex++) {
          var customName = availableCustoms[customIndex];
          params[customName] = argumentOrDefault(customName);
        }

        // Show "Confirm" instead of "OK" if cancel button is visible
        params.confirmButtonText = params.showCancelButton ? 'Confirm' : defaultParams.confirmButtonText;
        params.confirmButtonText = argumentOrDefault('confirmButtonText');

        // Function to call when clicking on cancel/OK
        params.doneFunction = arguments[1] || null;

        break;

      default:
        logStr('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(arguments[0]));
        return false;

    }

    setParameters(params);
    fixVerticalPosition();
    openModal();

    // Modal interactions
    var modal = getModal();

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement,
          targetedConfirm = target.className.indexOf('confirm') !== -1,
          targetedOverlay = target.className.indexOf('sweet-overlay') !== -1,
          modalIsVisible = hasClass(modal, 'visible'),
          doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

      switch (e.type) {
        case 'click':
          var clickedOnModal = modal === target,
              clickedOnModalChild = isDescendant(modal, target);

          if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
            break;
          }

          if (targetedConfirm && doneFunctionExists && modalIsVisible) {
            // Clicked "confirm"
            handleConfirm();
          } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
            // Clicked "cancel"
            handleCancel();
          } else if (isDescendant(modal, target) && target.tagName === 'BUTTON') {
            sweetAlert.close();
          }
          break;
      }
    };

    function handleConfirm() {
      var callbackValue = true;

      if (hasClass(modal, 'show-input')) {
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

    getOverlay().onclick = onButtonEvent;

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

        stopEventPropagation(e);
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
          fireClick($targetElement, e);
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
      window.setTimeout(function () {
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

    extend(defaultParams, userParams);
  };

  /*
   * Set type, text and actions on modal
   */
  function setParameters(params) {
    var modal = getModal();

    var $title = modal.querySelector('h2'),
        $text = modal.querySelector('p'),
        $cancelBtn = modal.querySelector('button.cancel'),
        $confirmBtn = modal.querySelector('button.confirm');

    // Title
    $title.innerHTML = params.html ? params.title : escapeHtml(params.title).split('\n').join('<br>');

    // Text
    $text.innerHTML = params.html ? params.text : escapeHtml(params.text || '').split('\n').join('<br>');

    if (params.text) {
      show($text);
    }

    //Custom Class
    if (params.customClass) {
      addClass(modal, params.customClass);
      modal.setAttribute('data-custom-class', params.customClass);
    } else {
      // Find previously set classes and remove them
      var customClass = modal.getAttribute('data-custom-class');
      removeClass(modal, customClass);
      modal.setAttribute('data-custom-class', '');
    }

    // Icon
    hide(modal.querySelectorAll('.sa-icon'));
    if (params.type && !isIE8()) {
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
        show($icon);
      }

      var $input = getInput();

      // Animate icon
      switch (params.type) {

        case 'success':
          addClass($icon, 'animate');
          addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
          addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
          break;

        case 'error':
          addClass($icon, 'animateErrorIcon');
          addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
          break;

        case 'warning':
          addClass($icon, 'pulseWarning');
          addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
          addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
          break;

        case 'input':
        case 'prompt':
          $input.setAttribute('type', params.inputType);
          $input.setAttribute('placeholder', params.inputPlaceholder);
          addClass(modal, 'show-input');
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
      show($customIcon);

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
      hide($cancelBtn);
    }

    // Show confirm button?
    modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
    if (params.showConfirmButton) {
      $confirmBtn.style.display = 'inline-block';
    } else {
      hide($confirmBtn);
    }

    // Edit text on cancel and confirm buttons
    if (params.cancelButtonText) {
      $cancelBtn.innerHTML = escapeHtml(params.cancelButtonText);
    }
    if (params.confirmButtonText) {
      $confirmBtn.innerHTML = escapeHtml(params.confirmButtonText);
    }

    // Reset confirm buttons to default class (Ugly fix)
    $confirmBtn.className = 'confirm btn btn-lg';

    // Attach selected class to the sweet alert modal
    addClass(modal, params.containerClass);

    // Set confirm button to selected class
    addClass($confirmBtn, params.confirmButtonClass);

    // Set cancel button to selected class
    addClass($cancelBtn, params.cancelButtonClass);

    // Set title to selected class
    addClass($title, params.titleClass);

    // Set text to selected class
    addClass($text, params.textClass);

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
  }

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  }

  // Animation when opening modal
  function openModal() {
    var modal = getModal();
    fadeIn(getOverlay(), 10);
    show(modal);
    addClass(modal, 'showSweetAlert');
    removeClass(modal, 'hideSweetAlert');

    previousActiveElement = document.activeElement;
    var $okButton = modal.querySelector('button.confirm');
    $okButton.focus();

    setTimeout(function () {
      addClass(modal, 'visible');
    }, 500);

    var timer = modal.getAttribute('data-timer');

    if (timer !== 'null' && timer !== '') {
      modal.timeout = setTimeout(function () {
        sweetAlert.close();
      }, timer);
    }
  }

  // Aninmation when closing modal
  sweetAlert.close = swal.close = function () {
    var modal = getModal();

    fadeOut(getOverlay(), 5);
    fadeOut(modal, 5);
    removeClass(modal, 'showSweetAlert');
    addClass(modal, 'hideSweetAlert');
    removeClass(modal, 'visible');

    // Reset icon animations

    var $successIcon = modal.querySelector('.sa-icon.sa-success');
    removeClass($successIcon, 'animate');
    removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
    removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

    var $errorIcon = modal.querySelector('.sa-icon.sa-error');
    removeClass($errorIcon, 'animateErrorIcon');
    removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

    var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
    removeClass($warningIcon, 'pulseWarning');
    removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
    removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

    removeClass(document.body, 'stop-scrolling');

    // Reset the page to its previous state
    window.onkeydown = previousWindowKeyDown;
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
    lastFocusedButton = undefined;
    clearTimeout(modal.timeout);
  };

  /*
   * Validation of the input field is done by user
   * If something is wrong => call showInputError with errorMessage
   */
  sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
    var modal = getModal();

    var $errorIcon = modal.querySelector('.sa-input-error');
    addClass($errorIcon, 'show');

    var $container = $modal.querySelector('.form-group');
    addClass($container, 'has-error');

    $container.querySelector('.sa-help-text').innerHTML = errorMessage;

    modal.querySelector('input').focus();
  };

  function resetInput() {
    var $modal = getModal();
    var $input = getInput();

    removeClass($modal, 'show-input');
    $input.value = '';
    $input.setAttribute('type', defaultParams.inputType);
    $input.setAttribute('placeholder', defaultParams.inputPlaceholder);

    swal.resetInputError();
  }

  sweetAlert.resetInputError = swal.resetInputError = function (event) {
    // If press enter => ignore
    if (event && event.keyCode === 13) {
      return false;
    }

    var $modal = getModal();

    var $errorIcon = $modal.querySelector('.sa-input-error');
    removeClass($errorIcon, 'show');

    removeClass($modal.querySelector('.form-group'), 'has-error');
  };

  /*
   * Set "margin-top"-property on modal based on its computed height
   */
  function fixVerticalPosition() {
    var modal = getModal();

    modal.style.marginTop = getTopMargin(getModal());
  }

  // If browser is Internet Explorer 8
  function isIE8() {
    if (window.attachEvent && !window.addEventListener) {
      return true;
    } else {
      return false;
    }
  }

  // Error messages for developers
  function logStr(string) {
    if (window.console) {
      // IE...
      window.console.log('SweetAlert: ' + string);
    }
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return sweetAlert;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = sweetAlert;
  }

  if (typeof window !== 'undefined') {
    window.sweetAlert = window.swal = sweetAlert;
  }
})(window, document);

},{}]},{},[1]);
