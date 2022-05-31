/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  /*
   * Secondary functions
   * */
  function ajax(params) {
    var xhr = new XMLHttpRequest();
    var url = params.url || '';
    var body = params.body || '';
    var success = params.success;
    var error = params.error;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200 && typeof success === 'function') {
        allowed(xhr.response, body);
        insertData(xhr.response);
        if (xhr.response === 'blocked') error(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status !== 200 && typeof error === 'function') {
        error(xhr.response);
      }
    };

    xhr.onerror = error || null;
  }
  /*
   * Validation
   * */


  function checkRegExp(pattern, message, value) {
    return pattern.test(value) ? true : message;
  }

  var validations = {
    firstName: [checkRegExp.bind(null, /^[A-Zа-я]{2,}$/i, 'Field may contain only letters and not be less than 2 letters'), checkRegExp.bind(null, /^[A-Zа-я]{2,64}$/i, 'Field may contain only letters and not be more than 64 letters')],
    lastName: [checkRegExp.bind(null, /^[A-Zа-я]{2,}$/i, 'Field may contain only letters and not be less than 2 letters'), checkRegExp.bind(null, /^[A-Zа-я]{2,64}$/i, 'Field may contain only letters and not be more than 64 letters')],
    email: [checkRegExp.bind(null, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter valid email')],
    phone: [checkRegExp.bind(null, /^[0-9]{8}$/, 'Field may contain only 8 digits')],
    password: [checkRegExp.bind(null, /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\-])/, 'Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character (!@#$%^&*-)')],
    password2: [checkRegExp.bind(null, /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\-])/, 'Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character (!@#$%^&*-)')],
    zip: [checkRegExp.bind(null, /^[0-9]{5}$/, 'Field must include 5 digits and only consist of numeric values')]
  };
  var pass1 = '';
  var pass2 = '';

  function checkPasswordsMatch(element, result) {
    if (element.id === 'password') pass1 = element.value;
    if (element.id === 'password2') pass2 = element.value;

    if (pass2 !== pass1 && element.id === 'password2') {
      result.valid = false;
      result.message = 'Must be to equal to password';
    } else if (pass2 === pass1 && element.id === 'password2' && element.id === 'password') {
      result.valid = true;
      result.message = '';
    }
  }

  function validateField(element) {
    var fieldValidation = validations[element.id];
    var result = {
      valid: true,
      element: element,
      message: ''
    };

    if (fieldValidation) {
      checkPasswordsMatch(element, result);

      for (var i = 0, len = fieldValidation.length; i < len; i++) {
        var validationFunction = fieldValidation[i];
        var answer = validationFunction(element.value);

        if (typeof answer === 'string') {
          result.valid = false;
          result.message = answer;
          break;
        }
      }
    }

    return result;
  }
  /*
   * Other function
   * */


  function toggleError(element, message) {
    var errorMessageElement = element.nextElementSibling && element.nextElementSibling.classList.contains('field-error') ? element.nextElementSibling : null;
    errorMessageElement && message && (errorMessageElement.innerHTML = message);
    errorMessageElement && !message && (errorMessageElement.innerHTML = '');
  }

  function formOnchange(e) {
    if (e.target.dataset && e.target.dataset.validation !== undefined) {
      toggleError(e.target, validateField(e.target).message);
    }
  }

  function nextBtnFunction(e) {
    var counter = 0;
    var allInputs = document.querySelectorAll('[data-validation]');
    console.log('allInputs', allInputs); // var changeActiveStep = this.parentNode.parentNode.children[0].children;

    var step = document.querySelector('.step'); //=====================

    var openHiddenBtn = this.parentNode.children;

    for (var i = 0; i < allInputs.length; i++) {
      var element = allInputs[i];
      toggleError(element, validateField(element).message);
      validateField(element).valid ? counter++ : counter--;

      if (counter === allInputs.length) {
        step.classList.remove('step_active');
        step.nextElementSibling.classList.add('step_active');
        helper(openHiddenBtn);
      }
    }
  }

  function prevBtnFunction() {
    var prevBtn = this.parentNode.children;
    var changeActiveStepBack = this.parentNode.parentNode.children[0].children;
    changeActiveStepBack[1].classList.remove('step_active');
    changeActiveStepBack[0].classList.add('step_active');
    helper(prevBtn, changeActiveStepBack);
  }

  function helper(elements) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if (element.classList.contains('control_hide')) {
        element.classList.remove('control_hide');
      } else if (!element.classList.contains('control_hide')) {
        element.classList.add('control_hide');
      }
    }
  }

  function requestZip(e) {
    var params = 'zip=' + e.target.value;
    var bodyContent = {
      url: 'assets/geoStatus.php',
      body: params,
      success: function success(result) {
        alert(result);
      },
      error: function error(result) {
        alert(result);
      }
    };
    ajax(bodyContent);
  }

  function allowed(str, params) {
    var bodyValues = {
      url: 'assets/geoData.php',
      body: params,
      success: function success(result) {
        alert(result);
      },
      error: function error(result) {
        alert(result);
      }
    };

    if (str === 'allowed') {
      ajax(bodyValues);
    }
  }

  function insertData(response) {
    var state = document.getElementById('state');
    var city = document.getElementById('city');

    if (response !== 'allowed' && response !== 'blocked' && response !== 'error') {
      var obj = JSON.parse(response);
      console.log('obj', obj);
      state.style.backgroundColor = '#fff';
      city.style.backgroundColor = '#fff';
      state.value = obj.state;
      city.value = obj.city;
    } else {
      state.style.backgroundColor = '#e9ecef';
      city.style.backgroundColor = '#e9ecef';
      state.value = '';
      city.value = '';
    }
  }

  function submitFormFunc(e) {
    e.preventDefault();
    var zipValue = document.getElementById('zip');
    var city = e.target.querySelector('#city');
    var state = e.target.querySelector('#state');
    console.log('e.target.value', e.target);

    if (zipValue.value === '') {
      toggleError(zipValue, validateField(zipValue).message);
    } else if (validateField(zipValue).valid && city.value !== '' && state.value !== '') {
      e.target.submit();
      e.target.reset();
    } else {
      return false;
    }
  }
  /*
   * Listeners
   * */


  document.getElementById('mainForm').addEventListener('change', formOnchange);
  document.querySelector('[data-next]').addEventListener('click', nextBtnFunction);
  document.querySelector('[data-prev]').addEventListener('click', prevBtnFunction);
  document.getElementById('mainForm').addEventListener('submit', submitFormFunc);
  document.getElementById('zip').addEventListener('change', requestZip);
})();

/***/ })

/******/ });
//# sourceMappingURL=script.js.map