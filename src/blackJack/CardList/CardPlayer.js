import React, {useEffect} from 'react';
import './CardDeck.css';
import CardItem from './CardItem';

const CardPlayer = (props) => {
  return (
    <div className="card-deck">
        {
            props.player.map(item => (
                <CardItem key = {`${item.suit ==='♠' ? 'space' : item.suit === '♣' ? 'clobar' : item.suit === '♥' ? 'hart' : 'dia'}-${item.rank}`} 
                          suit={item.suit} rank={item.rank}/>
            ))
        }
    </div>
  );
};

export default CardPlayer;