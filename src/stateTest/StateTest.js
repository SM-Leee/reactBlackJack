import React, {useState, useEffect} from 'react';

//State와 useEffect관점

const StateTest = () => {

    //하나의 상수
    const [count, setCount] = useState(0);

    const onButtonClick = () => {
        setCount(count + 1);
    }
    //componentDidMount : 최초의 렌더링 / 마운트시 한 번 실행됨
    useEffect(() => {
        console.log('최초의 useEffect', '화면이 처음 시작 되었을때');
    }, []);
    //componentDidUpdate : 컴포넌트의 상태나 프러퍼티가 변경된 후에 실행됨
    useEffect(() => {
        console.log('컴포넌트가 마운트됨', count);
        //componentWillUnmount : useEffect 콜백 함수에서 반환된 함수를 활용하여 컴포넌트가 언마트되기 전에 clean-up작업
        return () => {
            console.log('컴포넌트가 언마운트되거나 업데이트되기 직전', count);
        }
    }, [count]);
    return(
        <div>
            <p> {count} </p>
            <button onClick={onButtonClick}> Click me</button>
        </div>
    );
}
export default StateTest;
