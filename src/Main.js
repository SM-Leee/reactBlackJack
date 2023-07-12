import React from 'react';
import { BrowserRouter, Routes, Route, Link, useRoutes } from 'react-router-dom';
import GameStart from './blackJack/GameStart';
import GamePlace from './blackJack/GamePlace';
import MainState from './stateTest/MainState';
import CardDeck from './blackJack/CardList/CardDeck';

const Main = () => {
    return (
        <BrowserRouter>
            {/* <MainState/> */}
            <Routes>
                {/* <Route path="/*" element={routeResult} /> */}
                <Route path="/" element={<MainState/>} />
                <Route path="/GameStart" element={<GameStart/>} />
                <Route path="/GamePlace" element={<GamePlace/>}/>
                <Route path="/CardDeck" element={<CardDeck/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default Main;