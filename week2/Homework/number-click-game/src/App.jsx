import Header from "./components/Header"
import useTimer from "./hooks/useTimer"
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import RankingBoard from "./components/RankingBoard";

function App() {
  const {
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer();

  const [currentTab, setCurrentTab] = useState("game");
  const [level, setLevel] = useState(1);

  //레벨 변경 
  function handleLevelChange(newLevel) {
  setLevel(Number(newLevel));
  resetTimer();
}

  return (
    <>
    <div className="min-h-screen flex flex-col">
    <Header 
      elapsedTime={elapsedTime}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      level={level}
      onLevelChange={handleLevelChange}

    />

    <main className="flex-1 bg-blue-100">
      {currentTab === "game" ? (
      <GameBoard
      key={level}
      level={level}
      onGameStart={startTimer}
      onGameEnd={stopTimer}
      onGameReset={resetTimer} />) :
      ( 
        <RankingBoard />
      )}

    </main>
    </div>

    </>
  )

}
export default App;
