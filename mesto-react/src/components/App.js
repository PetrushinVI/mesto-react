import React, { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import  api  from '../utils/Api.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Promise.all([api.getUserInfo()
            , api.getInitialCard()
        ])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(`${err}`))
    }, [])


    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card.id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
            })
            .catch(() => console.log("Ошибка постановки лайка"))
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card.id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card.id));
            })
            .catch(() => console.log("Ошибка удаления карточки"))
    }

    const handleUpdateUser = (currentUser) => {
        api.editUserInfo(currentUser)
            .then((userData) => {
                closeAllPopups();
                setCurrentUser(userData);
            })
            .catch(() => console.log("Ошибка обновления данных пользователя"))
    }

    const handleUpdateAvatar = (currentUser) => {
        console.log(currentUser)
        api.editUserAvatar(currentUser.avatar)
            .then((userData) => {
                closeAllPopups();
                setCurrentUser(userData);
            })
            .catch(() => console.log("Ошибка обновления аватара"))
    }

    const handleAddPlaceSubmit = (card) => {
        api.addCard(card)
            .then((newCard) => {
                closeAllPopups();
                setCards([newCard, ...cards]);
            })
            .catch(() => console.log("Ошибка добавления карточки"))

    }

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

    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <PopupWithForm title="Вы уверены?" name="confirmation" onClose={closeAllPopups} buttonText="Да"></PopupWithForm>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
