import Header from "./components/Header"
import useTimer from "./hooks/useTimer"
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import RankingBoard from "./components/RankingBoard";
import { TABS } from "./constant/tab";


function App() {
  const {
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer();

  const [currentTab, setCurrentTab] = useState(TABS.GAME);
  const [level, setLevel] = useState(1);

  //레벨 변경 
  function handleLevelChange(newLevel) {
  setLevel(Number(newLevel));
  resetTimer();
}

  //탭 변경으로 인해 타이머 초기화 + 탭 변경을 함께 해주기 위한 함수
  function handleTabChange(newTab) {
    if (newTab == currentTab) {
      return ;
    }
    setCurrentTab(newTab);
    resetTimer();
  }

  return (
  
    <div className="min-h-screen flex flex-col">
    <Header 
      elapsedTime={elapsedTime}
      currentTab={currentTab}
      //이렇게 하면 탭 변경과 타이머 초기화를 동시에 해줄 수 있음 !! 
      onTabChange={handleTabChange}
      level={level}
      onLevelChange={handleLevelChange}

    />

    <main className="flex-1 bg-page">
      {currentTab === TABS.GAME ? (
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

  )

}
export default App;
