
function InfoToolTip ({ isOpen, onClose, img, text }) {

  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container popup__container_tooltip">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}>
        </button>
        {img && (<img
          className="popup__tooltip-img"
          src={img}
          alt={text} />)}
        <h2 className="popup__title popup__tooltip-title">{text}</h2>
      </div>
    </div>
  )
}
export default InfoToolTip;
