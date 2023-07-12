import React, {useState, useEffect} from 'react';
import CardPlayer from './CardList/CardPlayer';
import './aButton.css';
import './CardList/buttonCss.css';

const GamePlace = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const [WinPlayer, setWinPlayer] = useState(['게임을 시작해 주세요.', '']);
    const [buttonBool, setButtonBool] = useState([false, true, true]);
    const [rank, setRank] = useState([0, 0]);
    const [onePlayer, setOnePlyaer] = useState([]);
    const [twoPlayer, setTwoPlyaer] = useState([]);
    const [busterCard, setBusterCard] = useState([]);

    const onHandleGameStart = () => {
        const cardShuffle = playerCardShare(4);
        setWinPlayer(['게임중입니다.', ''])
        setOnePlyaer([...onePlayer, cardShuffle[0], cardShuffle[1]]);
        setTwoPlyaer([...twoPlayer, cardShuffle[2], cardShuffle[3]]);
        setButtonBool([true, false, false]);
    }
    const onHandleCardDraw = () => {
       setTwoPlyaer([...twoPlayer, ...playerCardShare(1)]);
    }
    const onHandleStay = () => {
        setOnePlyaer([...onePlayer, ...playerCardShare(1)]);
        setButtonBool([true, true, true]);
    }
    const onHandleReset = () => {
        setWinPlayer(['게임을 시작해 주세요.', ''])
        setButtonBool([false, true, true])
        setRank([0, 0]);
        setOnePlyaer([]);
        setTwoPlyaer([]);
        setBusterCard([]);
    }
    const winPlayer = (player, playerCardPack) => {
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
    const playerCardShare = (num) => {
        let shareCard = [];
        let itemCard = [];
        for(let i = 0; i < num; i ++){
            const card = ShuffleCardValidate();
            shareCard = [...shareCard, card];
            itemCard = [...itemCard, card.suit + card.rank]
        }
        setBusterCard([...busterCard, ...itemCard]);
        return shareCard;
    }
    const randomCardShuffle = () => {
        const randomSuit = Math.floor(Math.random() * suits.length);
        const randomRank = Math.floor(Math.random() * ranks.length);
        return {suit : suits[randomSuit], rank : ranks[randomRank]};
    }
    const ShuffleCardValidate = () => {
        const card = randomCardShuffle();
        for(let i = 0; i < busterCard.length; i++){
            if(busterCard[i] === card.suit + card.rank){
                return ShuffleCardValidate();
            }
        }
        return card;
    }
    const GameOver = (message) => {
        setButtonBool([true, true, true]);
        setWinPlayer([message, 'GameOver']);
    }
    useEffect(() => {
        const twoWinPlayerCount = winPlayer('2', twoPlayer);
        if(twoWinPlayerCount === 21){
            setOnePlyaer([...onePlayer, ...playerCardShare(1)]);
        } else if(twoWinPlayerCount > 21){
            GameOver('1 Player 우승')
            const oneCount = winPlayer('1', onePlayer);
            setRank([oneCount, twoWinPlayerCount]);
        }
    }, [twoPlayer]);
    useEffect(() => {
        let twoPlayerCount = winPlayer('2', twoPlayer);
        let onePlayerList = [...onePlayer];
        let stayBool = true;
        if(WinPlayer[1] === 'GameOver'){
            const oneCount = winPlayer('1', onePlayer);
            setRank([oneCount, twoPlayerCount]);
        }
        if(twoPlayer.length > 1 && WinPlayer[1] !== 'GameOver'){
            if(twoPlayerCount === 21){
                stayBool = false;
                let boolWin = true;
                while(boolWin){
                    let winCount = winPlayer('1', onePlayerList);
                    if(winCount === 21){
                        GameOver('무승부')
                        boolWin = false;
                    }else if(winCount > 21){
                        GameOver('2 Player 우승')
                        boolWin = false;
                    } else {
                        let playerCardShareAdd = playerCardShare(1);
                        onePlayerList = [...onePlayerList, ...playerCardShareAdd];
                    }
                }
                setOnePlyaer(onePlayerList);
            }
            if(buttonBool[2] && stayBool){
                let boolWin2 = true;
                while(boolWin2){
                    let winCount = winPlayer('1', onePlayerList);
                    if(winCount === 21 && twoPlayerCount === 21){
                        GameOver('무승부')
                        boolWin2 = false;
                    }else if(winCount > 21 || (winCount > 16 && winCount < twoPlayerCount)){
                        GameOver('2 Player 우승')
                        boolWin2 = false;
                    }else if((winCount > 16 && winCount > twoPlayerCount) || winCount === 21){
                        GameOver('1 Player 우승')
                        boolWin2 = false;
                    } else if(winCount === twoPlayerCount && winCount > 16){
                        GameOver('무승부')
                        boolWin2 = false;
                    }
                    if(boolWin2){
                        let playerCardShareAdd = playerCardShare(1);
                        onePlayerList = [...onePlayerList, ...playerCardShareAdd];
                    }        
                }
                setOnePlyaer(onePlayerList);
            }
        }
    },[onePlayer])
    useEffect(() => {
        if(winPlayer('2', twoPlayer) === 21 && winPlayer('1', onePlayer) === 21){
            GameOver('무승부');
            return;
        }        
    }, [onePlayer, twoPlayer])
    return(
        <>
            <hr/>
            <h1>{WinPlayer[0]}</h1>
            <hr/>
            <h1>1 Player : {rank[0]}</h1> 
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
            <a className='gameStartButton' href='/CardDeck'>Card 종류보기</a>
            <a className="gameStartButton" href='/'> Back </a>
        </>
        
    );
}
export default GamePlace;