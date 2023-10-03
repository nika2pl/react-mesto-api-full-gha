import PopupWithForm from "./PopupWithForm";


function ConfirmDeletePopup({ isOpen, onClose, onSubmit, idCard, isLoadingDeleteCard }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(idCard);
  }

  return (
    <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name="deleteCard"
        title="Вы уверены?"
        submitText="Да"
        onSubmit={handleSubmit}
        isLoadingDeleteCard={isLoadingDeleteCard}
        loadingText="Удаление..."
    />
  )
}


export default ConfirmDeletePopup;