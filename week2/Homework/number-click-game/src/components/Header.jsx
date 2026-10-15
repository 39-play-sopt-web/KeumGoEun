//헤더
function Header({ elapsedTime, currentTab, onTabChange, level, onLevelChange }) {
    return (
        <header>
            <h1>숫자 클릭 게임</h1>

            <nav>
                <button type="button" onClick={() => onTabChange("game")}>게임</button>
                <button type="button" onClick={() => onTabChange("ranking")}>랭킹</button>
            </nav>

            <select value={level} onChange={(event) => onLevelChange(event.target.value)}>
                <option value="1">Level 1(3x3)</option>
                <option value="2">Level 2(4x4)</option>
                <option value="3">Level 3(5x5)</option>
            </select>

            <span>{elapsedTime.toFixed(2)}초</span>

        </header>
    )
} export default Header;
