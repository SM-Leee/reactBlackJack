import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './loading.css';
const GameStart = () => {
    const navigate = useNavigate();

    const [dots, setDots] = useState('');
    const TimeNavi = () => {
        setTimeout(() => {
            navigate('/GamePlace');
        }, 1000);
    }
    useEffect(() => {
        TimeNavi();
        const interval = setInterval(() => {
            setDots(prevDots => prevDots.length < 6 ? prevDots + '.' : '');
            }, 70);
    
            return () => {
            clearInterval(interval);
            };
    }, []);

    return(
        <div className='loading-dots'>게임로딩중입니다{dots}</div>
    );
}
export default GameStart;