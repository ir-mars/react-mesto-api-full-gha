import React, { useRef, useEffect, useState } from 'react';

function PopupWithForm ({ name, title, buttonText, children, isOpen, onClose, onSubmit, runOnFirstLaunch, isRequesting }) {
  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  function handleChange () {
    const arrayInputList = [...formRef.current.elements];
    let isValidForm = true;
    arrayInputList.length && arrayInputList.forEach(input => {
      if (!input.validity.valid) {
        isValidForm = false;
      }
    });
    setIsValid(isValidForm);
  }
  useEffect(() => {
    runOnFirstLaunch && handleChange()
  }, [runOnFirstLaunch])

  function isDisabledBtn () {
    if (name === 'confirm') {
      return false;
    } else if (isRequesting) {
      return true;
    } else {
      return !isValid;
    }
  }
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          ref={formRef}
          action="#"
          className={`popup__form popup__form_type_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
          onChange={handleChange}
        >
          {children}
          <button
            disabled={isDisabledBtn()}
            className="popup__submit-btn"
            type="submit"
          >
            {isRequesting ? 'Отправка...' : buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
