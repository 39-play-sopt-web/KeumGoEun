import { useState } from "react";
import NumberCard from "./NumberCard";

 //배열을 랜덤하게 섞는 함수
    function shuffleArray(array) {
        const shuffled = [...array];

        for (let i = shuffled.length-1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;

    }


//게임
function GameBoard( {onGameStart, onGameEnd} ) {
    const [numbers, setNumbers] = useState(() => shuffleArray([1,2,3,4,5,6,7,8,9]));

    //클릭 후 교체될 숫자 
    const [remainingNumbers, setRemainingNumbers] = useState(() => shuffleArray([10, 11, 12, 13, 14, 15, 16, 17, 18]))
    
    //다음에 클릭할 숫자
    const [nextNumber,setNextNumber] = useState(1)


    //클릭한 숫자가 맞는지 체크
    function handleNumberClick(clicknumber) {
            if (clicknumber != nextNumber) {
                    return;
                }

                if (clicknumber === 1 ) {
                    onGameStart();
                }

                //다음에 표시할 숫자 가져오기 
                const newNumber = 
                remainingNumbers.length > 0
                ? remainingNumbers[0]
                : null;


            //클릭한 숫자는 배열에서 제거 
            setNumbers(
                numbers.map((number) => {
                    if(number == clicknumber){
                        return newNumber;
                }
                return number;
        })
            );

            if (remainingNumbers.length > 0) {
                setRemainingNumbers(remainingNumbers.slice(1));
            }

            setNextNumber(nextNumber+1);

            if (clicknumber === 18 ) {
                const finalTime = onGameEnd();
                console.log(`게임완료 ${finalTime.toFixed(2)}초`);
            }

        }


    return(
        <div>
            <p>{nextNumber>18 ? "TheEnd,," : `다음 숫자: ${nextNumber} (${nextNumber-1}/18)`} </p>

        <div className="grid grid-cols-3 gap-3 w-100 mx-auto">

        {/*map: 배열의 요소를 하나씩 꺼냄*/}
        {numbers.map((number, index) => (
            number === null ?(
                <div key={index} className="aspect-square" />
            ) : (

            // 클릭 시 실행할 함수를 props로 전달
            <NumberCard
            key={index}
            number={number}
            onClick={() => handleNumberClick(number)}
            />
            )
        ))}
        </div>
        </div>

    );
} export default GameBoard;
