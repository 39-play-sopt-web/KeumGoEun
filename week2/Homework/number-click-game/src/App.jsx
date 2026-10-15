import Header from "./components/Header"
import useTimer from "./hooks/useTimer"
import GameBoard from "./components/GameBoard";

function App() {
  const {
    elapsedTime,
    startTimer,
    stopTimer,
  } = useTimer();
  return (
    <>
    <Header elapsedTime={elapsedTime}/>
    <main>
      <GameBoard
      onGameStart={startTimer}
      onGameEnd={stopTimer} />
    </main>

    </>
  )

}
export default App;
