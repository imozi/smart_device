/*eslint-disable */
// Отключил проверку из за того что document, window, localStorage не объявлены
'use strict';

(function () {
  var ESC_CODE = 27;
  var body = document.querySelector('body');
  var callbackBtn = document.querySelector('.header__callback');
  var modal = document.querySelector('.modal');
  var closeBtnModal = document.querySelector('.modal__close');
  var modalOverlay = document.querySelector('.modal__overlay');
  var footerNav = document.querySelector('.footer__nav');
  var footerContacts = document.querySelector('.footer__contacts');
  var mainFormTel = document.querySelector('.form input[type=tel]')
  var modalForm = document.querySelector('.modal__form');
  var modalFormName = modalForm.querySelector('input[type="text"]');
  var modalFormTel = modalForm.querySelector('input[type="tel"]');
  var modalFormQuestion = modalForm.querySelector('textarea');
  var feedbackScroll = document.querySelector('a[href="#feedback"]');
  var feedbackAnchor = document.querySelector('#feedback');
  var scrollDownScroll = document.querySelector('.intro__scroll');
  var scrollDownAnchor = document.querySelector('#main');

  svg4everybody();

  if (feedbackScroll && feedbackAnchor) {
    feedbackScroll.addEventListener('click', function (evt) {
      evt.preventDefault();
      feedbackAnchor.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  if (scrollDownScroll && scrollDownAnchor) {
    scrollDownScroll.addEventListener('click', function (evt) {
      evt.preventDefault();
      scrollDownAnchor.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }


  if (mainFormTel && modalFormTel) {
    var maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    IMask(modalFormTel, maskOptions);
    IMask(mainFormTel, maskOptions);
  }

  var openModal = function () {
    modal.classList.add('modal--show');
    body.classList.add('modal--open')

    if (closeBtnModal && modalOverlay) {
      modalFormName.focus();
      closeBtnModal.addEventListener('click', onClickCloseModalBtn);
      modalOverlay.addEventListener('click', onClickCloseModalBtn);
      document.addEventListener('keydown', onEscKeyPressDocument);
    }
  };

  var closeModal = function () {
    modal.classList.remove('modal--show');
    body.classList.remove('modal--open')
    closeBtnModal.removeEventListener('click', onClickCloseModalBtn);
    modalOverlay.removeEventListener('click', onClickCloseModalBtn);
    document.removeEventListener('keydown', onEscKeyPressDocument);
  };

  var onSubmitToLocalStorageСonsultation = function (evt) {

    if (modalFormName.value && modalFormTel.value && modalFormQuestion.value) {
      evt.preventDefault();

      var сonsultation = {
        name: modalFormName.value,
        telephone: modalFormTel.value,
        question: modalFormQuestion.value
      };

      var strСonsultation = JSON.stringify(сonsultation);

      localStorage.setItem('сonsultation', strСonsultation);
    }
  };

  var clearLocalStorage = function () {
    window.setTimeout(function () {
      localStorage.clear();
    }, 10000);
  };

  var onClickCallbackBtn = function (evt) {
    evt.preventDefault();
    openModal();
  };

  var onEscKeyPressDocument = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeModal();
    }
  };

  var onClickCloseModalBtn = function () {
    closeModal();
  };

  var onClickFooterNav = function () {
    footerNav.classList.toggle('footer__nav--show');

    var isClass = footerContacts.classList.contains('footer__contacts--show');

    if (isClass) {
      footerContacts.classList.remove('footer__contacts--show');
    }

  };

  var onClickFooterContacts = function () {
    footerContacts.classList.toggle('footer__contacts--show');

    var isClass = footerNav.classList.contains('footer__nav--show');

    if (isClass) {
      footerNav.classList.remove('footer__nav--show');
    }
  };

  if (callbackBtn && modal) {
    callbackBtn.addEventListener('click', onClickCallbackBtn);
  }

  if (footerNav && footerContacts) {
    footerNav.addEventListener('click', onClickFooterNav);
    footerContacts.addEventListener('click', onClickFooterContacts);
  }

  if (localStorage.getItem('сonsultation') !== null) {
    var data = JSON.parse(localStorage.getItem('сonsultation'));

    if (typeof data === 'object') {
      modalFormName.value = data.name;
      modalFormTel.value = data.telephone;
      modalFormQuestion.value = data.question;
    }

    clearLocalStorage();
  }

})();
