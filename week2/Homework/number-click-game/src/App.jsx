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
  } = useTimer();

  const [currentTab, setCurrentTab] = useState("game");

  return (
    <>
    <Header 
      elapsedTime={elapsedTime}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
    />
    
    <main>
      {currentTab === "game" ? (
      <GameBoard
      onGameStart={startTimer}
      onGameEnd={stopTimer} />) :
      ( 
        <RankingBoard />
      )}

    </main>

    </>
  )

}
export default App;
