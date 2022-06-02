const validations = require('./validation.js');
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
      if (
        xhr.readyState === 4 &&
        xhr.status === 200 &&
        typeof success === 'function'
      ) {
        allowed(xhr.response, body);
        insertData(xhr.response);
        if (xhr.response === 'blocked') error(xhr.response);
      } else if (
        xhr.readyState === 4 &&
        xhr.status !== 200 &&
        typeof error === 'function'
      ) {
        error(xhr.response);
      }
    };
    xhr.onerror = error || null;
  }

  /*
   * Validation
   * */
  var pass1 = '';
  var pass2 = '';

  function checkPasswordsMatch(element, result) {
    if (element.id === 'password') pass1 = element.value;

    if (element.id === 'password2') pass2 = element.value;

    if (pass2 !== pass1 && element.id === 'password2') {
      result.valid = false;
      result.message = 'Must be to equal to password';
    } else if (
      pass2 === pass1 &&
      element.id === 'password2' &&
      element.id === 'password'
    ) {
      result.valid = true;
      result.message = '';
    }
  }
  function validateField(element) {
    var fieldValidation = validations[element.id];

    var result = { valid: true, element: element, message: '' };

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
    var errorMessageElement =
      element.nextElementSibling &&
      element.nextElementSibling.classList.contains('field-error')
        ? element.nextElementSibling
        : null;
    errorMessageElement && message && (errorMessageElement.innerHTML = message);
    errorMessageElement && !message && (errorMessageElement.innerHTML = '');
  }
  function formOnchange(e) {
    if (e.target.dataset && e.target.dataset.validation !== undefined) {
      toggleError(e.target, validateField(e.target).message);
    }
  }
  // =========================
  var caurrentTab = 0;
  showTab(caurrentTab);

  function showTab(currentTab) {
    console.log('currentTab', currentTab);
    var blockForm = document.getElementsByClassName('step');
    blockForm[currentTab].classList.add('step_active');

    if (currentTab === 0) {
      document.querySelector('[data-prev]').classList.add('control_hide');
    } else if (currentTab > 0) {
      document.querySelector('[data-prev]').classList.remove('control_hide');
    }

    if (currentTab === blockForm.length - 1) {
      document.querySelector('[data-submit]').classList.remove('control_hide');
      document.querySelector('[data-prev]').classList.remove('control_hide');
      document.querySelector('[data-next]').classList.add('control_hide');
    } else {
      document.querySelector('[data-submit]').classList.add('control_hide');
      document.querySelector('[data-next]').classList.remove('control_hide');
    }
  }

  function nextPrev(curentNumb) {
    var blocks = document.getElementsByClassName('step');
    //=======
    blocks[caurrentTab].classList.remove('step_active');
    var counter = 0;
    var allInputs = Array.from(
      document.querySelectorAll('[data-validation]')
    ).slice(0, -1);

    for (var i = 0; i < allInputs.length; i++) {
      var element = allInputs[i];
      toggleError(element, validateField(element).message);
      validateField(element).valid ? counter++ : counter--;
    }

    if (counter === allInputs.length) {
      caurrentTab = caurrentTab + curentNumb;
    }

    showTab(caurrentTab);
  }

  function requestZip(e) {
    var params = 'zip=' + e.target.value;
    var bodyContent = {
      url: 'assets/geoStatus.php',
      body: params,
      success: function (result) {
        alert(result);
      },
      error: function (result) {
        alert(result);
      },
    };
    ajax(bodyContent);
  }

  function allowed(str, params) {
    var bodyValues = {
      url: 'assets/geoData.php',
      body: params,
      success: function (result) {
        alert(result);
      },
      error: function (result) {
        alert(result);
      },
    };
    if (str === 'allowed') {
      ajax(bodyValues);
    }
  }

  function insertData(response) {
    var state = document.getElementById('state');
    var city = document.getElementById('city');
    if (
      response !== 'allowed' &&
      response !== 'blocked' &&
      response !== 'error'
    ) {
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
    } else if (
      validateField(zipValue).valid &&
      city.value !== '' &&
      state.value !== ''
    ) {
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
  document.querySelector('[data-next]').addEventListener('click', () => {
    nextPrev(1);
  });
  document.querySelector('[data-prev]').addEventListener('click', () => {
    nextPrev(-1);
  });
  document
    .getElementById('mainForm')
    .addEventListener('submit', submitFormFunc);
  document.getElementById('zip').addEventListener('change', requestZip);
})();
