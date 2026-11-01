import useGame from "../hooks/useGame";
import NumberCard from "./NumberCard";
import { createPortal } from "react-dom";

// 게임
function GameBoard({ level, onGameStart, onGameEnd, onGameReset }) {
  const {
    numbers,
    nextNumber,
    handleNumberClick,
    resultTime,
    handleResultClose,
    gridSize,
    maxNumber,
  } = useGame({ level,onGameStart, onGameEnd, onGameReset });

  return (
    <div className="flex flex-col items-center gap-6 pt-8">
      {nextNumber > maxNumber ? (
        <p>TheEnd,,</p>
      ) : (
        <p className="flex items-center gap-2">
          <span className="text-gray-500">다음 숫자</span>
          <span className="text-3xl font-bold">{nextNumber}</span>
          <span className="text-gray-500">({nextNumber - 1} / {maxNumber})</span>
        </p>
      )}

      <div
        className="grid gap-3 w-100 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {/* map: 배열의 요소를 하나씩 꺼냄 */}
        {numbers.map((number, index) =>
          number === null ? (
            <div
              key={index}
              className="aspect-square border-1 border-dashed rounded-md border-teal-300"
            />
          ) : (
            // 클릭 시 실행할 함수를 props로 전달
            <NumberCard
              key={index}
              number={number}
              onClick={() => handleNumberClick(number)}
            />
          ),
        )}
      </div>

      {resultTime !== null && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-result-title"
            className="w-80 rounded-2xl bg-white p-6 text-center shadow-xl"
          >
            <h2 id="game-result-title" className="text-xl font-bold">
              게임 완료!
            </h2>
            <p className="mt-4">걸린 시간: {resultTime.toFixed(2)}초</p>
            <button
              type="button"
              autoFocus
              onClick={handleResultClose}
              className="mt-6 cursor-pointer rounded-lg bg-accent px-6 py-2 font-bold"
            >
              확인
            </button>
          </div>
        </div>, document.body
      )}
    </div>
  );
}

export default GameBoard;
