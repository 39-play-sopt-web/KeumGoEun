import { useState } from "react";
import { saveGameRecord } from "../utils/storage";
import { LEVEL_CONFIG } from "../constant/level";

// 게임 로직과 UI를 분리하기 위해 커스텀 훅으로 게임 로직을 분리 - 훅 나눠보는 연습

// 배열을 랜덤하게 섞는 함수
function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function useGame({ level,onGameStart, onGameEnd, onGameReset }) {

    const { gridSize, maxNumber } = LEVEL_CONFIG[level];
    const cellCount = gridSize * gridSize;
  const [numbers, setNumbers] = useState(() =>
    shuffleArray(Array.from({ length: cellCount }, (_, i) => i + 1)),
  );

  // 클릭 후 교체될 숫자
  const [remainingNumbers, setRemainingNumbers] = useState(() =>
    shuffleArray(Array.from({ length: maxNumber - cellCount }, (_, index) => cellCount + index + 1)),
  );

  // 다음에 클릭할 숫자
  const [nextNumber, setNextNumber] = useState(1);
  const [resultTime, setResultTime] = useState(null);

  // 게임 종료 시 처리
  function finishGame() {
    const finalTime = onGameEnd();

    saveGameRecord(level, finalTime);
    setResultTime(finalTime);
  }

  // 클릭한 숫자가 맞는지 체크
  function handleNumberClick(clicknumber) {
    if (clicknumber !== nextNumber) {
      return;
    }

    if (clicknumber === 1) {
      onGameStart();
    }

    // 다음에 표시할 숫자 가져오기
    const newNumber = remainingNumbers.length > 0 ? remainingNumbers[0] : null;

    // 클릭한 숫자는 배열에서 제거
    setNumbers(
      numbers.map((number) => {
        if (number === clicknumber) {
          return newNumber;
        }
        return number;
      }),
    );

    if (remainingNumbers.length > 0) {
      setRemainingNumbers(remainingNumbers.slice(1));
    }

    setNextNumber(nextNumber + 1);

    if (clicknumber === maxNumber) {
      // 게임 종료 시 finishGame 함수만 호출하면 됨!
      finishGame();
    }
  }

  function resetGame() {
    // 랜덤 섞기 다시
    setNumbers(shuffleArray(Array.from({ length: cellCount }, (_, i) => i + 1)));
    setRemainingNumbers(shuffleArray(Array.from({ length: maxNumber - cellCount }, (_, index) => cellCount + index + 1)));
    setNextNumber(1);

    // 타이머 초기화
    onGameReset();
  }

  function handleResultClose() {
    setResultTime(null);
    resetGame();
  }

  return {
    numbers,
    nextNumber,
    handleNumberClick,
    resultTime,
    handleResultClose,
    gridSize,
    maxNumber,
  };
}

export default useGame;
