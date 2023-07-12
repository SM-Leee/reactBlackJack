import React, {useEffect} from 'react';
import './CardDeck.css';

const CardItem = (props) => {
  return (
    <div className="card">
      <div className="card__suit">{props.suit}</div>
      <div className={`card__rank ${props.suit === '♠' || props.suit === '♣' ? '' : 'card__red'}`}>{props.rank}</div>
      <div className="card__info">{props.suit}</div>
    </div>
  );
};

export default CardItem;