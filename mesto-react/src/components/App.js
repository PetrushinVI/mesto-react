import React from "react";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

  return (
    <div className="page">
      <Header />
      <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm title="Обновить аватар" name="editAvatar" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <>
              <input type="url" className="form__input form__input_type_avatar" name="inputAvatarName" placeholder="Ссылка на картинку" minLength="2" maxLength="200" id="inputAvatarName" required />
              <span className="form__input-error"></span>
          </>
      </PopupWithForm>

      <PopupWithForm title="Редактировать профиль" name="editProfile" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <>
              <input type="text" className="form__input form__input_type_name" name="inputName" placeholder="Ваше имя" minLength="2" maxLength="40" id="inputName" required />
              <span className="form__input-error"></span>
              <input type="text" className="form__input form__input_type_about" name="inputAbout" placeholder="Ваш род деятельности" minLength="2" maxLength="200" id="inputAbout" required />
              <span className="form__input-error"></span>
          </>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="addPlace" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <>
              <input type="text" className="form__input form__input_type_name-card" name="inputNameCard" placeholder="Название" minLength="2" maxLength="30" id="inputNameCard" required />
              <span className="form__input-error"></span>
              <input type="url" className="form__input form__input_type_url-card" name="inputUrlCard" placeholder="Ссылка на картинку" minLength="2" maxLength="200" id="inputUrlCard" required />
              <span className="form__input-error"></span>
          </>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

      <PopupWithForm title="Вы уверены?" name="confirmation" onClose={closeAllPopups} buttonText="Да"></PopupWithForm>
    </div>
  );
}

export default App;
