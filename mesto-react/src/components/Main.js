import { useEffect, useState } from 'react';
import  api  from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCard()])
            .then(([userData, cardData]) => {
                setUserAvatar(userData.avatar);
                setUserName(userData.name);
                setUserDescription(userData.about);
                setCards(cardData);
            })
            .catch((err) => console.log(`${err}`))
    }, [])

    return (
        <main>
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__avatar-button">
                    <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
                </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} className="profile__btn" type="button"></button>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) =>
                    <Card name={card.name} link={card.link} likes={card.likes.length} onCardClick={props.onCardClick}></Card>)
                }
            </section>
        </main>
    );
}

export default Main;