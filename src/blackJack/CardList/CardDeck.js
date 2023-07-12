import React from 'react';
import './CardDeck.css';
import '../aButton.css';

const CardDeck = () => {
  const suits = ['♠', '♣', '♥', '♦'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  return (
    <>
      <a className='gameStartButton' href='/GamePlace'> 게임으로 돌아가기 </a>  
      <div className="card-deck">
        {suits.map((suit, suitIndex) => (
          ranks.map((rank, rankIndex) => (
            <div key={`${suitIndex}-${rankIndex}`} className="card">
              <div className="card__suit">{suit}</div>
              <div className={`card__rank ${suit === '♠' || suit === '♣' ? '' : 'card__red'}`}>{rank}</div>
              <div className="card__info">{suit}</div>
            </div>
          ))
        ))}
          
      </div>
    </>
    
  );
};

export default CardDeck;