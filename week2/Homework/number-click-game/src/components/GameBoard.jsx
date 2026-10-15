import App from "../App";
import NumberCard from "./NumberCard";


{/*게임*/}
function GameBoard() {
    const numbers = [1,2,3,4,5,6,7,8,9];

    return(
        <div>
            <p>다음 숫자: 1 (1/18)</p>

        <div className="grid grid-cols-3 gap-3 ">
        {/*map: 배열의 요소를 하나씩 꺼냄*/}
        {numbers.map((number) => (
            <NumberCard
            key={number}
            number={number}
            />
        ))}
        </div>
        </div>

    );
} export default GameBoard;