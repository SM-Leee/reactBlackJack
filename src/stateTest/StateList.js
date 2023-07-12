import React, {useState, useEffect} from 'react';

//State와 useEffect관점
const StateList = () => {

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
        return randomString;
    };

    //하나의 상수
    const [input, setInput] = useState('');
    //배열
    const [list, setList] = useState([]);

    //componentDidMount : 최초의 렌더링 / 마운트시 한 번 실행됨
    useEffect(() => {
        console.log('최초의 useEffect', '화면이 처음 시작 되었을때');
    }, []);
    useEffect(()=>{
        //clear
        setInput('');
        console.log(list);
        return () => {
            console.log('return');
            console.log(list);
        }
    }, [list]);

    const addItem = () => {
        let textInput = input;
        if(!!!input){
            textInput = generateRandomString();
        }
        const newItem = {id : Date.now(), text: textInput};
        const newList = [...list, newItem];
        setList(newList)
    }
    const onChageInput = (e) => {
        setInput(e.target.value);
    }
    const onRemoveItem = (itemId) => {
        const newList = list.filter(item => item.id !== itemId);
        setList(newList);
    }
    return(
        <div>
            <input value={input} onChange={onChageInput}/>
            <button onClick={addItem}>Add Item</button>
            <ul>
                {
                    list.map(item => (
                        <li key={item.id}>
                            {item.text}
                            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                        </li>            
                    ))
                }
            </ul>
        </div>
    );
}
export default StateList;
