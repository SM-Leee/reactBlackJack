import React, {useState, useEffect} from 'react';
import CardPlayer from './CardList/CardPlayer';
import './aButton.css';
import './CardList/buttonCss.css';

const GamePlace = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const [WinPlayer, setWinPlayer] = useState(['Please start the game.', '']);
    const [buttonBool, setButtonBool] = useState([false, true, true]);
    const [rank, setRank] = useState([0, 0]);
    const [onePlayer, setOnePlyaer] = useState([]);
    const [twoPlayer, setTwoPlyaer] = useState([]);
    const [busterCard, setBusterCard] = useState([]);

    //GameStart Button
    const onHandleGameStart = () => {
        const cardShuffle = playerCardDraw(4);
        setWinPlayer(['You are playing.', ''])
        setOnePlyaer([...onePlayer, cardShuffle[0], cardShuffle[1]]);
        setTwoPlyaer([...twoPlayer, cardShuffle[2], cardShuffle[3]]);
        setButtonBool([true, false, false]);
    }
    //CardDraw Button
    const onHandleCardDraw = () => {
       setTwoPlyaer([...twoPlayer, ...playerCardDraw(1)]);
    }
    //Stay Button
    const onHandleStay = () => {
        setOnePlyaer([...onePlayer, ...playerCardDraw(1)]);
        setButtonBool([true, true, true]);
    }
    //Reset Button
    const onHandleReset = () => {
        setWinPlayer(['Please start the game.', ''])
        setButtonBool([false, true, true])
        setRank([0, 0]);
        setOnePlyaer([]);
        setTwoPlyaer([]);
        setBusterCard([]);
    }
    //카드점수계산
    const countCardsRank = (player, playerCardPack) => {
        let sumNum = 0;
        let ARankCardCount = 0;
        for(let i = 0; i < playerCardPack.length; i++){
            let cardRank = playerCardPack[i].rank;
            if(cardRank === 'K' || cardRank === 'J' || cardRank === 'Q'){
                cardRank = 10;
            }
            if(cardRank === 'A' && player === '1'){
                cardRank = 11;
            }
            if(cardRank === 'A' && player === '2'){
                ARankCardCount += 1;
                cardRank = 0;
            }
            sumNum+= Number(cardRank);
        }
        if(player === '2'){
            if(sumNum < 12 - ARankCardCount){
                sumNum = sumNum + 11 + (ARankCardCount - 1);
            } else {
                sumNum = sumNum + ARankCardCount;
            }
        }
        return sumNum;
    }
    //몇장의 카드를 Draw해줄지
    const playerCardDraw = (num) => {
        let shareCard = [];
        let itemCard = [...busterCard];
        for(let i = 0; i < num; i ++){
            const card = ShuffleCardValidate(itemCard);
            shareCard = [...shareCard, card];
            itemCard = [...itemCard, card.suit + card.rank]
        }
        setBusterCard([...itemCard]);
        return shareCard;
    }
    //카드한장 Draw Logic
    const randomCardShuffle = () => {
        const randomSuit = Math.floor(Math.random() * suits.length);
        const randomRank = Math.floor(Math.random() * ranks.length);
        return {suit : suits[randomSuit], rank : ranks[randomRank]};
    }
    //카드 나눠줄때의 Validation Check : 동일 카드가 있을때 draw를 하지않음.
    const ShuffleCardValidate = (busterCardItems) => {
        let card = randomCardShuffle();
        for(let i = 0; i < busterCardItems.length; i++){
            if(busterCardItems[i] === card.suit + card.rank){
                return ShuffleCardValidate(busterCardItems);
            }
        }
        return card;
    }
    //GameOver
    const GameOver = (message) => {
        setButtonBool([true, true, true]);
        setWinPlayer([message, 'GameOver']);
    }
    //GameOver
    const GameOverRank = (twoPlayerItem) => {
        const oneCount = countCardsRank('1', onePlayer);
        setRank([oneCount, twoPlayerItem]);
    }
    useEffect(() => {
        const twoWinPlayerCount = countCardsRank('2', twoPlayer);
        if(twoWinPlayerCount === 21){
            setOnePlyaer([...onePlayer, ...playerCardDraw(1)]);
        } else if(twoWinPlayerCount > 21){
            GameOver('Dealer Winner')
            GameOverRank(twoWinPlayerCount)
        }
    }, [twoPlayer]);
    useEffect(() => {
        console.log(twoPlayer)
        let twoPlayerCount = countCardsRank('2', twoPlayer);
        let onePlayerList = [...onePlayer];
        let stayBool = true;
        let boolWin = true;
        if(WinPlayer[1] === 'GameOver'){
            GameOverRank(twoPlayerCount);
        }
        if(twoPlayer.length > 1 && WinPlayer[1] !== 'GameOver'){
            if(twoPlayerCount === 21){
                stayBool = false;
                while(boolWin){
                    let winCount = countCardsRank('1', onePlayerList);
                    if(winCount === 21){
                        GameOver('Draw')
                        boolWin = false;
                    }else if(winCount > 21){
                        GameOver('2 Player Winner')
                        boolWin = false;
                    } else {
                        let playerCardShareAdd = playerCardDraw(1);
                        onePlayerList = [...onePlayerList, ...playerCardShareAdd];
                    }
                }
                setOnePlyaer(onePlayerList);
            }
            if(buttonBool[2] && stayBool){
                while(boolWin){
                    let winCount = countCardsRank('1', onePlayerList);
                    if(winCount === 21 && twoPlayerCount === 21){
                        GameOver('Draw')
                        boolWin = false;
                    }else if(winCount > 21 || (winCount > 16 && winCount < twoPlayerCount)){
                        GameOver('2 Player Winner')
                        boolWin = false;
                    }else if((winCount > 16 && winCount > twoPlayerCount) || winCount === 21){
                        GameOver('Dealer Winner')
                        boolWin = false;
                    } else if(winCount === twoPlayerCount && winCount > 16){
                        GameOver('Draw')
                        boolWin = false;
                    }
                    if(boolWin){
                        let playerCardShareAdd = playerCardDraw(1);
                        onePlayerList = [...onePlayerList, ...playerCardShareAdd];
                    }        
                }
                setOnePlyaer(onePlayerList);
            }
        }
    },[onePlayer])
    useEffect(() => {
        if(countCardsRank('2', twoPlayer) === 21 && countCardsRank('1', onePlayer) === 21){
            GameOver('Draw');
            return;
        }        
    }, [onePlayer, twoPlayer])
    return(
        <>
            <hr/>
            <h1>{WinPlayer[0]}</h1>
            <hr/>
            <h1>Dealer : {rank[0]}</h1> 
            <CardPlayer player={onePlayer}/>
            <hr/>
            <h1>2 Player : {rank[1]}</h1> 
            <CardPlayer player={twoPlayer}/>
            <hr/>
            <button className={`cardButton ${buttonBool[0] ? 'disabled' : ''}`} disabled={buttonBool[0]} onClick={onHandleGameStart}>Game Start</button>
            <button className={`cardButton ${buttonBool[1] ? 'disabled' : ''}`} disabled={buttonBool[1]} onClick={onHandleCardDraw}>Drawing</button>
            <button className={`cardButton ${buttonBool[2] ? 'disabled' : ''}`} disabled={buttonBool[2]} onClick={onHandleStay}>Stay</button>
            <button className={`cardButton`} onClick = {onHandleReset}>reset</button>
            <hr/>
            <a className='gameStartButton' href='/CardDeck'>Card List</a>
            <a className="gameStartButton" href='/'> Back </a>
        </>
        
    );
}
export default GamePlace;