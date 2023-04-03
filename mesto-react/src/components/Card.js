function Card(card) {

    function handleCard() {
        card.onCardClick(card);
    }

    return (
        <article className="element">
            <button className="element__big-img">
                <img src={card.link} alt={card.name} className="element__picture" onClick={handleCard}/>
            </button>
            <button className="element__delete" type="button" hidden></button>
            <div className="element__description">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-container">
                    <button className="element__btn" type="button"></button>
                    <span className="element__like-counter">{card.likes}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;