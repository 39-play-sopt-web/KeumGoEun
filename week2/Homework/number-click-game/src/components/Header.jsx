//헤더
function Header({ elapsedTime, currentTab, onTabChange, level, onLevelChange }) {
    return (
        <header className="grid grid-cols-3 items-center px-12 py-4 bg-white border-b border-zinc-200">
            <h1>숫자 클릭 게임</h1>

            <nav className="flex justify-center gap-2">
                <button type="button" onClick={() => onTabChange("game")} className={`px-4 py-2 rounded-lg cursor-pointer ${
                        currentTab === "game" ? "bg-yellow-100 font-bold" : "hover:bg-zinc-100"
                    }`}>게임</button>
                <button type="button" onClick={() => onTabChange("ranking")} className={`px-4 py-2 rounded-lg cursor-pointer ${
                        currentTab === "ranking" ? "bg-yellow-100 font-bold" : "hover:bg-zinc-100"
                    }`}>랭킹</button>
            </nav>
            
            <div className="flex items-center justify-end gap-3">
                {currentTab === "game" && (
                    <>
                
            <select value={level} onChange={(event) => onLevelChange(event.target.value)} className="border border-zinc-200 rounded-lg px-3 py-2">
                <option value="1">Level 1(3x3)</option>
                <option value="2">Level 2(4x4)</option>
                <option value="3">Level 3(5x5)</option>
            </select>

            <span className="bg-yellow-100 px-3 py-2 rounded-lg font-bold">{elapsedTime.toFixed(2)}초</span>
            </>
            )}
            </div>

        </header>
    )
} export default Header;
