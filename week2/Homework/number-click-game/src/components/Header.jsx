//헤더
function Header({ elapsedTime, currentTab, onTabChange }) {
    return (
        <header>
            <h1>숫자 클릭 게임</h1>

            <nav>
                <button type="button" onClick={() => onTabChange("game")}>게임</button>
                <button type="button" onClick={() => onTabChange("ranking")}>랭킹</button>
            </nav>

            <select>
                <option>Level 1(3x3)</option>
                <option>Level 2(4x4)</option>
                <option>Level 1(5x5)</option>
            </select>

            <span>{elapsedTime.toFixed(2)}초</span>

        </header>
    )
} export default Header;