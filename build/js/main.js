'use strict';

(function () {
  var ESC_CODE = 27;
  var callbackBtn = document.querySelector('.header__callback');
  var modal = document.querySelector('.modal');
  var closeBtnModal = document.querySelector('.modal__close');
  var modalOverlay = document.querySelector('.modal__overlay');
  var footerNav = document.querySelector('.footer__nav');
  var footerContacts = document.querySelector('.footer__contacts');
  var modalForm = document.querySelector('.modal__form');
  var modalFormName = modalForm.querySelector('input[type="text"]');
  var modalFormTel = modalForm.querySelector('input[type="tel"]');
  var modalFormQuestion = modalForm.querySelector('textarea');

  var openModal = function () {
    modal.classList.add('modal--show');

    if (closeBtnModal && modalOverlay) {
      modalFormName.focus();
      closeBtnModal.addEventListener('click', onClickCloseModalBtn);
      modalOverlay.addEventListener('click', onClickCloseModalBtn);
      document.addEventListener('keydown', onEscKeyPressDocument);
    }
  };

  var closeModal = function () {
    modal.classList.remove('modal--show');
    closeBtnModal.removeEventListener('click', onClickCloseModalBtn);
    modalOverlay.removeEventListener('click', onClickCloseModalBtn);
    document.removeEventListener('keydown', onEscKeyPressDocument);
  };

  var onSubmitToLocalStorageСonsultation = function (evt) {

    if (modalFormName && modalFormTel && modalFormQuestion) {
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
    }, 60000);
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
  };

  var onClickFooterContacts = function () {
    footerContacts.classList.toggle('footer__contacts--show');
  };

  if (callbackBtn && modal) {
    callbackBtn.addEventListener('click', onClickCallbackBtn);
  }

  if (footerNav && footerContacts) {
    footerNav.addEventListener('click', onClickFooterNav);
    footerContacts.addEventListener('click', onClickFooterContacts);
  }

  if (modalForm) {
    modalForm.addEventListener('submit', onSubmitToLocalStorageСonsultation);
  }

  if (localStorage.length) {
    var data = JSON.parse(localStorage.getItem('сonsultation'));
    modalFormName.value = data.name;
    modalFormTel.value = data.telephone;
    modalFormQuestion.value = data.question;
    clearLocalStorage();
  }

})();
