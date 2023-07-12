import React from 'react';
import StateList from './StateList';
import StateTest from './StateTest';
import '../blackJack/aButton.css'

const MainState = () => {
    return (
        <div>
            <h1>LifeCycleTest</h1>
            <StateTest/>   
            <StateList/>
            <hr/>
            <h1>BlackJack Game</h1>
            <a className='gameStartButton' href='/GameStart'> Game Start</a>
        </div>
    );
}
export default MainState;